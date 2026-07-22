const PHASES = [
  {
    when: "Now · Phase 1",
    title: "iOS public beta — India + US",
    items: [
      "Capture up to 8 bars, on-device transcription",
      "Tap-to-edit drum grid, 20 built-in kits",
      "8 Produce styles, instrumental, 2 variations",
      "Hum-a-melody second pass",
      "MP3 / WAV / MIDI export + auto share video",
    ],
  },
  {
    when: "Next · Phase 2",
    title: "Depth & Android",
    items: [
      "Android 12+, mid-range parity",
      "Studio tier with per-instrument stems",
      "9+ sound classes incl. inward-K snare, lip roll",
      "3-minute arrangements with section editing",
      "Collab: send a beat, a friend hums the topline",
      "Multi-pass layering — stack a shaker take on the loop",
      "20+ styles, data-driven roadmap",
    ],
  },
  {
    when: "Later · Phase 3",
    title: "Pro & platform",
    items: [
      "Live mode: ≤20 ms trigger latency",
      "VST3/AU desktop plugin",
      "Mouth-to-MIDI API & SDK for DAWs and games",
      "Ableton Link, drag-to-DAW export",
    ],
  },
];

export default function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="section-head">
        <span className="section-tag">10 / Roadmap</span>
        <h2>Where this goes</h2>
      </div>
      <div className="roadmap">
        {PHASES.map((phase) => (
          <article className="phase" key={phase.when}>
            <p className="phase-when">{phase.when}</p>
            <h3>{phase.title}</h3>
            <ul>
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="roadmap-never">
        <strong>Never on the roadmap:</strong> artist voice cloning, a social
        feed to doom-scroll, or anything with &ldquo;NFT&rdquo; in it.
      </p>
    </section>
  );
}
