const STATS = [
  {
    num: "97%",
    cap: "of 9,000 listeners couldn't pick the AI track from the human one (Deezer × Ipsos, 2025)",
  },
  {
    num: "<30 MB",
    cap: "the entire on-device model bundle — private, offline, instant",
  },
  {
    num: "±2 BPM",
    cap: "tempo inference from a raw take, no click track required",
  },
  {
    num: "80→92%",
    cap: "hit-classification accuracy, zero-shot → after a 60-second calibration",
  },
];

export default function Stats() {
  return (
    <section className="stats-band" aria-label="Key numbers">
      {STATS.map((stat) => (
        <div className="stat" key={stat.num}>
          <span className="stat-num">{stat.num}</span>
          <span className="stat-cap">{stat.cap}</span>
        </div>
      ))}
    </section>
  );
}
