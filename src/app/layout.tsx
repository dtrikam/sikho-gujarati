import type { Metadata, Viewport } from "next";
import { Baloo_Bhai_2, Nunito } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const baloo = Baloo_Bhai_2({
  variable: "--font-baloo",
  subsets: ["latin", "gujarati"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Sikho Gujarati – Learn Gujarati the fun way",
    template: "%s · Sikho Gujarati",
  },
  description:
    "A colourful, family-friendly app for learning Gujarati words and phrases with flashcards and quizzes.",
};

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
          {children}
        </main>
        <footer className="pb-8 text-center text-sm text-ink-soft">
          Made with <span aria-label="love">❤️</span> for the family ·{" "}
          <span className="font-display" lang="gu">
            શીખો ગુજરાતી
          </span>
        </footer>
      </body>
    </html>
  );
}
