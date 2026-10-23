# Sikho Gujarati (શીખો ગુજરાતી)

A vibrant, family-friendly web application for learning Gujarati words and phrases. Designed for kids, beginners, and families, featuring interactive 3D flashcards, multiple-choice quizzes, and local progress tracking.

🌐 **Live Demo:** [https://dtrikam.github.io/sikho-gujarati/](https://dtrikam.github.io/sikho-gujarati/)

---

## ✨ Features

- **🏠 Home & Category Dashboard:**
  - 5 rich starter categories: Numbers 1–10, Family Members, Colours, Animals, and Everyday Phrases (50 words/phrases total).
  - Overall learning progress meter & per-topic progress indicators.
  - Friendly Gujarati typography using **Baloo Bhai 2** and **Nunito**.

- **🎴 Interactive Flashcards (Learning Mode):**
  - Smooth 3D card flip animation (with graceful cross-fade fallback for users with reduced motion preferences).
  - Front shows the English word and visual (emoji, icon, or colour swatch).
  - Back reveals the authentic Gujarati script and phonetic pronunciation.
  - Touch swipe support (left/right) and keyboard navigation (`←` / `→`).
  - "I know it!" and "Still learning" self-assessment tracking.

- **🧠 Multiple-Choice Quizzes (Quiz Mode):**
  - Fun quiz for each category with randomized distractors from the same topic.
  - Instant visual and screen-reader feedback, animated answer states, and celebratory star ratings.
  - Number key shortcuts (`1`–`4`) for desktop play.

- **💾 Local Progress Tracking:**
  - Progress is saved directly to the browser (`localStorage`) without requiring login or a database.
  - Supports multiple tabs and hydration-safe rendering via `useSyncExternalStore`.

- **🎨 Modern, Accessible Design:**
  - Built with Tailwind CSS v4 and soft, warm gradients.
  - Responsive across phones, tablets, and desktops.
  - High accessibility standards: full keyboard navigation, screen reader announcements, and semantic HTML.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node.js 20+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/dtrikam/sikho-gujarati.git
cd sikho-gujarati

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start learning!

### Building for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
sikho-gujarati/
├── src/
│   ├── app/
│   │   ├── category/
│   │   │   └── [categoryId]/
│   │   │       ├── page.tsx          # Flashcard deck route (SSG)
│   │   │       └── quiz/
│   │   │           └── page.tsx      # Multiple-choice quiz route (SSG)
│   │   ├── globals.css               # Tailwind CSS & 3D flip card animations
│   │   ├── layout.tsx                # App shell, fonts, & glassy navigation
│   │   ├── not-found.tsx             # Custom friendly 404 page
│   │   └── page.tsx                  # Home dashboard with category grid
│   ├── components/
│   │   ├── AppIcon.tsx               # Lucide icon resolver
│   │   ├── CategoryCard.tsx          # Card item with progress & quick links
│   │   ├── CategoryGrid.tsx          # Responsive grid layout
│   │   ├── CategoryHeader.tsx        # Topic navigation & Flashcards/Quiz tabs
│   │   ├── Flashcard.tsx             # 3D interactive flip card
│   │   ├── FlashcardDeck.tsx         # Deck viewer with swipe & self-assessment
│   │   ├── ItemVisual.tsx            # Dynamic visual renderer (emoji/color/icon)
│   │   ├── Navbar.tsx                # Top navigation header
│   │   ├── OverallProgress.tsx       # Overall words learned tracker
│   │   ├── ProgressBar.tsx           # Accessible progress bar
│   │   └── Quiz.tsx                  # Interactive quiz component
│   ├── data/
│   │   └── vocabulary.json           # JSON vocabulary data (easily extensible)
│   ├── hooks/
│   │   └── useProgress.ts            # Progress state hook
│   ├── lib/
│   │   ├── icons.ts                  # Lucide icon mapping
│   │   ├── progress-store.ts         # localStorage sync store
│   │   ├── quiz.ts                   # Pure quiz & distractor generator
│   │   ├── themes.ts                 # Category colour palettes
│   │   └── vocabulary.ts             # Data access layer & validation
│   └── types/
│       └── vocabulary.ts             # TypeScript definitions
├── package.json
└── tsconfig.json
```

---

## 📖 Adding New Words and Topics

All vocabulary is kept in [`src/data/vocabulary.json`](src/data/vocabulary.json). You can add new words or categories simply by editing this file — no TypeScript or React modifications needed!

Each category has the following structure:

```json
{
  "id": "animals",
  "title": "Animals",
  "title_gujarati": "પ્રાણીઓ",
  "description": "From cows to elephants",
  "icon_name": "PawPrint",
  "theme": "green",
  "items": [
    {
      "id": "ani-dog",
      "english_word": "Dog",
      "gujarati_script": "કૂતરો",
      "phonetic_pronunciation": "Koo-tro",
      "emoji": "🐶"
    }
  ]
}
```

Items can use an `emoji`, a `color_hex` (e.g. `"#EF4444"`), an `icon_name` (registered in `src/lib/icons.ts`), or an `image_url` (in the `/public` folder).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Cache Components)
- **UI & Logic:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Baloo Bhai 2](https://fonts.google.com/specimen/Baloo+Bhai+2) (Gujarati + Latin) & [Nunito](https://fonts.google.com/specimen/Nunito) via `next/font/google`
