import Link from "next/link";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="animate-pop-in motion-gentle mx-auto mt-10 max-w-md rounded-4xl border-2 border-white bg-white/90 p-10 text-center shadow-lift">
      <p aria-hidden className="text-7xl">
        🙈
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold">
        Oops! Page not found
      </h1>
      <p className="mt-2 text-ink-soft">
        We couldn&apos;t find that topic. Let&apos;s head back and pick another
        one.
      </p>
      <Link
        href="/"
        id="not-found-home"
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-sky-500 px-6 font-bold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95"
      >
        <House className="size-5" aria-hidden /> Back home
      </Link>
    </div>
  );
}
