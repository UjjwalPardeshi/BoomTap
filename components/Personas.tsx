const PERSONAS = [
  {
    tag: "The idea-haver",
    title: "Forty voice memos, zero tracks",
    body: "No production skills, plenty of instinct, chronically online. Wants to hear the beat in their head as a real track today, on the phone, free to start.",
    win: "Plays the produced track for a friend within five minutes of beatboxing it, then posts the split-screen.",
  },
  {
    tag: "The bedroom producer",
    title: "Sketches vocally, builds in the DAW",
    body: "FL Studio or Ableton at hobbyist level; hates transcribing their own beatbox by hand. Wants groove-accurate MIDI and stems that drop straight into the project.",
    win: "Exports drum MIDI that needed fewer than two corrections — swing intact.",
  },
  {
    tag: "The beatboxer",
    title: "World-class mouth, no pipeline",
    body: "Performs inward-K snares and lip rolls to a real audience, but has no path from performance to produced, monetizable audio.",
    win: "Posts “my mouth vs. the machine” and it outperforms everything else on the channel.",
  },
];

export default function Personas() {
  return (
    <section className="section" id="who">
      <div className="section-head">
        <span className="section-tag">07 / Who it&apos;s for</span>
        <h2>Three people, one app</h2>
      </div>
      <div className="persona-grid">
        {PERSONAS.map((p) => (
          <article className="persona" key={p.tag}>
            <p className="persona-tag">{p.tag}</p>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <p className="persona-win">
              <span>Win condition</span>
              {p.win}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
