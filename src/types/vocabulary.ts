/**
 * Shape of the vocabulary data stored in `src/data/vocabulary.json`.
 *
 * To add words, edit the JSON file only — no code changes are needed.
 * Each item can optionally provide ONE visual. If several are given, the
 * priority is: image_url → emoji → color_hex → icon_name.
 */

export type CategoryTheme = "blue" | "green" | "orange" | "pink" | "purple";

export interface VocabularyItem {
  /** Unique id across ALL categories, e.g. "num-1" or "fam-mother". */
  id: string;
  english_word: string;
  gujarati_script: string;
  phonetic_pronunciation: string;
  /** Path under /public (e.g. "/images/cow.png") or an absolute URL. */
  image_url?: string;
  /** Name of a Lucide icon registered in `src/lib/icons.ts`. */
  icon_name?: string;
  /** A single emoji — great for kids (animals, people, numbers). */
  emoji?: string;
  /** Hex colour, used to render a swatch (ideal for the Colours category). */
  color_hex?: string;
}

export interface Category {
  /** URL-safe slug — becomes the route `/category/<id>`. */
  id: string;
  title: string;
  title_gujarati: string;
  description: string;
  /** Name of a Lucide icon registered in `src/lib/icons.ts`. */
  icon_name: string;
  theme: CategoryTheme;
  items: VocabularyItem[];
}

export interface VocabularyData {
  categories: Category[];
}
