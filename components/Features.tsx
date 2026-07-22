import type { ReactNode } from "react";

const FEATURES: { title: string; body: ReactNode }[] = [
  {
    title: "On-device transcription",
    body: (
      <>
        Onset detection and five-class hit recognition (kick, snare, closed
        hat, open hat, perc) run locally in real time. Nine-plus classes —
        rimshot, clap, tom, crash, inward-K snare, lip roll — arrive in Phase
        2.
      </>
    ),
  },
  {
    title: "Groove templates",
    body: (
      <>
        Quantizing snaps hits to the grid but stores every micro-timing
        deviation, then re-applies it at render. Your swing survives the
        cleanup. Triplet grids are auto-detected.
      </>
    ),
  },
  {
    title: "Velocity that survives",
    body: (
      <>
        Per-hit energy maps to the full 1–127 MIDI velocity range, normalized
        per class. The ghost notes stay ghosts; the accents stay loud.
      </>
    ),
  },
  {
    title: "60-second calibration",
    body: (
      <>
        Optional. Record four examples of each sound and the classifier adapts
        to <em>your</em> mouth on the spot — no retraining, no upload.
        It&apos;s the accuracy ceiling-raiser, straight from the research.
      </>
    ),
  },
  {
    title: "Hum-to-melody",
    body: (
      <>
        Monophonic pitch tracking with key inference and a scale-snap toggle
        turns a hummed pass into bassline or lead MIDI. Octave errors are
        handled for you.
      </>
    ),
  },
  {
    title: "Honest confidence",
    body: (
      <>
        Noisy room? The app says &ldquo;I probably missed a few — tap to
        fix&rdquo; instead of failing silently, and stays useful down to
        street-level noise.
      </>
    ),
  },
  {
    title: "Real exports",
    body: (
      <>
        MP3 on Free, WAV + standard MIDI on Pro, per-instrument stems on
        Studio. Artifacts you can drag into FL Studio or Ableton — the things
        text-to-music tools can&apos;t meaningfully give.
      </>
    ),
  },
  {
    title: "The A/B player",
    body: (
      <>
        Toggle between original beatbox, faithful render and produced track
        with tempo-aligned switching. It&apos;s the demo that sells the app —
        and the share video is built on it.
      </>
    ),
  },
  {
    title: "Creation record",
    body: (
      <>
        Export a bundle of your input recording, transcription and edit log.
        Because the track is built on your recorded human performance, your
        authorship position is real — and documented.
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-head">
        <span className="section-tag">05 / Under the hood</span>
        <h2>Built like an instrument, not a slot machine</h2>
      </div>
      <div className="feature-grid">
        {FEATURES.map((feature) => (
          <article className="feature" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
