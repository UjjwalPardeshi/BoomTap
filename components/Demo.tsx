import DrumMachine from "./DrumMachine";

export default function Demo() {
  return (
    <section className="section section-demo" id="demo">
      <div className="section-head">
        <span className="section-tag">03 / Live demo</span>
        <h2>The trust layer, running in your browser</h2>
        <p className="section-sub">
          In the app, this grid is what BoomTap heard — every hit visible,
          every miss two taps from fixed. Here, it&apos;s yours to program.
          Sound on.
        </p>
      </div>
      <DrumMachine />
    </section>
  );
}
