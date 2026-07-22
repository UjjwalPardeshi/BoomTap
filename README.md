# BoomTap

**From mouth to music.** Marketing site for BoomTap — the beatbox-to-music AI
described in [the PRD](beatbox-to-music-ai-prd.md).

Built with Next.js (App Router) + React + TypeScript. Deployed on Vercel.

```bash
npm install
npm run dev    # local dev on http://localhost:3000
npm run build  # production build
```

## Structure

- `app/` — layout (fonts, metadata), page composition, global CSS
- `components/` — one component per section; client components only where
  there's interactivity (drum machine, header nav, pricing toggle, beta form)
- `lib/` — Web Audio synth engine and sequencer pattern data

The demo section is a working drum machine (Web Audio API) — sound on.
