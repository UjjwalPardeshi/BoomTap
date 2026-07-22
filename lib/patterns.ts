export type RowId = "kick" | "snare" | "chh" | "ohh";

export type Pattern = Record<RowId, number[]>;

export type PresetName = "boots" | "trap" | "house";

export interface RowDef {
  id: RowId;
  label: string;
}

export interface Preset {
  bpm: number;
  pattern: Pattern;
}

export const STEPS = 16;

export const ROWS: RowDef[] = [
  { id: "kick", label: "Kick" },
  { id: "snare", label: "Snare" },
  { id: "chh", label: "Hat" },
  { id: "ohh", label: "Open hat" },
];

// Fixed micro-timing per step, as a fraction of one 16th note.
// This is the "groove template": deterministic, human-ish, never random.
export const GROOVE = [
  0, 0.16, -0.1, 0.2, 0.02, 0.14, -0.07, 0.24, 0, 0.11, -0.12, 0.18, 0.03,
  0.15, -0.08, 0.26,
];

// Bass notes for Produced mode, one per step (Hz, A minor-ish line).
export const BASS_LINE = [
  55, 0, 0, 55, 0, 0, 65.41, 0, 49, 0, 0, 49, 0, 58.27, 0, 0,
];

export const PRESETS: Record<PresetName, Preset> = {
  boots: {
    bpm: 92,
    pattern: {
      kick: [1, 0, 0, 0, 0, 0, 0, 0.8, 0, 0, 1, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      chh: [0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0, 0.4],
      ohh: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    },
  },
  trap: {
    bpm: 140,
    pattern: {
      kick: [1, 0, 0, 0.9, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0.8, 0, 0],
      snare: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      chh: [
        0.7, 0.4, 0.6, 0.4, 0.7, 0.4, 0.6, 0.4, 0.7, 0.4, 0.6, 0.4, 0.7, 0.5,
        0.8, 0.5,
      ],
      ohh: [0, 0, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  house: {
    bpm: 122,
    pattern: {
      kick: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0],
      chh: [
        0.5, 0, 0, 0.35, 0.5, 0, 0, 0.35, 0.5, 0, 0, 0.35, 0.5, 0, 0, 0.35,
      ],
      ohh: [0, 0, 0.8, 0, 0, 0, 0.8, 0, 0, 0, 0.8, 0, 0, 0, 0.8, 0],
    },
  },
};

export function emptyPattern(): Pattern {
  return {
    kick: new Array(STEPS).fill(0),
    snare: new Array(STEPS).fill(0),
    chh: new Array(STEPS).fill(0),
    ohh: new Array(STEPS).fill(0),
  };
}

export function clonePattern(p: Pattern): Pattern {
  return {
    kick: [...p.kick],
    snare: [...p.snare],
    chh: [...p.chh],
    ohh: [...p.ohh],
  };
}
