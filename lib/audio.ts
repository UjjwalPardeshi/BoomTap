import type { RowId } from "./patterns";

/**
 * Web Audio synth for the demo drum machine.
 * All voices are synthesized (no samples): sine-drop kick, noise+triangle
 * snare, filtered-noise hats, filtered-saw bass for Produced mode.
 */
export class AudioEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private noiseBuf: AudioBuffer;

  constructor() {
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.85;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 5;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    const len = this.ctx.sampleRate;
    this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }

  get now(): number {
    return this.ctx.currentTime;
  }

  resume(): void {
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  close(): void {
    void this.ctx.close();
  }

  private env(t: number, peak: number, decay: number): GainNode {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    g.connect(this.master);
    return g;
  }

  private noiseSource(t: number, dur: number): AudioBufferSourceNode {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    src.start(t);
    src.stop(t + dur);
    return src;
  }

  playKick(t: number, vel: number, produced: boolean): void {
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    const decay = produced ? 0.5 : 0.22;
    osc.frequency.setValueAtTime(produced ? 130 : 160, t);
    osc.frequency.exponentialRampToValueAtTime(
      produced ? 46 : 52,
      t + (produced ? 0.11 : 0.06),
    );
    osc.connect(this.env(t, vel * (produced ? 1.15 : 0.95), decay));
    osc.start(t);
    osc.stop(t + decay + 0.05);

    const click = this.noiseSource(t, 0.015);
    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1200;
    click.connect(hp);
    hp.connect(this.env(t, vel * 0.25, 0.015));
  }

  playSnare(t: number, vel: number, produced: boolean): void {
    const body = this.ctx.createOscillator();
    body.type = "triangle";
    body.frequency.setValueAtTime(196, t);
    body.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    body.connect(this.env(t, vel * 0.5, 0.1));
    body.start(t);
    body.stop(t + 0.15);

    const dur = produced ? 0.26 : 0.16;
    const n = this.noiseSource(t, dur);
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = produced ? 2200 : 1700;
    bp.Q.value = 0.9;
    n.connect(bp);
    bp.connect(this.env(t, vel * (produced ? 0.85 : 0.7), dur));
  }

  playHat(t: number, vel: number, open: boolean, produced: boolean): void {
    const dur = open ? (produced ? 0.5 : 0.35) : produced ? 0.09 : 0.06;
    const n = this.noiseSource(t, dur);
    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = produced ? 8200 : 6800;
    n.connect(hp);
    hp.connect(this.env(t, vel * (open ? 0.5 : 0.4), dur));
  }

  playBass(t: number, freq: number, vel: number): void {
    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(650, t);
    lp.frequency.exponentialRampToValueAtTime(220, t + 0.25);
    lp.Q.value = 3;
    osc.connect(lp);
    lp.connect(this.env(t, vel * 0.55, 0.3));
    osc.start(t);
    osc.stop(t + 0.35);
  }

  preview(row: RowId, produced: boolean): void {
    const t = this.now + 0.01;
    if (row === "kick") this.playKick(t, 1, produced);
    else if (row === "snare") this.playSnare(t, 1, produced);
    else if (row === "chh") this.playHat(t, 1, false, produced);
    else this.playHat(t, 1, true, produced);
  }
}
