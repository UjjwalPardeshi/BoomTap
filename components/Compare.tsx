import type { ReactNode } from "react";

type Mark = "yes" | "no" | "part";

function Cell({ mark, note }: { mark?: Mark; note?: ReactNode }) {
  const labels: Record<Mark, string> = { yes: "Yes", no: "No", part: "Partial" };
  return (
    <>
      {mark && <span className={`mark ${mark}`}>{labels[mark]}</span>}
      {note && <> {note}</>}
    </>
  );
}

export default function Compare() {
  return (
    <section className="section" id="compare">
      <div className="section-head">
        <span className="section-tag">06 / The landscape</span>
        <h2>The gap everyone else left open</h2>
        <p className="section-sub">
          Dubler is faithful but stops at MIDI on a desktop. Suno finishes
          tracks but treats your audio as loose inspiration. Faithful{" "}
          <em>and</em> finished, on a phone, is the open seat.
        </p>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col" className="col-boom">BoomTap</th>
              <th scope="col">Dubler 2</th>
              <th scope="col">Suno</th>
              <th scope="col">Udio</th>
              <th scope="col">DAW audio-to-MIDI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Keeps your exact groove</th>
              <td className="col-boom"><Cell mark="yes" note="core promise" /></td>
              <td><Cell mark="yes" note="best-in-class" /></td>
              <td><Cell mark="no" note={<>&ldquo;influence&rdquo; only</>} /></td>
              <td><Cell mark="no" /></td>
              <td><Cell mark="part" note="tuned for instruments" /></td>
            </tr>
            <tr>
              <th scope="row">Delivers a finished track</th>
              <td className="col-boom"><Cell mark="yes" /></td>
              <td><Cell mark="no" note="MIDI only" /></td>
              <td><Cell mark="yes" /></td>
              <td><Cell mark="part" note="in-platform only" /></td>
              <td><Cell mark="no" /></td>
            </tr>
            <tr>
              <th scope="row">Lives on your phone</th>
              <td className="col-boom"><Cell mark="yes" note="mobile-first" /></td>
              <td><Cell mark="no" note="desktop + DAW" /></td>
              <td><Cell mark="part" note="web/mobile" /></td>
              <td><Cell mark="part" note="web" /></td>
              <td><Cell mark="no" /></td>
            </tr>
            <tr>
              <th scope="row">Zero setup or training</th>
              <td className="col-boom"><Cell mark="yes" note="60-s calibration optional" /></td>
              <td><Cell mark="no" note="up to 12 reps per sound" /></td>
              <td><Cell mark="yes" /></td>
              <td><Cell mark="yes" /></td>
              <td><Cell mark="no" note="DAW skills required" /></td>
            </tr>
            <tr>
              <th scope="row">MIDI &amp; stems out</th>
              <td className="col-boom"><Cell mark="yes" note="MIDI, WAV, stems" /></td>
              <td><Cell mark="part" note="MIDI" /></td>
              <td><Cell mark="no" /></td>
              <td><Cell mark="no" note="exports restricted" /></td>
              <td><Cell mark="part" note="MIDI" /></td>
            </tr>
            <tr>
              <th scope="row">Price to start</th>
              <td className="col-boom">Free</td>
              <td>~$220+ with mic kit</td>
              <td>Free–$30/mo</td>
              <td>Subscription</td>
              <td>Cost of the DAW</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="table-footnote">
        Respect where due: Dubler 2 is excellent at what it does. It just lives
        in a studio, and ideas don&apos;t.
      </p>
    </section>
  );
}
