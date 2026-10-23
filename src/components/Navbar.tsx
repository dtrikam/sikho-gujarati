import Link from "next/link";
import { House } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/70 backdrop-blur-lg">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          id="nav-logo"
          className="group flex items-center gap-3 rounded-2xl"
        >
          <span
            aria-hidden
            lang="gu"
            className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-orange-400 via-pink-500 to-violet-500 pt-1 font-display text-2xl font-bold text-white shadow-lg shadow-pink-500/30 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
          >
            ગ
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Sikho Gujarati
            </span>
            <span
              lang="gu"
              className="block font-display text-sm font-medium text-ink-soft"
            >
              શીખો ગુજરાતી
            </span>
          </span>
        </Link>

        <Link
          href="/"
          id="nav-home"
          aria-label="Home"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sky-500 px-4 font-bold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95"
        >
          <House className="size-5" aria-hidden />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </nav>
    </header>
  );
}
