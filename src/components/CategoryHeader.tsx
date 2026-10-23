import Link from "next/link";
import { BookOpen, Brain, ChevronLeft } from "lucide-react";
import type { Category } from "@/types/vocabulary";
import { THEMES } from "@/lib/themes";
import { AppIcon } from "@/components/AppIcon";

interface CategoryHeaderProps {
  category: Category;
  mode: "learn" | "quiz";
}

/** Title block + Learn/Quiz switcher shown at the top of a category. */
export function CategoryHeader({ category, mode }: CategoryHeaderProps) {
  const t = THEMES[category.theme];

  const tabs = [
    { id: "learn", label: "Flashcards", href: `/category/${category.id}`, Icon: BookOpen },
    { id: "quiz", label: "Quiz", href: `/category/${category.id}/quiz`, Icon: Brain },
  ] as const;

  return (
    <header className="mx-auto mb-8 flex max-w-xl flex-col gap-5">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          id="back-to-topics"
          aria-label="Back to all topics"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:-translate-x-0.5 active:scale-90"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </Link>
        <span
          className={`grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg ${t.iconTile}`}
        >
          <AppIcon name={category.icon_name} className="size-7" strokeWidth={2.5} />
        </span>
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl leading-tight font-bold sm:text-3xl">
            {category.title}
          </h1>
          <p lang="gu" className={`font-display text-lg font-semibold ${t.text}`}>
            {category.title_gujarati}
          </p>
        </div>
      </div>

      <nav
        aria-label="Mode"
        className="grid grid-cols-2 gap-1 rounded-2xl bg-white/70 p-1 shadow-soft backdrop-blur"
      >
        {tabs.map(({ id, label, href, Icon }) => {
          const active = mode === id;
          return (
            <Link
              key={id}
              href={href}
              id={`tab-${id}`}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-bold transition ${
                active ? `text-white shadow-md ${t.button}` : "text-ink-soft hover:bg-white hover:text-ink"
              }`}
            >
              <Icon className="size-5" aria-hidden /> {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
