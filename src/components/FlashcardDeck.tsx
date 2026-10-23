"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Repeat,
  RotateCcw,
} from "lucide-react";
import type { Category } from "@/types/vocabulary";
import { THEMES } from "@/lib/themes";
import { useProgress } from "@/hooks/useProgress";
import { Flashcard } from "@/components/Flashcard";
import { ProgressBar } from "@/components/ProgressBar";

const SWIPE_THRESHOLD_PX = 50;

interface FlashcardDeckProps {
  category: Category;
}

export function FlashcardDeck({ category }: FlashcardDeckProps) {
  const { items } = category;
  const t = THEMES[category.theme];
  const { isLearned, setLearned, learnedCount, resetCategory } = useProgress();

  // index === items.length means "finished the deck"
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const isDone = index >= items.length;
  const item = items[Math.min(index, items.length - 1)];
  const learned = learnedCount(
    category.id,
    items.map((i) => i.id),
  );

  const go = useCallback(
    (delta: 1 | -1) => {
      setIsFlipped(false);
      setDirection(delta > 0 ? "next" : "prev");
      setIndex((i) => Math.max(0, Math.min(items.length, i + delta)));
    },
    [items.length],
  );

  const restart = () => {
    setIsFlipped(false);
    setDirection("next");
    setIndex(0);
  };

  const answer = (known: boolean) => {
    setLearned(category.id, item.id, known);
    go(1);
  };

  // ← / → keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  // Swipe left/right on touch screens (and mouse drag on desktop)
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const onPointerDown = (e: PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    didSwipe.current = false;
  };

  const onPointerUp = (e: PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const handleFlip = () => {
    // A swipe also fires a click — don't flip in that case.
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    setIsFlipped((f) => !f);
  };

  return (
    <section aria-label="Flashcards" className="mx-auto max-w-xl">
      {/* Status row */}
      <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold">
        <span className="text-ink-soft tabular-nums">
          {isDone ? "All done!" : `Card ${index + 1} of ${items.length}`}
        </span>
        <span className={`rounded-full px-3 py-1 tabular-nums ${t.chip}`}>
          ⭐ {learned}/{items.length} learned
        </span>
      </div>
      <ProgressBar
        value={Math.min(index, items.length)}
        max={items.length}
        label="Deck position"
        showLabel={false}
        barClassName={t.bar}
        trackClassName="bg-white/80"
        className="mb-6"
      />

      {isDone ? (
        <div className="animate-pop-in motion-gentle rounded-4xl border-2 border-white bg-white/90 p-8 text-center shadow-lift sm:p-10">
          <span
            className={`mx-auto grid size-20 place-items-center rounded-full text-white shadow-lg ${t.iconTile}`}
          >
            <PartyPopper className="size-10" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold">
            <span lang="gu">શાબાશ!</span> Great job!
          </h2>
          <p className="mt-2 text-lg text-ink-soft">
            You went through all {items.length} cards and know{" "}
            <strong className={t.text}>{learned}</strong> of them.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              id="deck-restart"
              onClick={restart}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-5 font-bold transition hover:border-slate-300 active:scale-95"
            >
              <Repeat className="size-5" aria-hidden /> Go again
            </button>
            <Link
              href={`/category/${category.id}/quiz`}
              id="deck-to-quiz"
              className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 font-bold text-white shadow-lg transition active:scale-95 ${t.button}`}
            >
              <Brain className="size-5" aria-hidden /> Take the quiz
            </Link>
          </div>

          {learned > 0 && (
            <button
              type="button"
              id="deck-reset-progress"
              onClick={() => resetCategory(category.id)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft underline-offset-4 hover:underline"
            >
              <RotateCcw className="size-4" aria-hidden /> Reset progress for
              this topic
            </button>
          )}
        </div>
      ) : (
        <>
          <div
            key={item.id}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
            className={`motion-gentle ${direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left"}`}
          >
            <Flashcard
              item={item}
              theme={category.theme}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              isLearned={isLearned(category.id, item.id)}
            />
          </div>

          {/* Screen-reader announcement when the card flips */}
          <p className="sr-only" aria-live="polite">
            {isFlipped
              ? `${item.gujarati_script}, pronounced ${item.phonetic_pronunciation}`
              : ""}
          </p>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              id="deck-prev"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous card"
              className="grid size-14 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-x-0.5 active:scale-90 disabled:opacity-40 disabled:hover:translate-x-0"
            >
              <ChevronLeft className="size-7" aria-hidden />
            </button>
            <p className="text-center text-sm font-semibold text-ink-soft">
              Tap to flip · Swipe or use ← → to move
            </p>
            <button
              type="button"
              id="deck-next"
              onClick={() => go(1)}
              aria-label="Next card"
              className="grid size-14 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:translate-x-0.5 active:scale-90"
            >
              <ChevronRight className="size-7" aria-hidden />
            </button>
          </div>

          {/* Self-assessment */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              id="deck-still-learning"
              onClick={() => answer(false)}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 font-bold text-ink transition hover:border-slate-300 active:scale-95"
            >
              <Repeat className="size-5" aria-hidden /> Still learning
            </button>
            <button
              type="button"
              id="deck-know-it"
              onClick={() => answer(true)}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 active:scale-95"
            >
              <Check className="size-5" strokeWidth={3} aria-hidden /> I know it!
            </button>
          </div>
        </>
      )}
    </section>
  );
}
