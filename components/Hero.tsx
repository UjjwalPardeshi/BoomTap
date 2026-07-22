const WAVE_BARS: [number, number, number][] = [
  [4, 24, 8], [11, 18, 20], [18, 8, 40], [25, 20, 16], [32, 14, 28],
  [39, 24, 8], [46, 4, 48], [53, 18, 20], [60, 10, 36], [67, 22, 12],
  [74, 16, 24], [81, 25, 6], [88, 6, 44], [95, 19, 18], [102, 12, 32],
  [109, 23, 10], [116, 15, 26], [123, 25, 6], [130, 5, 46], [137, 17, 22],
  [144, 11, 34], [151, 21, 14], [158, 14, 28], [165, 24, 8], [172, 7, 42],
  [179, 18, 20], [186, 12, 32], [193, 22, 12], [200, 16, 24], [207, 25, 6],
  [214, 4, 48], [221, 19, 18], [228, 10, 36], [235, 23, 10], [242, 15, 26],
  [249, 24, 8], [256, 6, 44], [263, 18, 20], [270, 13, 30], [277, 22, 12],
  [284, 16, 24], [291, 25, 6], [298, 9, 38], [305, 20, 16], [312, 24, 8],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <p className="eyebrow">
        iOS public beta &middot; launching in India + US &middot; 2026
      </p>
      <h1 className="hero-title">
        From
        <br />
        mouth
        <br />
        to&nbsp;music<span className="tape">.</span>
      </h1>
      <div className="hero-split">
        <div className="hero-copy">
          <p className="lede">
            Beatbox four bars into your phone. Under thirty seconds later
            it&apos;s a produced track with real drums, bass and keys —{" "}
            <strong>same pattern, same timing, same accents.</strong> Not
            &ldquo;inspired by&rdquo; your idea. Your idea.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#beta">
              Join the iOS beta
            </a>
            <a className="btn btn-ghost" href="#demo">
              Play the demo &darr;
            </a>
          </div>
          <p className="hero-fineprint">
            Free to start &middot; Works offline &middot; Your voice stays on
            the phone unless you say otherwise
          </p>
        </div>
        <figure
          className="memo-card"
          aria-label="Illustration: a voice memo becoming a produced track"
        >
          <figcaption className="memo-head">
            <span className="memo-title">New Recording 47</span>
            <span className="memo-meta">11:42 PM &middot; 0:14</span>
          </figcaption>
          <svg
            className="memo-wave"
            viewBox="0 0 320 56"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g fill="currentColor">
              {WAVE_BARS.map(([x, y, height]) => (
                <rect key={x} x={x} y={y} width={3} height={height} />
              ))}
            </g>
          </svg>
          <div className="memo-arrow" aria-hidden="true">
            &darr;
          </div>
          <div className="memo-result">
            <span className="memo-result-dot" aria-hidden="true" />
            <div>
              <span className="memo-result-title">Same beat. Produced.</span>
              <span className="memo-result-sub">
                Trap &middot; 92 BPM &middot; your groove, kept
              </span>
            </div>
            <span className="memo-badge">0:30</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
