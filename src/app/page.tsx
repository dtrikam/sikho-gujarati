import { getCategories, getTotalWordCount } from "@/lib/vocabulary";
import { CategoryGrid } from "@/components/CategoryGrid";
import { OverallProgress } from "@/components/OverallProgress";

const FLOATING_LETTERS = [
  { char: "ક", className: "top-4 right-[8%] text-7xl sm:text-8xl", delay: "0s" },
  { char: "ગ", className: "bottom-6 right-[28%] text-6xl sm:text-7xl", delay: "1.5s" },
  { char: "અ", className: "top-[40%] right-[2%] text-5xl sm:text-6xl", delay: "3s" },
];

export default function HomePage() {
  const categories = getCategories();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-br from-sky-400 via-blue-500 to-violet-500 p-6 text-white shadow-lift sm:p-10">
        {FLOATING_LETTERS.map(({ char, className, delay }) => (
          <span
            key={char}
            aria-hidden
            lang="gu"
            style={{ animationDelay: delay }}
            className={`animate-float motion-gentle pointer-events-none absolute hidden font-display font-bold text-white/20 select-none sm:block ${className}`}
          >
            {char}
          </span>
        ))}
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <p className="font-display text-xl font-semibold text-white/90">
            <span lang="gu">કેમ છો!</span> Kem chho! 👋
          </p>
          <h1 className="mt-2 max-w-xl font-display text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
            Let&apos;s learn Gujarati together!
          </h1>
          <p className="mt-3 max-w-lg text-lg text-white/90">
            Pick a topic, flip the cards, then test yourself with a quiz.{" "}
            {getTotalWordCount()} words to discover.
          </p>
          <div className="mt-6">
            <OverallProgress
              categories={categories.map((c) => ({
                id: c.id,
                itemIds: c.items.map((i) => i.id),
              }))}
            />
          </div>
        </div>
      </section>

      {/* ---------- Topics ---------- */}
      <section aria-labelledby="topics-heading" className="mt-10">
        <h2
          id="topics-heading"
          className="mb-5 font-display text-2xl font-bold sm:text-3xl"
        >
          Choose a topic
        </h2>
        <CategoryGrid categories={categories} />
      </section>
    </>
  );
}
