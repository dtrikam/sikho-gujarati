"use client";

import Link from "next/link";
import {
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  House,
  Play,
  Repeat,
  Star,
  Trophy,
  X,
} from "lucide-react";
import type { Category, VocabularyItem } from "@/types/vocabulary";
import { THEMES } from "@/lib/themes";
import { buildQuiz, type QuizQuestion } from "@/lib/quiz";
import { useProgress } from "@/hooks/useProgress";
import { ItemVisual } from "@/components/ItemVisual";
import { ProgressBar } from "@/components/ProgressBar";

interface QuizProps {
  category: Category;
}

export function Quiz({ category }: QuizProps) {
  const t = THEMES[category.theme];
  const { setLearned } = useProgress();

  // Questions are generated on "Start" (client-side) so the random order
  // never causes a server/client hydration mismatch.
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const start = () => {
    setQuestions(buildQuiz(category.items));
    setCurrent(0);
    setSelectedId(null);
    setScore(0);
    setFinished(false);
  };

  const question = questions?.[current];
  const hasAnswered = selectedId !== null;
  const isCorrect = hasAnswered && selectedId === question?.answer.id;

  const choose = (option: VocabularyItem) => {
    if (!question || hasAnswered) return;
    setSelectedId(option.id);
    if (option.id === question.answer.id) {
      setScore((s) => s + 1);
      setLearned(category.id, question.answer.id, true);
    }
  };

  const next = () => {
    if (!questions) return;
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelectedId(null);
    }
  };

  // Number keys 1–4 pick an answer.
  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!question || finished || hasAnswered) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= question.options.length) {
      choose(question.options[n - 1]);
    }
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKeyDown(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (category.items.length < 2) {
    return (
      <Panel>
        <p className="text-lg">
          This topic needs at least 2 words before a quiz can be made.
        </p>
      </Panel>
    );
  }

  /* ---------------- Intro ---------------- */
  if (!questions) {
    return (
      <Panel>
        <span
          className={`mx-auto grid size-20 place-items-center rounded-full text-white shadow-lg ${t.iconTile}`}
        >
          <Brain className="size-10" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold">
          Ready for a quiz?
        </h2>
        <p className="mt-2 text-lg text-ink-soft">
          {category.items.length} questions. Pick how each word sounds in
          Gujarati!
        </p>
        <button
          type="button"
          id="quiz-start"
          onClick={start}
          className={`mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-8 text-lg font-bold text-white shadow-lg transition active:scale-95 ${t.button}`}
        >
          <Play className="size-5 fill-current" aria-hidden /> Start quiz
        </button>
      </Panel>
    );
  }

  /* ---------------- Results ---------------- */
  if (finished || !question) {
    const total = questions.length;
    const ratio = score / total;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
    const message =
      ratio === 1
        ? "Perfect score! You're a star!"
        : ratio >= 0.6
          ? "Great work — keep it up!"
          : "Good try! Practise the flashcards and try again.";

    return (
      <Panel>
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-amber-300 to-orange-500 text-white shadow-lg shadow-orange-500/30">
          <Trophy className="size-10" aria-hidden />
        </span>
        <div
          className="mt-5 flex justify-center gap-2"
          role="img"
          aria-label={`${stars} out of 3 stars`}
        >
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              aria-hidden
              style={{ animationDelay: `${n * 120}ms` }}
              className={`animate-pop-in motion-gentle size-10 ${
                n <= stars
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold">
          You scored {score} / {total}
        </h2>
        <p className="mt-2 text-lg text-ink-soft">{message}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            id="quiz-play-again"
            onClick={start}
            className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-4 font-bold text-white shadow-lg transition active:scale-95 ${t.button}`}
          >
            <Repeat className="size-5" aria-hidden /> Play again
          </button>
          <Link
            href={`/category/${category.id}`}
            id="quiz-to-flashcards"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 font-bold transition hover:border-slate-300 active:scale-95"
          >
            <BookOpen className="size-5" aria-hidden /> Flashcards
          </Link>
          <Link
            href="/"
            id="quiz-to-home"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 font-bold transition hover:border-slate-300 active:scale-95"
          >
            <House className="size-5" aria-hidden /> All topics
          </Link>
        </div>
      </Panel>
    );
  }

  /* ---------------- Question ---------------- */
  const { answer, options } = question;

  return (
    <section aria-label="Quiz" className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold">
        <span className="text-ink-soft tabular-nums">
          Question {current + 1} of {questions.length}
        </span>
        <span className={`rounded-full px-3 py-1 tabular-nums ${t.chip}`}>
          ⭐ Score: {score}
        </span>
      </div>
      <ProgressBar
        value={current + (hasAnswered ? 1 : 0)}
        max={questions.length}
        label="Quiz progress"
        showLabel={false}
        barClassName={t.bar}
        trackClassName="bg-white/80"
        className="mb-6"
      />

      <div
        key={answer.id}
        className="animate-slide-in-right motion-gentle flex flex-col items-center gap-4 rounded-4xl border-2 border-white bg-white/90 p-6 text-center shadow-lift sm:p-8"
      >
        <ItemVisual item={answer} size="md" iconTileClassName={t.chip} />
        <p className="text-ink-soft">How do you say…</p>
        <h2 className="font-display text-3xl leading-tight font-bold sm:text-4xl">
          {answer.english_word}
        </h2>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option, i) => {
          const isAnswer = option.id === answer.id;
          const isSelected = option.id === selectedId;

          let state =
            "border-white bg-white hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lift";
          if (hasAnswered) {
            if (isAnswer)
              state = "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30";
            else if (isSelected)
              state = "animate-shake motion-gentle border-rose-500 bg-rose-500 text-white";
            else state = "border-white bg-white opacity-50";
          }

          return (
            <li key={option.id}>
              <button
                type="button"
                id={`quiz-option-${i + 1}`}
                onClick={() => choose(option)}
                disabled={hasAnswered}
                aria-describedby={hasAnswered ? "quiz-feedback" : undefined}
                className={`relative flex min-h-20 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left shadow-soft transition duration-200 disabled:cursor-default ${state}`}
              >
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${
                    hasAnswered && (isAnswer || isSelected)
                      ? "bg-white/25"
                      : t.chip
                  }`}
                >
                  {hasAnswered && isAnswer ? (
                    <Check className="size-5" strokeWidth={3} />
                  ) : hasAnswered && isSelected ? (
                    <X className="size-5" strokeWidth={3} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="text-xl font-extrabold">
                    {option.phonetic_pronunciation}
                  </span>
                  {hasAnswered && (
                    <span lang="gu" className="font-display text-lg opacity-90">
                      {option.gujarati_script}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Feedback */}
      <div aria-live="polite" id="quiz-feedback">
        {hasAnswered && (
          <div
            className={`animate-pop-in motion-gentle mt-5 flex flex-col items-center gap-4 rounded-3xl p-5 text-center sm:flex-row sm:justify-between sm:text-left ${
              isCorrect
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            <p className="text-lg font-bold">
              {isCorrect ? (
                <>
                  <span lang="gu">શાબાશ!</span> Well done! 🎉
                </>
              ) : (
                <>
                  Oops! It&apos;s “{answer.phonetic_pronunciation}”{" "}
                  <span lang="gu" className="font-display">
                    ({answer.gujarati_script})
                  </span>
                </>
              )}
            </p>
            <button
              type="button"
              id="quiz-next"
              onClick={next}
              autoFocus
              className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-2xl px-5 font-bold text-white shadow-lg transition active:scale-95 ${t.button}`}
            >
              {current + 1 >= questions.length ? "See my score" : "Next"}
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="animate-pop-in motion-gentle mx-auto max-w-xl rounded-4xl border-2 border-white bg-white/90 p-8 text-center shadow-lift sm:p-10">
      {children}
    </div>
  );
}
