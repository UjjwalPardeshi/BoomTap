"use client";

import { useEffect, useRef, useState } from "react";
import { AudioEngine } from "@/lib/audio";
import {
  BASS_LINE,
  GROOVE,
  PRESETS,
  ROWS,
  STEPS,
  clonePattern,
  emptyPattern,
  type Pattern,
  type PresetName,
  type RowId,
} from "@/lib/patterns";

const LOOKAHEAD_MS = 25;
const AHEAD_S = 0.12;

const NOTE_FAITHFUL =
  "Faithful mode: your pattern on a dry kit, exactly as played. Flip to Produced to hear the same pattern with an 808, brighter hats and a bassline locked to your kicks.";
const NOTE_PRODUCED =
  "Produced mode: same pattern, same timing — now with an 808 kick, brighter hats and a bassline that follows your groove. In the app, this step goes through the full cloud arrangement.";

const PRESET_CHIPS: { name: PresetName | "clear"; label: string }[] = [
  { name: "boots", label: "Boots & Cats" },
  { name: "trap", label: "Trap" },
  { name: "house", label: "House" },
  { name: "clear", label: "Clear" },
];

export default function DrumMachine() {
  const [pattern, setPattern] = useState<Pattern>(() =>
    clonePattern(PRESETS.boots.pattern),
  );
  const [bpm, setBpm] = useState(PRESETS.boots.bpm);
  const [quantize, setQuantize] = useState(65);
  const [produced, setProduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<PresetName | "clear">(
    "boots",
  );

  // Mutable mirrors so the audio scheduler always reads fresh values
  // without re-arming timers on every render.
  const patternRef = useRef(pattern);
  const bpmRef = useRef(bpm);
  const quantizeRef = useRef(quantize);
  const producedRef = useRef(produced);
  const playingRef = useRef(false);

  const engineRef = useRef<AudioEngine | null>(null);
  const currentStepRef = useRef(0);
  const nextNoteTimeRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const drawQueueRef = useRef<{ step: number; time: number }[]>([]);
  const litStepRef = useRef(-1);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<Partial<Record<RowId, (HTMLButtonElement | null)[]>>>(
    {},
  );

  useEffect(() => {
    patternRef.current = pattern;
  }, [pattern]);
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);
  useEffect(() => {
    quantizeRef.current = quantize;
  }, [quantize]);
  useEffect(() => {
    producedRef.current = produced;
  }, [produced]);

  useEffect(() => {
    return () => {
      playingRef.current = false;
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      engineRef.current?.close();
      engineRef.current = null;
    };
  }, []);

  function ensureEngine(): AudioEngine {
    if (!engineRef.current) engineRef.current = new AudioEngine();
    engineRef.current.resume();
    return engineRef.current;
  }

  function sixteenth(): number {
    return 60 / bpmRef.current / 4;
  }

  function scheduleStep(engine: AudioEngine, step: number, t: number): void {
    const loose = 1 - quantizeRef.current / 100;
    const offset = GROOVE[step] * sixteenth() * loose;
    const when = Math.max(t + offset, engine.now + 0.001);
    const p = patternRef.current;
    const isProduced = producedRef.current;
    if (p.kick[step]) engine.playKick(when, p.kick[step], isProduced);
    if (p.snare[step]) engine.playSnare(when, p.snare[step], isProduced);
    if (p.chh[step]) engine.playHat(when, p.chh[step], false, isProduced);
    if (p.ohh[step]) engine.playHat(when, p.ohh[step], true, isProduced);
    if (isProduced && BASS_LINE[step]) engine.playBass(when, BASS_LINE[step], 0.9);
    drawQueueRef.current.push({ step, time: t });
  }

  function tick(): void {
    const engine = engineRef.current;
    if (!engine) return;
    while (nextNoteTimeRef.current < engine.now + AHEAD_S) {
      scheduleStep(engine, currentStepRef.current, nextNoteTimeRef.current);
      nextNoteTimeRef.current += sixteenth();
      currentStepRef.current = (currentStepRef.current + 1) % STEPS;
    }
  }

  function togglePlayheadClass(step: number, on: boolean): void {
    for (const row of ROWS) {
      cellsRef.current[row.id]?.[step]?.classList.toggle("is-current", on);
    }
  }

  function drawLoop(): void {
    if (!playingRef.current) return;
    const engine = engineRef.current;
    if (!engine) return;
    const queue = drawQueueRef.current;
    while (queue.length && queue[0].time <= engine.now) {
      const { step } = queue.shift()!;
      if (litStepRef.current >= 0)
        togglePlayheadClass(litStepRef.current, false);
      togglePlayheadClass(step, true);
      litStepRef.current = step;
    }
    requestAnimationFrame(drawLoop);
  }

  function start(): void {
    const engine = ensureEngine();
    playingRef.current = true;
    setPlaying(true);
    currentStepRef.current = 0;
    nextNoteTimeRef.current = engine.now + 0.06;
    timerRef.current = window.setInterval(tick, LOOKAHEAD_MS);
    requestAnimationFrame(drawLoop);
  }

  function stop(): void {
    playingRef.current = false;
    setPlaying(false);
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    drawQueueRef.current = [];
    if (litStepRef.current >= 0) togglePlayheadClass(litStepRef.current, false);
    litStepRef.current = -1;
  }

  function toggleCell(row: RowId, step: number): void {
    const next = pattern[row][step] ? 0 : 1;
    setPattern({
      ...pattern,
      [row]: pattern[row].map((v, i) => (i === step ? next : v)),
    });
    if (next && !playingRef.current) {
      ensureEngine().preview(row, producedRef.current);
    }
  }

  function loadPreset(name: PresetName | "clear"): void {
    setActivePreset(name);
    if (name === "clear") {
      setPattern(emptyPattern());
      return;
    }
    setPattern(clonePattern(PRESETS[name].pattern));
    setBpm(PRESETS[name].bpm);
  }

  function onGridKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    const cell = (e.target as HTMLElement).closest<HTMLButtonElement>(
      ".seq-cell",
    );
    if (!cell) return;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    const rowIdx = ROWS.findIndex((r) => r.id === cell.dataset.row);
    const step = Number(cell.dataset.step);
    const nextRow = (rowIdx + move[0] + ROWS.length) % ROWS.length;
    const nextStep = (step + move[1] + STEPS) % STEPS;
    cellsRef.current[ROWS[nextRow].id]?.[nextStep]?.focus();
  }

  return (
    <div className="machine">
      <div className="machine-top">
        <button
          type="button"
          className={`play-btn${playing ? " is-playing" : ""}`}
          aria-pressed={playing}
          onClick={() => (playing ? stop() : start())}
        >
          <span className="play-icon" aria-hidden="true" />
          <span className="play-label">{playing ? "Stop" : "Play"}</span>
        </button>
        <div className="transport-group">
          <label className="t-label" htmlFor="bpm-slider">
            Tempo <output>{bpm}</output> BPM
          </label>
          <input
            type="range"
            id="bpm-slider"
            min={70}
            max={160}
            step={1}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
        </div>
        <div className="transport-group">
          <label className="t-label" htmlFor="quantize-slider">
            Quantize &middot; loose <output>{quantize}</output>% tight
          </label>
          <input
            type="range"
            id="quantize-slider"
            min={0}
            max={100}
            step={1}
            value={quantize}
            onChange={(e) => setQuantize(Number(e.target.value))}
          />
        </div>
        <div className="mode-toggle" role="group" aria-label="Playback mode">
          <button
            type="button"
            className={`mode-btn${produced ? "" : " is-active"}`}
            aria-pressed={!produced}
            onClick={() => setProduced(false)}
          >
            Faithful
          </button>
          <button
            type="button"
            className={`mode-btn${produced ? " is-active" : ""}`}
            aria-pressed={produced}
            onClick={() => setProduced(true)}
          >
            Produced
          </button>
        </div>
      </div>

      <div className="grid-wrap">
        <div
          className="seq-grid"
          role="grid"
          aria-label="Drum step sequencer, 4 sounds by 16 steps"
          ref={gridRef}
          onKeyDown={onGridKeyDown}
        >
          {ROWS.map((row) => (
            <div key={row.id} role="row" style={{ display: "contents" }}>
              <span className="seq-row-label" role="rowheader">
                {row.label}
              </span>
              {pattern[row.id].map((vel, step) => (
                <button
                  key={step}
                  type="button"
                  role="gridcell"
                  className={[
                    "seq-cell",
                    step % 4 === 0 ? "beat-mark" : "",
                    vel ? "is-on" : "",
                    vel && vel < 0.6 ? "vel-soft" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-row={row.id}
                  data-step={step}
                  aria-label={`${row.label}, step ${step + 1}`}
                  aria-pressed={Boolean(vel)}
                  onClick={() => toggleCell(row.id, step)}
                  ref={(el) => {
                    const cells =
                      cellsRef.current[row.id] ??
                      (cellsRef.current[row.id] = []);
                    cells[step] = el;
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="machine-bottom">
        <div className="presets" role="group" aria-label="Preset patterns">
          <span className="t-label">Patterns</span>
          {PRESET_CHIPS.map((chip) => (
            <button
              key={chip.name}
              type="button"
              className={[
                "chip",
                chip.name === "clear" ? "chip-clear" : "",
                activePreset === chip.name && chip.name !== "clear"
                  ? "is-active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => loadPreset(chip.name)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <p className="machine-note" role="status">
          {produced ? NOTE_PRODUCED : NOTE_FAITHFUL}
        </p>
      </div>
    </div>
  );
}
