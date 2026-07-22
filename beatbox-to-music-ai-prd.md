# PRD — BoomTap: Beatbox-to-Music AI

| Field | Value |
|---|---|
| **Product (working title)** | BoomTap — *"From mouth to music."* (Name TBD; trademark search pending — see Open Questions) |
| **Document version** | v1.0 — Draft for review |
| **Date** | 22 July 2026 |
| **Status** | 🟡 Proposed — pending prototype validation (M0) |
| **Doc type** | Full PRD: vision → requirements → architecture → GTM → release plan |

---

## 0. TL;DR

**BoomTap turns a beatboxed voice memo into a fully produced, release-ready track — while keeping the user's exact groove.**

You beatbox a rhythm into your phone (kick, snare, hi-hats — the sounds every human can approximate), optionally hum a melody on a second pass, pick a genre, and in under 30 seconds you get back a professionally produced track that *is your beat* — same pattern, same timing, same accents — rendered with real drums, bass, and instrumentation. Unlike text-to-music tools (Suno, Udio) where audio input is treated as a vague "vibe reference," BoomTap's core is a **faithful, editable transcription layer**: your beatbox is converted to drum MIDI you can see and correct before (or after) production. Unlike pro voice-to-MIDI tools (Dubler 2), it requires no DAW, no desktop, no training regimen, and it delivers a *finished track*, not raw MIDI.

- **Wedge:** rhythm-first music creation on mobile. Text is a terrible interface for groove; the mouth is the best drum machine humans carry everywhere.
- **Proof the behavior exists:** Charlie Puth beatboxed "Attention" into his iPhone's Voice Memos on a train in Tokyo to capture the idea, then produced it later in his hotel — the entire *Voicenotes* album began as voice memos. Millions of people already hum and beatbox ideas into their phones; today those memos die there.
- **MVP:** iOS app (Android fast-follow). Record 8 bars → on-device transcription to drum MIDI → instant playback with a real kit ("Faithful mode") → optional cloud "Produce" step for a full genre-styled arrangement → export/share to socials with MIDI/WAV/stems.
- **Business:** freemium subscription (Free / Pro / Studio), regional pricing for India; Phase 3 adds a DAW plugin and an API.

---

## 1. Vision & Opportunity

### 1.1 Vision statement

> **Anyone who can beatbox a rhythm or hum a melody can make a finished song.** The voice becomes the universal music controller — capture the idea the instant it strikes, and let AI handle the translation from intent to production, without losing what made the idea *yours*.

### 1.2 The insight

There are two ways people express musical ideas without instruments:

1. **Describing them in words** ("a dark trap beat, 140 BPM, heavy 808s") — this is what Suno/Udio/Stable Audio optimized for. Text captures *style* but cannot capture *groove*: the specific pattern, syncopation, micro-timing, and accents that make a beat feel like something.
2. **Performing them with the mouth** — beatboxing and humming. This is how actual musicians sketch (Puth's voice memos; producers beatboxing into iPhones; drummers vocalizing fills as "boots-and-cats"). It carries the exact rhythmic and melodic *content* of the idea, not just its adjectives.

Every existing product serves either the describers (text-to-music) or the professionals (voice-to-MIDI inside a DAW). **Nobody serves the performer with a phone.** That's the product.

### 1.3 Why now (2026)

1. **Generation quality crossed the threshold.** Full-band AI music generation is now good enough that in a 2025 Deezer/Ipsos survey of 9,000 adults, 97% of respondents could not correctly distinguish AI tracks from a human one across three samples. Conditioned generation (audio + text prompts, style transfer, stem generation) is production-grade.
2. **The legal fog is lifting into a licensed era.** Warner settled with Suno (Nov 2025), Universal settled with Udio (Oct 2025, establishing per-generation royalty templates), and licensed AI models are replacing unlicensed ones through 2026. A new entrant that is **clean-data by design** enters without legacy liability and with a clear licensing playbook to follow.
3. **On-device ML is ready.** Onset detection + 5-class sound classification is a small-model problem (<30 MB) that runs in real time on a mid-range 2023+ phone via Core ML/NNAPI — meaning the "faithful" layer can be instant, offline, and private.
4. **The science is mature.** Vocal Percussion Transcription (VPT) is an established MIR research field with public datasets (AVP: 9,780 annotated utterances from 28 amateurs; LVT; Stowell's beatbox corpus of 7,460 utterances from experienced beatboxers) and a key documented finding: per-user few-shot calibration dramatically outperforms generic models. We are productizing known science, not inventing new science.
5. **Distribution tailwind.** Short-form video has created insatiable demand for original audio, and "I made this beat with my mouth" is an inherently viral, demonstrable format (split-screen: beatbox in → banger out).

### 1.4 What "winning" looks like

- **12 months post-launch:** the default way non-producers turn a rhythmic idea into a track; ≥ 2M registered users, ≥ 80K paying subscribers, ≥ 500K tracks shared to social platforms with attribution.
- **24 months:** the transcription engine ("mouth → MIDI") becomes an API/SDK licensed into DAWs, games, and creation apps; BoomTap is the verb for beatbox-to-track.

---

## 2. Problem Statement

**Primary problem.** Musical ideas are captured by millions of people as hummed/beatboxed voice memos, and then die — because converting a voice memo into an actual track requires a DAW, instrument skills, production knowledge, and hours of work. The distance between *idea* and *listenable artifact* is the single biggest drop-off in casual music creation.

**Secondary problems (by segment):**

- **Casual creators** (no production skills): existing AI music tools generate *a* song, but not *their* song — text prompts can't express the beat in their head, and audio-upload features in text-to-music tools treat the recording as loose inspiration, with results users describe as unstable and unpredictable.
- **Bedroom producers:** transcribing a beatboxed idea into a DAW manually (or via generic audio-to-MIDI, which is tuned for instruments, not vocal timbre) is slow and error-prone; Dubler 2 solves this well but costs a few hundred dollars, lives on desktop, requires per-sound training, and stops at MIDI.
- **Beatboxers/content creators:** world-class rhythmic performers with no path from performance to produced music or monetizable original audio.

**Job to be done:** *"When a beat pops into my head, help me capture it and hear it as a real, finished track — in the time it takes to listen back to the voice memo — so the idea survives and I can share it."*

---

## 3. Market & Competitive Landscape

### 3.1 Market size & dynamics

- Generative AI in music: ≈ **$570M (2024) → $2.8B (2030)** at ~30.5% CAGR (Grand View Research). Software is the dominant and fastest-growing component; North America is the largest region (~39% share), with APAC the fastest-growing.
- Demand-side signal: Suno alone reported ~2M paying subscribers by early 2026 and raised $250M at a $2.45B valuation (Nov 2025) — proving consumers *pay* for AI music creation at scale.
- Supply-side signal: Deezer reported ~44% of new daily uploads to its platform are now fully AI-generated (2026) — original *human-performed* input is becoming a differentiator, not a limitation. BoomTap output is human-authored by construction (your performance is the skeleton), which also materially helps users' copyright position (see §15).
- India (initial co-launch market alongside the US): one of the largest and fastest-growing creator bases on Instagram Reels/YouTube Shorts, strong beatbox scene (Indian Beatbox Championships), price-sensitive → regional pricing required (see §12).

### 3.2 Competitive landscape

| Product | What it does | Platform | Faithful to your groove? | Finished track? | No skill/setup needed? | Price |
|---|---|---|---|---|---|---|
| **Vochlea Dubler 2** | Real-time voice→MIDI controller (beatbox drums, hummed melody, vowel CCs) | Desktop + DAW | ✅ Excellent (best-in-class beatbox recognition) | ❌ MIDI only | ❌ Needs DAW, mic setup, per-sound training (up to 12 reps/sound) | ~$220–350 (kit w/ mic) |
| **Sonarworks SoundID VoiceAI** | Studio plugin: converts recorded vocals/beatbox into drum & instrument timbres (50+ presets) | Desktop plugin | ✅ (timbre transfer preserves performance) | ❌ Single-track conversion, not arrangement | ❌ DAW required | Plugin pricing |
| **Kits.AI (instrument models)** | Upload beatbox → converts to an AI instrument sound | Web | Partial (audio-to-audio conversion) | ❌ One converted stem | ✅ Easy | Freemium |
| **Suno (incl. Studio)** | Text→song; audio upload (6 s–8 min) as reference for Cover/Extend; timeline "Studio" with stem generation | Web/mobile | ❌ Audio treated as *influence*; melody/rhythm "referenced not copied"; user-reported instability | ✅ Best-in-class full songs w/ vocals | ✅ Easy | Free–$30/mo |
| **Udio (post-settlement)** | Licensed walled-garden creation/remix; download/export heavily restricted | Web | ❌ | ✅ (in-platform only) | ✅ | Subscription |
| **DAW built-ins (Ableton/Logic audio-to-MIDI)** | Offline audio→MIDI conversion tuned for instruments | Desktop | Partial (not tuned for vocal timbre) | ❌ | ❌ | DAW cost |
| **Text-to-"beatbox" novelty tools (Musicful, Vidnoz, InsMelo)** | Generate beatbox-*sounding* audio from text | Web | ❌ (opposite direction) | Partial | ✅ | Freemium |
| **BoomTap (this PRD)** | Beatbox/hum → faithful editable MIDI → produced full track | **Mobile-first** | ✅ **Core promise** | ✅ | ✅ Zero-setup, optional 60-s calibration | Freemium |

### 3.3 The defensible gap

1. **Fidelity + Production together.** Dubler is faithful but stops at MIDI in a DAW; Suno produces full tracks but is unfaithful to input groove. BoomTap = faithful *and* finished. The editable-MIDI "trust layer" between capture and generation is the moat in UX terms: users can *see* that the app heard them correctly, fix any missed hit in two taps, and only then stylize.
2. **Mobile capture context.** Ideas strike on trains (literally — see Puth). Desktop tools structurally can't own the moment of inspiration.
3. **Data flywheel.** Every in-app correction (user fixes a mis-labeled snare) is a labeled training example for the exact hardest problem (amateur, noisy, cross-device vocal percussion). Incumbents' data is text prompts; ours is groove.
4. **Community wedge.** The global beatbox scene (Swissbeatbox media ecosystem, Grand Beatbox Battle, national championships incl. India) is passionate, underserved, and hyper-demonstrable on video — a concentrated seed community competitors aren't courting.

**Primary competitive risk** (addressed in §14): Suno/Udio ship a "strict rhythm-lock" mode. Our answer: speed of the faithful layer (instant, on-device, offline), editability, MIDI/stem export for real producer workflows, per-user calibration accuracy, and community ownership.

---

## 4. Target Users & Personas

### P1 — "Kartikey," the Idea-Haver (primary; drives volume)
- 16–30, no production skills, musical instincts, chronically online; already records voice memos or beatboxes casually; makes Reels/Shorts.
- **Need:** hear the beat in his head as a real track, today, on his phone, free to start.
- **Success moment:** plays the produced track for a friend within 5 minutes of beatboxing it. Shares a split-screen video.
- **Willingness to pay:** low initially; converts on export limits, track length, and "remove watermark tag."

### P2 — "Aanya," the Bedroom Producer (secondary; drives revenue + credibility)
- 18–35, uses FL Studio/Ableton/GarageBand at hobbyist level; sketches ideas vocally; frustrated by manual transcription.
- **Need:** groove-accurate MIDI + stems she can pull into her DAW; the produced track is a bonus/demo.
- **Success moment:** exports drum MIDI that needed < 2 corrections, drops it into her project, keeps her swing intact.
- **Willingness to pay:** high for MIDI/WAV/stems export and kit quality (Pro/Studio tiers).

### P3 — "Ravi," the Beatboxer / Content Creator (tertiary; drives distribution)
- Skilled vocal percussionist; performs advanced sounds (inward K snare, lip rolls); audience on YT/IG.
- **Need:** transform performances into produced tracks + shareable content; advanced sound vocabulary support; low-latency live mode eventually.
- **Success moment:** posts "my mouth vs. the AI production" video; it outperforms his usual content.
- **Willingness to pay:** Studio tier + early access to Live/plugin features; also a GTM partner.

**Explicit non-goals for v1:** professional live performance rig (Dubler's turf — Phase 3), singing-with-lyrics topline generation, DAW replacement, social network/feed (share *out* to existing platforms instead).

---

## 5. Product Principles

1. **Fidelity before flair.** The user must recognize *their* beat in the output. Any generative styling sits on top of a transcription the user can inspect and correct. If we ever have to choose, we keep the groove and sacrifice polish.
2. **Time-to-magic under 60 seconds.** From app-open to hearing a produced version of your beat must fit inside one idle moment. Every added screen before first playback is a bug.
3. **Zero prerequisites, progressive depth.** No calibration, account, or music theory needed for the first track. Calibration, editing, stems, and plugin depth reveal themselves as the user grows.
4. **The mic is sacred.** Voice recordings are intimate. On-device processing by default, explicit consent for any upload, opt-in (never default) contribution to model training, one-tap deletion.
5. **Clean by construction.** Licensed/owned training data only; provenance tracking on all generated audio; no artist-style or voice cloning. We are the company that *doesn't* get sued.

---

## 6. Scope & Phasing

### Phase 0 — Technical prototype (internal, Weeks 0–6)
Validate the two riskiest links: (a) zero-shot transcription accuracy on amateur beatbox across 30 test users/devices; (b) groove-conditioned generation quality (does a produced track still *feel* like the input?). Go/no-go gate: ≥ 80% median event-classification accuracy zero-shot AND ≥ 70% of test users rate the produced track "clearly my beat" (blind A/B vs. Suno audio-upload baseline).

### Phase 1 — MVP: "Capture → Faithful → Produce → Share" (public beta)
iOS app. Beatbox capture (up to 8 bars), on-device transcription, tap-to-edit drum grid, 20 built-in kits (Faithful mode), cloud Produce mode (8 genre styles, instrumental only), hum-a-melody second pass (bassline/lead), export MP3/WAV/MIDI + auto-generated share video, Free/Pro tiers.

### Phase 2 — Depth & Android
Android app; Studio tier with stem export; 8+ sound classes incl. advanced beatbox vocabulary; groove templates & quantize control; longer arrangements (up to 3 min) with section editing (intro/verse/drop); collaboration (send a beat, friend adds a hum layer); 20+ styles.

### Phase 3 — Pro & Platform
Real-time Live mode (≤ 20 ms trigger latency) on supported hardware; VST3/AU desktop plugin (direct Dubler competitor); public API/SDK ("mouth-to-MIDI as a service"); DAW export integrations (Ableton Link, drag-to-DAW).

**Out of scope (all phases until revisited):** AI vocals/lyrics generation (moderation + licensing surface we defer), social feed, NFT/web3 anything, artist voice cloning (permanent no).

---

## 7. Golden-Path User Journey (MVP)

1. **Open app** → big red record button. First-run overlay (one screen): "Beatbox 4–8 bars. Kick = *boots*, snare = *cats*, hi-hat = *ts*. Or just make sounds — we'll figure it out." Optional 15-s demo video.
2. **Record** with optional metronome/count-in (default OFF for first-timers — capture must feel like a voice memo; tempo is inferred). Auto-stop on 4 s silence or manual stop.
3. **Instant Faithful playback (< 3 s later):** the app plays the beat back on a default acoustic/trap kit, looped, with a scrolling drum-grid visualization of what it heard. Delight moment #1: "it *heard* me."
4. **Optional fix-ups:** tap any cell to toggle/re-label a hit; drag quantize slider ("Loose ↔ Tight," default 65% snap-with-feel); swipe to audition other kits.
5. **(Optional) Add a melody:** "Hum a bassline?" → second pass recorded over the looping beat → pitch-tracked to MIDI, rendered as bass/lead.
6. **Produce:** pick a style card (Trap, Lo-fi, House, Drum & Bass, Bollywood/Desi Hip-Hop, Rock, Afrobeats, Cinematic) → cloud render (P50 ≤ 20 s) → 2 variations returned. Delight moment #2: "that's MY beat, but *huge*."
7. **Share/Export:** one-tap vertical share video (waveform + "made with my mouth" split-audio toggle: original ↔ produced), or export MP3/WAV/MIDI. Account creation is deferred to this step (save/export gate), not before.
8. **Progressive depth prompts (later sessions):** "Teach BoomTap your sounds (60 s) for near-perfect accuracy" → calibration flow; "Try 8 bars with a fill"; "Send this beat to a friend to add a topline hum."

---

## 8. Functional Requirements

Priorities: **P0** = MVP-blocking · **P1** = MVP-target, cuttable to fast-follow · **P2** = post-MVP.

### 8.1 Capture

- **FR-1 (P0) Recording.** 48 kHz mono capture, hardware AEC/AGC/noise-suppression bypassed in favor of our own chain (we need raw transients); support built-in mic, wired & Bluetooth headsets (warn on high-latency BT for monitored recording). Max take length 60 s (MVP).
  *Acceptance:* clean transient capture verified on device farm (≥ 12 device models incl. budget Android for Phase 2 parity planning); clipping auto-detected with "too loud, back off a bit" hint.
- **FR-2 (P0) Guided onboarding hints** ("boots/cats/ts" vocabulary card) shown on first run only; skippable; localized (EN + HI at launch).
- **FR-3 (P1) Metronome & count-in** with tap-tempo and BPM entry; per-user default remembered.
- **FR-4 (P1) Import audio** from Files/Voice Memos (user-owned recordings only; ≤ 60 s; content-ID screening per §15 before any cloud processing).
- **FR-5 (P2) Multi-pass layering:** record percussion pass 2 (e.g., shaker layer) on top of the loop.

### 8.2 Transcription engine ("Faithful layer")

- **FR-6 (P0) Onset detection** on-device; algorithmic latency budget ≤ 10 ms/event; min inter-onset gap 30 ms.
  *Acceptance:* onset F1 ≥ 0.93 (zero-shot) on internal amateur test set (§10.4); ≥ 0.95 on calibrated users.
- **FR-7 (P0) Event classification** into 5 classes MVP: kick, snare, closed hi-hat, open hi-hat, other-percussion (mapped to a genre-appropriate perc sound). Class set extends to ≥ 9 in Phase 2 (rimshot, clap, tom, crash/ride, inward-K snare, lip roll → mapped FX).
  *Acceptance:* per-event accuracy ≥ 80% zero-shot, ≥ 92% post-calibration, measured on held-out users; confusion pairs (kick↔tom, closed↔open hat) individually ≥ 75% zero-shot.
- **FR-8 (P0) Velocity & dynamics:** map per-event energy/spectral weight to MIDI velocity (full 1–127 range, per-class normalized) so accents survive.
- **FR-9 (P0) Tempo & meter inference** (no metronome required): BPM estimate within ±2 BPM of tapped ground truth for ≥ 90% of takes with ≥ 8 detected events; assume 4/4 in MVP with manual override; loop-length inference to 4 or 8 bars.
- **FR-10 (P0) Groove-preserving quantize:** default snaps events to a 1/16 grid *while storing the residual micro-timing as a groove template* re-applied on render; user slider 0–100%; triplet-grid auto-detect (P1).
- **FR-11 (P0) Editable drum grid:** step-sequencer view of the transcription; tap to add/delete, long-press to re-label class, drag to nudge; every user correction is logged (locally; uploaded only under opt-in per §15) as labeled training data.
- **FR-12 (P1) Per-user calibration ("Teach it your sounds"):** optional 60-s flow — user records 4 examples of each core sound; few-shot prototype/embedding adaptation updates the on-device classifier immediately. Research basis: user-specific models materially outperform generic ones for amateur vocal percussion; this is our accuracy ceiling-raiser.
- **FR-13 (P1) Hum-to-melody pass:** monophonic pitch tracking (semitone-quantized w/ key inference, scale-snap toggle) → bassline/lead MIDI; range handling for octave errors.

### 8.3 Production engine

- **FR-14 (P0) Faithful mode (instant, on-device):** render transcribed MIDI through ≥ 20 built-in sampled kits (acoustic, trap/808, boom-bap, house, DnB, Latin/Afro perc, Bollywood perc, lo-fi, rock, electronic); velocity-layered samples; works offline.
- **FR-15 (P0) Produce mode (cloud):** full-arrangement generation conditioned on {drum MIDI + groove template + tempo + optional melody MIDI + style tag + optional short text hint}. Hard constraint: generated percussion must lock to the transcribed pattern (rhythm conditioning weight non-negotiable in MVP; "creative drift" slider is P2). Returns 2 variations, 30–60 s arrangements (intro-loop-outro), instrumental only in MVP.
  *Acceptance:* in blind tests, ≥ 75% of listeners match the produced track to its source beatbox out of 3 candidates; render P50 ≤ 20 s, P95 ≤ 45 s for 60 s output.
- **FR-16 (P1) Style packs at launch:** 8 styles (see journey step 6) each with reference kit, tempo-range logic, and arrangement grammar; style roadmap data-driven post-launch.
- **FR-17 (P1) Section control:** regenerate a single section (e.g., just the drop) without re-rolling the whole track.
- **FR-18 (P2) Longer forms:** up to 3-min arrangements with song-structure editor.

### 8.4 Output, sharing & library

- **FR-19 (P0) Export:** MP3 (Free), WAV + standard MIDI file (Pro), per-instrument stems (Studio/Phase 2). Free-tier audio carries a subtle end-tag audio watermark + metadata provenance tag (C2PA-style content credentials on all generated audio, all tiers).
- **FR-20 (P0) Share video generator:** auto vertical MP4 (waveform/grid visualizer, before/after audio toggle, app attribution frame); direct share sheet to IG/TikTok/YT/WhatsApp.
- **FR-21 (P0) Project library:** takes, transcriptions, edits, renders saved locally + cloud sync post-login; original voice recordings stored on-device by default (cloud copy only if user enables sync — §15).
- **FR-22 (P1) A/B player:** toggle original beatbox ↔ faithful ↔ produced with tempo-aligned switching (core "wow" demo mechanic).
- **FR-23 (P2) Collab handoff:** shareable project link; recipient can add a hum/percussion layer.

### 8.5 Accounts & monetization surface

- **FR-24 (P0) Auth** deferred to save/export; Apple/Google/phone-OTP sign-in; guest mode fully functional through first produced track.
- **FR-25 (P0) Entitlements:** Free = 3 Produce renders/day, 60 s cap, MP3+tag; Pro = high daily cap, WAV/MIDI, all kits/styles, no audio tag; Studio = stems, commercial-use license grant, priority render queue, plugin beta access (Phase 3). (Pricing §12.)
- **FR-26 (P1) Referral loop:** shared video viewers → deep link → attribution; referrer earns bonus renders.

## 9. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Latency** | Faithful preview start ≤ 3 s after stop (P50 ≤ 1.5 s). Produce render P50 ≤ 20 s / P95 ≤ 45 s (60 s output). App cold start ≤ 2 s. Phase 3 Live mode: ≤ 20 ms end-to-end trigger on supported devices/wired audio. |
| **Accuracy** | Per FR-6/7/9 targets; tracked continuously via edit-rate proxy (§11) with per-device/per-locale breakdowns. |
| **Robustness** | Graceful degradation to ≥ 70% event accuracy at 10 dB SNR (street/room noise); explicit low-confidence UI state ("I probably missed a few — tap to fix") instead of silent failure. |
| **Footprint** | On-device model bundle ≤ 30 MB; app ≤ 150 MB w/ 6 starter kits, remaining kits downloadable. Battery: ≤ 3%/10-min active session on reference device. |
| **Offline** | Capture, transcription, editing, Faithful mode fully offline; Produce queues offline and renders on reconnect. |
| **Availability** | Produce service 99.5% monthly; render queue with position feedback under load; graceful "Faithful-only" fallback messaging on outage. |
| **Devices** | MVP: iOS 16+, iPhone 11+. Phase 2: Android 12+, mid-range (4 GB RAM) parity with cloud-transcription fallback for low-end devices. |
| **Privacy/Security** | §15 requirements are release-blocking: on-device default, consented uploads, encryption in transit/at rest, deletion SLA ≤ 30 days, DPDP/GDPR/CCPA, 13+ age gate. |
| **Accessibility** | Full VoiceOver/TalkBack labels; haptic metronome option; color-blind-safe grid palette; captions on all tutorial video. |
| **Localization** | EN + HI at launch; UI copy avoids music-theory jargon everywhere. |

---

## 10. System & ML Architecture

### 10.1 Pipeline overview

```
                      ┌────────────────────────  ON-DEVICE  ────────────────────────┐
Mic ──► Capture ──► Preproc ──► Onset ──► Event ──► Tempo/Groove ──► Drum MIDI ──► Faithful
        (48kHz)    (HPF, AGC,   Detector  Classifier  Estimator      + Groove       Render
                    denoise)      │        (5-class,     │            Template      (sampler,
                                  │        few-shot      │               │           offline)
                                  │        adaptable)    │               │
                      User edits ◄┴────── Drum Grid UI ◄─┴───────────────┤
                     (labels ⇒ opt-in training data)                     │
                      └──────────────────────────────────────────────────┼──────────┘
                                                                         ▼ (consented upload: MIDI
                                                                            + features; raw audio
                                                                            only if user opts in)
                                              ┌──────────  CLOUD  ──────────┐
                                              │ Produce Service:            │
                                              │  rhythm-conditioned music   │
                                              │  generation (MIDI+groove+   │
                                              │  style) ─► arrangement ─►   │
                                              │  master ─► watermark/C2PA   │
                                              └──────────────┬──────────────┘
                                                             ▼
                                                Track + stems + share video
```

### 10.2 On-device models (Faithful layer)

- **Onset detector:** lightweight CNN on log-mel spectrogram frames (madmom-style CNN onset detection as reference baseline), distilled/quantized; ≤ 5 MB.
- **Event classifier:** embedding network (trained on AVP + LVT + Stowell corpora + proprietary data, §10.4) + prototype head enabling instant few-shot per-user adaptation (FR-12) without on-device backprop. ≤ 15 MB int8. Design note from the literature: classification improves when the analysis window tolerates ~20 ms of post-onset signal — we exploit this since MVP is non-realtime (Live mode in Phase 3 will need the delayed-decision strategy documented by Stowell & Plumbley).
- **Pitch tracker (FR-13):** small monophonic F0 model (CREPE-tiny/pYIN class), semitone quantization + key inference.
- **Tempo/groove:** onset-train autocorrelation + prior over 60–180 BPM; residual micro-timing stored per event as the groove template.
- Runtime: Core ML (iOS) / NNAPI-TFLite (Android); all Faithful-layer inference offline-capable.

### 10.3 Cloud Produce service

- **Generation approach (MVP):** rhythm-locked hybrid — transcribed drums are *rendered deterministically* (guaranteeing groove fidelity), while bass/harmony/texture layers are generated conditioned on the drum track, tempo, key, and style embedding; auto-arranged (intro/loop/variation/outro), auto-mixed and loudness-normalized (-14 LUFS streaming target). This hybrid de-risks MVP quality vs. end-to-end audio generation and keeps the fidelity promise structurally true.
- **Build vs. buy for the generative layers:**

| Option | Pros | Cons | Decision |
|---|---|---|---|
| Fine-tune open-weights music models (e.g., MusicGen / Stable Audio Open class) on **fully licensed** production-music + commissioned stems | Control, cost at scale, clean provenance | Quality ceiling vs. frontier; MLOps burden | ✅ **MVP path** |
| Partner API (licensed frontier model w/ indemnification) | Fastest quality | Cost/track, dependency, differentiation risk | 🔶 Evaluate in parallel for premium styles |
| Train from scratch | Max control | Time, cost, data scale | ❌ Not now |

- **Serving:** GPU render workers, per-style model registry, result caching by (MIDI-hash, style, seed); autoscaling queue with position feedback; cost target ≤ $0.02/render at MVP scale, driving Free-tier caps (§12).
- **Provenance:** every generated file embeds content credentials + inaudible watermark; generation logs retained for licensing audits (the UMG–Udio settlement template signals per-generation royalty accounting and audit rights are becoming table stakes — we build the plumbing now).

### 10.4 Data strategy (the moat)

1. **Bootstrap (Weeks 0–8):** public research corpora — AVP (9,780 annotated utterances, 28 amateur participants, kick/snare/closed-hat/open-hat), LVT, Stowell beatbox corpus (7,460 utterances, experienced performers) — plus heavy augmentation (room IRs, phone-mic EQ curves, background noise, pitch/tempo jitter, codec simulation).
2. **Proprietary collection (Weeks 4–16):** paid, consented recording program — target 500+ participants × 10 min across genders, ages, accents/regions (India + US oversampled), skill levels, and ≥ 25 device models; annotation via in-house tool; advanced-vocabulary sessions commissioned from pro beatboxers (community partnership, paid).
3. **Flywheel (post-launch):** opt-in "Improve BoomTap" program uploads (a) corrected transcriptions always, (b) raw audio only under a separate explicit toggle; contributors get perks (bonus renders). Every correction is a hard-negative label exactly where the model fails.
4. **Eval discipline:** frozen held-out user cohorts (zero-shot + calibrated), per-device/per-locale dashboards, weekly regression gates; subjective quality via monthly MOS + "is this my beat?" A/B panels.

---

## 11. Success Metrics

**North Star: Weekly Produced Tracks Shared or Exported (WPTS)** — captures the full loop (capture → fidelity → production → pride).

| Funnel stage | Metric | MVP target (Month 3 post-beta) |
|---|---|---|
| Activation | % new users hearing a Faithful playback in session 1 | ≥ 80% |
| Magic | Median time-to-first-produced-track | ≤ 90 s |
| Fidelity (proxy) | Median % of events edited per take | ≤ 15% (alert > 25%) |
| Value | % new users producing ≥ 1 track in week 1 | ≥ 55% |
| Retention | D7 / D30 | ≥ 20% / ≥ 8% |
| Virality | Exports shared externally / K-factor from share links | ≥ 25% / ≥ 0.3 |
| Revenue | Free→paid conversion / M1 sub retention | ≥ 4% / ≥ 85% |
| Quality | "Sounds like my beat" in-app 👍 rate on renders | ≥ 75% |
| Trust | Voice-data opt-in rate (health of consent UX, not a growth KPI) | informational |

Guardrails: render success rate ≥ 99%, crash-free sessions ≥ 99.5%, support-ticket rate, refund rate.

---

## 12. Monetization & Pricing

| Tier | US | India (regional) | Includes |
|---|---|---|---|
| **Free** | $0 | ₹0 | Unlimited capture/Faithful mode; 3 Produce renders/day; 60 s tracks; MP3 with audio end-tag; core kits |
| **Pro** | $7.99/mo or $59.99/yr | ₹399/mo or ₹2,499/yr | 100 renders/mo; WAV + MIDI export; all kits & styles; no audio tag; calibration profiles ×3 |
| **Studio** | $16.99/mo or $129.99/yr | ₹799/mo or ₹5,999/yr | Everything in Pro + stems, commercial-use license, priority queue, 3-min tracks (Phase 2), plugin & Live beta (Phase 3) |

Rationale: priced under Suno's top tier while anchoring value on *ownership of your own performance* (MIDI/stems = artifacts text-to-music tools can't meaningfully give). Launch offer: 7-day Pro trial after first shared track. Future lines (not MVP): kit/style packs marketplace with rev-share for sound designers; API seats (Phase 3); education/brand licensing.

---

## 13. Go-to-Market

1. **Seed the beatbox scene (pre-launch):** paid collabs with top beatbox media brands and champions (global + Indian scene); their advanced-vocabulary recordings double as training data (§10.4). Sponsor community battles; "official practice/production app" positioning.
2. **The "Attention moment" narrative:** launch film retelling the verified Charlie Puth story — a hit that started as a beatboxed voice memo on a train — ending with "your voice memos deserve a producer." (Narrative reference only; no implied endorsement, no likeness use without a deal — Legal to clear final cut. A dream flagship partnership to pursue, not assume.)
3. **Built-in virality:** the A/B share video (mouth ↔ track toggle) is the growth engine; watermark end-tag on Free exports carries attribution; #MadeWithMyMouth challenge with creator seeding in IN + US.
4. **Channels:** TikTok/Reels/Shorts creator seeding → App Store featuring push (Apple loves on-device ML + creativity stories) → product-hunt/press for the producer angle (MIDI export hook for the DAW crowd).
5. **Community:** Discord with weekly beat challenges; leaderboard of best transformations; direct pipeline from community feedback to style-pack roadmap.

---

## 14. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Zero-shot accuracy disappoints for untrained users → broken magic moment | Med | High | Phase-0 gate; low-confidence UX with instant edit; 60-s calibration path; expectation-setting onboarding ("boots & cats"); edit-rate telemetry with rapid model iteration |
| R2 | Incumbent (Suno/Udio/Stability) ships strict rhythm-lock audio input | Med-High | High | Speed (instant on-device Faithful), editable MIDI + stems (pro artifacts), calibration accuracy moat, community ownership, Phase-3 API to become infrastructure |
| R3 | Training-data/legal exposure for generative layers | Med | Severe | Licensed/commissioned data only; provenance + audit logs from day 1; parallel indemnified partner-API track; monitor Sony v. Suno/Udio rulings (summary-judgment activity through 2026) before any policy loosening |
| R4 | Cloud render cost > LTV at Free tier | Med | Med | Hybrid architecture keeps drums deterministic (cheap); caching; caps; distillation; Faithful mode is free-forever and $0 marginal |
| R5 | Noisy real-world capture (street, hostel rooms) degrades UX | High | Med | Robustness NFR + augmentation; visible confidence UI; headphone-mic guidance; "re-take last 2 bars" flow |
| R6 | Beatbox is perceived as niche | Med | Med | Position around universal behaviors — "hum or beatbox," voice-memo framing; onboarding never uses the word "beatbox" as a skill requirement |
| R7 | App-store rejection / audio-permission friction | Low | Med | Just-in-time mic permission with clear value copy; privacy nutrition labels accurate; pre-submission review with platform reps |
| R8 | Advanced beatboxers hit vocabulary limits and churn loudly | Med | Low-Med | "Other-perc" catch-all mapping in MVP; Phase-2 class expansion co-designed with community; transparent roadmap |

---

## 15. Legal, Privacy & Safety

- **Voice data.** Recordings are biometric-adjacent personal data: on-device processing by default; cloud upload only on explicit action (Produce/sync) with clear disclosure; separate opt-in for research/training use of raw audio (corrected *MIDI/feature* data under its own toggle); deletion within ≤ 30 days of request incl. derived training copies where user revokes; regional compliance — India DPDP Act 2023, GDPR, CCPA; 13+ age gate with under-16 defaults set to strictest privacy.
- **Training-data licensing.** All generative-model training audio must be owned, commissioned, or affirmatively licensed with written chain-of-title; no scraping. Context: the 2024 RIAA suits ended (so far) in Warner–Suno and UMG–Udio settlements that convert AI music into a *licensed* category — with per-generation royalty structures and audit rights emerging as the template — while Sony litigation and independent-artist class actions continue into 2026. Entering clean is a strategic asset, not just compliance.
- **User uploads (FR-4).** Audio-fingerprint screening before cloud processing to block copyrighted-recording uploads (established platform practice); users affirm ownership of imports.
- **Output rights.** Users own their exports per ToS; Studio tier includes explicit commercial-use grant. Because every track is built on the user's recorded human performance (their groove, their melody), users have a substantially stronger human-authorship position than pure prompt-based generation under current US Copyright Office guidance — a marketable differentiator; provide an exportable "creation record" (input recording + transcription + edit log) users can keep as authorship evidence.
- **Provenance & platform policy.** C2PA content credentials + inaudible watermark on generated audio; API rate-limiting and abuse detection; no voice cloning, no artist-style prompts ("sounds like <artist>" blocked), no impersonation features — permanent policy.
- **Content safety.** MVP is instrumental-only (no lyric generation → minimal moderation surface); share-video templates contain no user-generated text beyond title (profanity-filtered).

---

## 16. Release Plan & Milestones

**Team (MVP squad, 9):** PM ·  Design (1) · iOS (2) · ML-audio (2) · Backend/ML-infra (1) · DSP/audio engine (1) · Data/annotation lead (1). Fractional: legal counsel, sound designer (kits), growth.

| Milestone | Week | Exit criteria |
|---|---|---|
| **M0 — Prototype gate** | 6 | Phase-0 accuracy + "clearly my beat" thresholds hit (see §6); go/no-go |
| **M1 — Faithful alpha (internal)** | 12 | Capture→transcribe→edit→kit playback E2E on iOS; onset F1 ≥ 0.90 zero-shot; 50-user dogfood |
| **M2 — Produce alpha** | 17 | Cloud pipeline live w/ 4 styles; render P50 ≤ 30 s; blind fidelity test ≥ 70% |
| **M3 — Closed beta (TestFlight, 1–2K users incl. beatbox community)** | 21 | Full golden path incl. share video, accounts, entitlements; crash-free ≥ 99%; edit-rate ≤ 20% |
| **M4 — Public beta launch (iOS, IN + US)** | 26 | §11 instrumentation complete; NFR latency targets met; legal signoff (privacy, ToS, licensing files); GTM assets live |
| **M5 — Android + Studio tier** | 38 | Phase-2 scope |

Dependencies: licensed training-audio deals signed by Week 8 (blocks M2); data-collection program launched by Week 4 (blocks M1 accuracy targets); kits sound-design contract by Week 6.

---

## 17. Open Questions

1. **Naming/trademark.** "BoomTap" placeholder — full clearance search (word + logo, classes 9/41/42, IN + US + EU) before M3.
2. **Metronome-free tempo UX.** How far can inference go before we nudge first-timers toward count-in? (Phase-0 data decides.)
3. **Partner-API economics.** Does a licensed frontier model for 2–3 "premium styles" beat our fine-tuned quality by enough to justify per-render cost?
4. **Vocals roadmap.** User demand for toplines is inevitable; entering means lyric moderation + bigger licensing surface. Revisit post-M5 with data.
5. **Suno Studio interop.** Export path *into* competitors' DAW-like tools: growth channel or moat leak?
6. **Live mode hardware floor.** Which device/audio-path combos can truly hit ≤ 20 ms? (Phase-3 spike.)
7. **Data-contributor compensation.** Perks vs. revenue-share for the opt-in program — community sentiment test in beta.

---

## Appendix A — Key References (research & market)

1. Vochlea Dubler 2 — real-time voice-to-MIDI (product & FAQ): vochlea.com; MusicTech & Sound On Sound reviews (beatbox recognition strengths; per-sound training UX).
2. Sonarworks SoundID VoiceAI — beatbox→drum conversion plugin guides: sonarworks.com/blog.
3. Suno — Audio Inputs & Upload-Audio help docs; Suno Studio recording/Create-influence docs; Reuters via MarketScreener on Warner–Suno settlement, $250M raise at $2.45B, licensed-model transition & download-limit changes (Nov 2025).
4. Udio — post-UMG-settlement platform changes (licensed walled-garden; export restrictions) — industry coverage 2025–26.
5. Legal landscape: Forbes (Dec 2025) "Launch, Train, Settle" settlement analysis; Chartlex AI-lawsuit tracker (Jul 2026); AIVortex case summaries (UMG–Udio per-generation royalty range; audit rights); TechTimes on Sony litigation & 2026 summary-judgment schedule.
6. VPT research: Delgado et al., *A New Dataset for Amateur Vocal Percussion Analysis* (AVP; ACM Audio Mostly 2019); Delgado et al., *Deep Embeddings for Robust User-Based Amateur Vocal Percussion Classification* (arXiv:2204.04646); Ramires — LVT dataset/system; Stowell & Plumbley, *Delayed decision-making in real-time beatbox percussion classification* (JNMR 2010); Sinyor et al., *Beatbox Classification Using ACE* (ISMIR 2005); Mehta et al., *BaDumTss: Multi-task Learning for Beatbox Transcription* (2022); Schlüter & Böck, CNN onset detection (ICASSP 2014); madmom MIR toolkit.
7. Market: Grand View Research, *Generative AI in Music Market* (2024 base $569.7M → $2,794.7M by 2030, 30.5% CAGR); Deezer/Ipsos AI-music perception survey (2025); Deezer synthetic-upload share disclosures (2026 coverage).
8. Origin story: Songfacts & Wikipedia on Charlie Puth's "Attention"/*Voicenotes* (beatboxed voice-memo origin, Tokyo train anecdote).

## Appendix B — Glossary

**Boxeme** — a single vocal-percussion sound event (research term). · **VPT** — Vocal Percussion Transcription. · **Onset** — the detected start of a sound event. · **Groove template** — stored per-event micro-timing deviations from the grid, re-applied at render so quantized beats keep human feel. · **Faithful mode** — deterministic render of the transcription (no generation). · **Produce mode** — generative arrangement conditioned on the transcription. · **C2PA** — content-provenance standard for media credentials. · **MOS** — Mean Opinion Score listening test.

## Appendix C — Sample analytics events (MVP spec excerpt)

`capture_started {source, metronome_on}` · `capture_completed {duration_ms, clip_detected}` · `transcription_rendered {events_n, bpm, confidence_p50, latency_ms}` · `event_edited {edit_type: add|delete|relabel|nudge, class_from, class_to}` · `calibration_completed {classes_n, duration_s}` · `produce_requested {style, has_melody, length_s}` · `produce_delivered {latency_ms, variation_n}` · `render_feedback {thumbs, reason?}` · `export {format, tier}` · `share {channel, ab_video}` — all events carry anonymized user/device/build; **no raw audio ever attached to analytics.**

---

*End of PRD v1.0 — next action: staff Phase-0 prototype and book the M0 gate review.*
