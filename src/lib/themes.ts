import type { CategoryTheme } from "@/types/vocabulary";

/**
 * Tailwind class sets for each category theme.
 *
 * Class names must be written out in full (not built with string
 * interpolation) so Tailwind can detect them at build time.
 */
export interface ThemeStyle {
  /** Soft card background + border */
  card: string;
  /** Solid icon tile background */
  iconTile: string;
  /** Accent text colour */
  text: string;
  /** Progress bar fill / track */
  bar: string;
  track: string;
  /** Gradient used on the back of flashcards and hero tiles */
  gradient: string;
  /** Primary button */
  button: string;
  /** Soft pill / chip */
  chip: string;
  /** Focus ring colour */
  ring: string;
}

export const THEMES: Record<CategoryTheme, ThemeStyle> = {
  blue: {
    card: "bg-sky-50/80 border-sky-100 hover:border-sky-300",
    iconTile: "bg-linear-to-br from-sky-400 to-blue-500 shadow-sky-500/30",
    text: "text-sky-700",
    bar: "bg-linear-to-r from-sky-400 to-blue-500",
    track: "bg-sky-100",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    button: "bg-sky-500 hover:bg-sky-600 shadow-sky-500/30",
    chip: "bg-sky-100 text-sky-700",
    ring: "focus-visible:ring-sky-400",
  },
  green: {
    card: "bg-emerald-50/80 border-emerald-100 hover:border-emerald-300",
    iconTile:
      "bg-linear-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30",
    text: "text-emerald-700",
    bar: "bg-linear-to-r from-emerald-400 to-teal-500",
    track: "bg-emerald-100",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    button: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30",
    chip: "bg-emerald-100 text-emerald-700",
    ring: "focus-visible:ring-emerald-400",
  },
  orange: {
    card: "bg-orange-50/80 border-orange-100 hover:border-orange-300",
    iconTile:
      "bg-linear-to-br from-amber-400 to-orange-500 shadow-orange-500/30",
    text: "text-orange-700",
    bar: "bg-linear-to-r from-amber-400 to-orange-500",
    track: "bg-orange-100",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    button: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/30",
    chip: "bg-orange-100 text-orange-700",
    ring: "focus-visible:ring-orange-400",
  },
  pink: {
    card: "bg-pink-50/80 border-pink-100 hover:border-pink-300",
    iconTile: "bg-linear-to-br from-pink-400 to-rose-500 shadow-pink-500/30",
    text: "text-pink-700",
    bar: "bg-linear-to-r from-pink-400 to-rose-500",
    track: "bg-pink-100",
    gradient: "from-pink-400 via-rose-500 to-orange-400",
    button: "bg-pink-500 hover:bg-pink-600 shadow-pink-500/30",
    chip: "bg-pink-100 text-pink-700",
    ring: "focus-visible:ring-pink-400",
  },
  purple: {
    card: "bg-violet-50/80 border-violet-100 hover:border-violet-300",
    iconTile:
      "bg-linear-to-br from-violet-400 to-purple-500 shadow-violet-500/30",
    text: "text-violet-700",
    bar: "bg-linear-to-r from-violet-400 to-purple-500",
    track: "bg-violet-100",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-500",
    button: "bg-violet-500 hover:bg-violet-600 shadow-violet-500/30",
    chip: "bg-violet-100 text-violet-700",
    ring: "focus-visible:ring-violet-400",
  },
};
