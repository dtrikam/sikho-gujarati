"use client";

import { RotateCcw, Star } from "lucide-react";
import type { CategoryTheme, VocabularyItem } from "@/types/vocabulary";
import { THEMES } from "@/lib/themes";
import { ItemVisual } from "@/components/ItemVisual";

interface FlashcardProps {
  item: VocabularyItem;
  theme: CategoryTheme;
  isFlipped: boolean;
  onFlip: () => void;
  isLearned?: boolean;
  className?: string;
}

/** Scale text down for longer words/phrases so everything fits on the card. */
function englishSize(text: string) {
  if (text.length > 18) return "text-2xl sm:text-3xl";
  if (text.length > 10) return "text-3xl sm:text-4xl";
  return "text-4xl sm:text-5xl";
}

function gujaratiSize(text: string) {
  if (text.length > 12) return "text-4xl sm:text-5xl";
  if (text.length > 6) return "text-5xl sm:text-6xl";
  return "text-6xl sm:text-7xl";
}

/**
 * A two-sided flashcard.
 * Front: English word + visual. Back: Gujarati script + phonetic pronunciation.
 * Controlled component — the parent owns the flipped state.
 */
export function Flashcard({
  item,
  theme,
  isFlipped,
  onFlip,
  isLearned = false,
  className = "",
}: FlashcardProps) {
  const t = THEMES[theme];

  const label = isFlipped
    ? `${item.english_word} in Gujarati is ${item.gujarati_script}, pronounced ${item.phonetic_pronunciation}. Tap to flip back.`
    : `${item.english_word}. Tap to see it in Gujarati.`;

  return (
    <button
      type="button"
      id={`flashcard-${item.id}`}
      onClick={onFlip}
      data-flipped={isFlipped}
      aria-label={label}
      className={`flip-card block h-[min(58vh,26rem)] w-full cursor-pointer rounded-4xl select-none ${className}`}
    >
      <span className="flip-card-inner block">
        {/* ---------- Front ---------- */}
        <span
          aria-hidden
          className="flip-card-face flip-card-front flex flex-col items-center justify-center gap-6 rounded-4xl border-2 border-white bg-white/95 p-8 text-center shadow-lift"
        >
          <span
            className={`absolute top-5 left-5 rounded-full px-3 py-1 text-xs font-extrabold tracking-wider uppercase ${t.chip}`}
          >
            English
          </span>
          {isLearned && (
            <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
              <Star className="size-3.5 fill-current" /> Learned
            </span>
          )}

          <ItemVisual item={item} size="lg" iconTileClassName={t.chip} />

          <span
            className={`font-display leading-tight font-bold text-ink ${englishSize(item.english_word)}`}
          >
            {item.english_word}
          </span>

          <span className="absolute bottom-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
            <RotateCcw className="size-4" /> Tap to flip
          </span>
        </span>

        {/* ---------- Back ---------- */}
        <span
          aria-hidden
          className={`flip-card-face flip-card-back flex flex-col items-center justify-center gap-5 overflow-hidden rounded-4xl bg-linear-to-br p-8 text-center text-white shadow-lift ${t.gradient}`}
        >
          {/* decorative glow */}
          <span className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-white/20 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-white/10 blur-2xl" />

          <span className="absolute top-5 left-5 rounded-full bg-white/25 px-3 py-1 font-display text-sm font-bold backdrop-blur-sm">
            <span lang="gu">ગુજરાતી</span> · Gujarati
          </span>

          <span
            lang="gu"
            className={`relative pt-2 font-display leading-[1.15] font-bold drop-shadow-md ${gujaratiSize(item.gujarati_script)}`}
          >
            {item.gujarati_script}
          </span>

          <span className="relative rounded-2xl bg-white/25 px-5 py-2 text-2xl font-extrabold backdrop-blur-sm sm:text-3xl">
            “{item.phonetic_pronunciation}”
          </span>

          <span className="relative text-base font-semibold text-white/85">
            {item.english_word}
          </span>
        </span>
      </span>
    </button>
  );
}
