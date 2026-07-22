export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="section-head">
        <span className="section-tag">01 / The problem</span>
        <h2>Voice memos are where ideas go to die</h2>
      </div>
      <div className="cols">
        <div className="col-main">
          <p>
            There are two ways people sketch music without an instrument. They{" "}
            <em>describe</em> it — &ldquo;dark trap beat, 140 BPM, heavy
            808s&rdquo; — or they <em>perform</em> it, beatboxing and humming
            straight into a voice memo. Text-to-music tools serve the
            describers well. But text captures style, not groove: not the
            pattern, the syncopation, the micro-timing, the accents that make a
            beat feel like <em>something</em>.
          </p>
          <p>
            The performers? They record the memo, and the memo dies there.
            Turning it into an actual track means a DAW, instrument skills,
            production knowledge and hours of work. That distance between idea
            and listenable artifact is the single biggest drop-off in casual
            music creation.
          </p>
          <p>
            <strong>Nobody serves the performer with a phone.</strong>{" "}
            That&apos;s the product.
          </p>
        </div>
        <aside className="pull-card">
          <p className="pull-kicker">True story</p>
          <p className="pull-quote">
            Charlie Puth beatboxed the bones of &ldquo;Attention&rdquo; into
            his iPhone&apos;s Voice Memos on a train in Tokyo, then produced it
            later in his hotel. The entire <em>Voicenotes</em> album started as
            voice memos.
          </p>
          <p className="pull-note">
            He had a portable studio and a decade of production chops waiting
            at the hotel. Most people just have the memo.
          </p>
        </aside>
      </div>
    </section>
  );
}
