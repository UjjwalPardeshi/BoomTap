const STYLES = [
  "Trap",
  "Lo-fi",
  "House",
  "Drum & Bass",
  "Bollywood / Desi Hip-Hop",
  "Rock",
  "Afrobeats",
  "Cinematic",
];

export default function Modes() {
  return (
    <section className="section" id="modes">
      <div className="section-head">
        <span className="section-tag">04 / Two modes, one promise</span>
        <h2>Fidelity before flair</h2>
        <p className="section-sub">
          If we ever have to choose, we keep the groove and sacrifice polish.
          That&apos;s product principle number one, in writing.
        </p>
      </div>
      <div className="mode-cards">
        <article className="mode-card">
          <h3>
            <span className="mode-dot mode-dot-cream" aria-hidden="true" />
            Faithful mode
          </h3>
          <p>
            A deterministic render of your transcription. No generation, no
            surprises — your MIDI through twenty velocity-layered sampled kits,
            from acoustic and boom-bap to 808, Bollywood percussion and lo-fi.
          </p>
          <ul className="spec-list">
            <li>Instant — plays &le;3 s after you stop recording</li>
            <li>100% on-device, works in airplane mode</li>
            <li>Free forever, unlimited</li>
          </ul>
        </article>
        <article className="mode-card">
          <h3>
            <span className="mode-dot mode-dot-red" aria-hidden="true" />
            Produce mode
          </h3>
          <p>
            A full arrangement — bass, harmony, texture, intro/loop/outro —
            generated around your beat, auto-mixed and loudness-normalized for
            streaming. Your transcribed drums are rendered deterministically
            inside it, so fidelity is structural, not statistical.
          </p>
          <ul className="spec-list">
            <li>Eight styles at launch, two variations per render</li>
            <li>Typically ~20 s for a 60-second track</li>
            <li>Queues offline, renders when you reconnect</li>
          </ul>
        </article>
      </div>
      <div className="style-row" aria-label="Launch styles">
        {STYLES.map((style) => (
          <span className="style-chip" key={style}>
            {style}
          </span>
        ))}
      </div>
    </section>
  );
}
