const FAQS = [
  {
    q: "Do I need to know how to beatbox?",
    a: "No. If you can say “boots and cats,” you can use BoomTap — and humming works too. Beatboxing is never treated as a skill requirement; the onboarding literally says “or just make sounds, we'll figure it out.”",
  },
  {
    q: "Is my voice uploaded somewhere?",
    a: "Not by default. Recording, transcription, editing and Faithful playback all happen on your phone. Audio goes to the cloud only when you explicitly hit Produce or enable sync, and contributing anything to model training is a separate opt-in — two of them, actually: one for corrected patterns, one for raw audio. Deletion requests are honored within 30 days, derived copies included.",
  },
  {
    q: "Who owns the tracks I make?",
    a: "You do, per the terms of service. And because every track is built on your recorded human performance — your groove, your melody — your authorship position is substantially stronger than with prompt-only generation. You can export a creation record (input recording, transcription, edit log) as evidence. Studio adds an explicit commercial-use grant.",
  },
  {
    q: "How is this different from Suno or Udio?",
    a: "Those tools treat uploaded audio as a vague vibe reference — melody and rhythm “referenced, not copied.” BoomTap's core is the opposite: a faithful, editable transcription of your performance that generation is then locked to. You can see what it heard, fix it, and export MIDI and stems. Different job entirely.",
  },
  {
    q: "What was the AI trained on?",
    a: "Licensed, commissioned or owned audio with written chain-of-title — no scraping, ever. Transcription models start from public research corpora (AVP, LVT, the Stowell beatbox corpus) plus a paid, consented recording program spanning 500+ participants and 25+ device models. Every generated file carries C2PA content credentials and an inaudible watermark.",
  },
  {
    q: "What if it mishears me?",
    a: "You'll see it immediately on the grid, and fixing a hit takes two taps. Zero-shot accuracy is around 80% per hit and climbs past 92% after an optional 60-second calibration where you teach the app your four core sounds. In noisy rooms the app flags low confidence instead of pretending — and every correction you make trains a better model, if and only if you've opted in.",
  },
  {
    q: "Where do my projects live?",
    a: "In a project library on your phone — takes, transcriptions, edits and renders, all saved locally. Cloud sync is available after you sign in, and even then your original voice recordings stay on-device unless you switch sync on for them.",
  },
  {
    q: "Can I import an existing voice memo?",
    a: "Yes — your own recordings, up to 60 seconds. Imports are fingerprint-screened before any cloud processing so copyrighted recordings can't be laundered through the pipeline.",
  },
  {
    q: "When does Android arrive?",
    a: "Phase 2, fast-follow after the iOS beta — Android 12+, tuned for mid-range hardware with a cloud-transcription fallback for low-end devices. The MVP targets iOS 16+ on iPhone 11 or newer.",
  },
];

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="section-head">
        <span className="section-tag">11 / FAQ</span>
        <h2>Asked constantly</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((faq) => (
          <details key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
