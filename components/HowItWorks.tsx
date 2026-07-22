import type { ReactNode } from "react";

interface Step {
  title: ReactNode;
  body: ReactNode;
}

const STEPS: Step[] = [
  {
    title: "Record",
    body: (
      <>
        One big red button. Beatbox 4–8 bars — kick is <em>boots</em>, snare is{" "}
        <em>cats</em>, hi-hat is <em>ts</em>. Or just make sounds; we&apos;ll
        figure it out. No metronome needed — tempo is inferred from your take,
        within ±2&nbsp;BPM — though a count-in and tap-tempo are there if you
        want them.
      </>
    ),
  },
  {
    title: "Hear it back — instantly",
    body: (
      <>
        Under three seconds after you stop, your beat plays back on a real kit,
        looped, with a scrolling grid of exactly what the app heard. All
        on-device. No signal, no problem.
      </>
    ),
  },
  {
    title: "Fix anything in two taps",
    body: (
      <>
        Missed hit? Tap the cell. Snare heard as kick? Long-press to relabel.
        Drag the quantize slider from Loose to Tight — micro-timing is stored
        as a groove template, so tightening the grid never flattens your feel.
      </>
    ),
  },
  {
    title: (
      <>
        Hum a melody <span className="optional">optional</span>
      </>
    ),
    body: (
      <>
        A second pass over the looping beat. Pitch-tracked to MIDI, key
        inferred, scale-snap if you want it — rendered as a bassline or lead.
      </>
    ),
  },
  {
    title: "Produce",
    body: (
      <>
        Pick a style card. The cloud builds a full arrangement around your
        transcription — and the drums are <strong>locked</strong> to your
        pattern, non-negotiable. Two variations back in about twenty seconds.
      </>
    ),
  },
  {
    title: "Share the receipt",
    body: (
      <>
        One tap makes a vertical video with a before/after toggle: your mouth,
        then the track. Export MP3, WAV, MIDI or stems. Account sign-up only
        shows up here — never before.
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="section-head">
        <span className="section-tag">02 / The golden path</span>
        <h2>App open to banger in six moves</h2>
      </div>
      <ol className="steps">
        {STEPS.map((step, i) => (
          <li className="step" key={i}>
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
