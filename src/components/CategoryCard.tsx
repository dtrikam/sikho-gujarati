"use client";

import Link from "next/link";
import { ArrowRight, Brain, Star } from "lucide-react";
import type { Category } from "@/types/vocabulary";
import { THEMES } from "@/lib/themes";
import { useProgress } from "@/hooks/useProgress";
import { AppIcon } from "@/components/AppIcon";
import { ProgressBar } from "@/components/ProgressBar";

interface CategoryCardProps {
  category: Category;
  /** Position in the grid — used to stagger the entrance animation. */
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const t = THEMES[category.theme];
  const { learnedCount } = useProgress();

  const total = category.items.length;
  const learned = learnedCount(
    category.id,
    category.items.map((i) => i.id),
  );
  const isComplete = total > 0 && learned === total;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className={`group animate-pop-in motion-gentle relative flex flex-col rounded-4xl border-2 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6 ${t.card}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid size-16 place-items-center rounded-3xl text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${t.iconTile}`}
        >
          <AppIcon name={category.icon_name} className="size-8" strokeWidth={2.5} />
        </span>
        {isComplete && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-extrabold text-amber-700">
            <Star className="size-4 fill-current" aria-hidden /> All learned!
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl leading-tight font-bold">
        {/* Stretched link: the whole card opens the flashcards */}
        <Link
          href={`/category/${category.id}`}
          id={`category-${category.id}`}
          className="after:absolute after:inset-0 after:rounded-4xl focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-sky-400"
        >
          {category.title}
        </Link>
      </h3>
      <p lang="gu" className={`font-display text-lg font-semibold ${t.text}`}>
        {category.title_gujarati}
      </p>
      <p className="mt-1 text-ink-soft">{category.description}</p>

      <ProgressBar
        value={learned}
        max={total}
        label={`${learned}/${total} words learned`}
        barClassName={t.bar}
        trackClassName="bg-white"
        className="mt-5"
      />

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          aria-hidden
          className={`inline-flex items-center gap-1.5 font-bold ${t.text}`}
        >
          Learn
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </span>
        {/* z-10 lifts the quiz link above the stretched link */}
        <Link
          href={`/category/${category.id}/quiz`}
          id={`category-${category.id}-quiz`}
          className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-bold text-ink shadow-soft transition hover:shadow-lift active:scale-95"
        >
          <Brain className="size-5" aria-hidden /> Quiz
        </Link>
      </div>
    </article>
  );
}
