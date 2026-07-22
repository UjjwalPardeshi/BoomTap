import type { ReactNode } from "react";

const PRINCIPLES: { lead: string; rest: ReactNode }[] = [
  {
    lead: "Fidelity before flair.",
    rest: (
      <>
        You must recognize <em>your</em> beat in the output. Styling sits on
        top of a transcription you can inspect and correct.
      </>
    ),
  },
  {
    lead: "Time-to-magic under 60 seconds.",
    rest: "Every added screen before first playback is a bug, not a feature.",
  },
  {
    lead: "Zero prerequisites, progressive depth.",
    rest: "No account, calibration or music theory for track one. Depth reveals itself as you grow.",
  },
  {
    lead: "The mic is sacred.",
    rest: "On-device by default, explicit consent for any upload, one-tap deletion.",
  },
  {
    lead: "Clean by construction.",
    rest: "Licensed and commissioned training data only. We're the company that doesn't get sued.",
  },
];

const PRIVACY_POINTS: { lead: string; rest: string }[] = [
  {
    lead: "On-device by default.",
    rest: "Capture, transcription, editing and Faithful playback never touch a server.",
  },
  {
    lead: "Uploads are an action, not a default.",
    rest: "Audio reaches the cloud only when you hit Produce or switch on sync.",
  },
  {
    lead: "Training is opt-in. Twice.",
    rest: "Corrected patterns and raw audio have separate toggles. Neither is on out of the box.",
  },
  {
    lead: "Deletion means deletion.",
    rest: "Within 30 days, including derived training copies.",
  },
  {
    lead: "Receipts on everything.",
    rest: "C2PA content credentials and an inaudible watermark on all generated audio.",
  },
  {
    lead: "Never, at any price:",
    rest: "voice cloning, “sounds like” artist prompts, impersonation. Permanent policy, not a settings page.",
  },
  {
    lead: "Compliant where you live.",
    rest: "India DPDP, GDPR, CCPA; 13+ age gate with strictest defaults under 16.",
  },
];

export default function Privacy() {
  return (
    <section className="section section-privacy" id="privacy">
      <div className="section-head">
        <span className="section-tag">08 / Principles</span>
        <h2>The mic is sacred</h2>
        <p className="section-sub">
          Voice recordings are intimate. Here&apos;s the deal, in plain
          language — the same five principles the product is built on.
        </p>
      </div>
      <div className="cols">
        <ol className="principle-list">
          {PRINCIPLES.map((p) => (
            <li key={p.lead}>
              <strong>{p.lead}</strong> {p.rest}
            </li>
          ))}
        </ol>
        <ul className="privacy-list">
          {PRIVACY_POINTS.map((p) => (
            <li key={p.lead}>
              <strong>{p.lead}</strong> {p.rest}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
