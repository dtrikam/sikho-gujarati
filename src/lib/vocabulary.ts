import rawData from "@/data/vocabulary.json";
import type {
  Category,
  CategoryTheme,
  VocabularyData,
} from "@/types/vocabulary";

const VALID_THEMES: readonly CategoryTheme[] = [
  "blue",
  "green",
  "orange",
  "pink",
  "purple",
];

/**
 * Light runtime validation so typos in the JSON file produce a clear error
 * message instead of a confusing crash somewhere in the UI.
 */
function validate(data: VocabularyData): VocabularyData {
  const seenCategoryIds = new Set<string>();
  const seenItemIds = new Set<string>();

  for (const category of data.categories) {
    if (seenCategoryIds.has(category.id)) {
      throw new Error(`[vocabulary.json] Duplicate category id "${category.id}"`);
    }
    seenCategoryIds.add(category.id);

    if (!VALID_THEMES.includes(category.theme)) {
      throw new Error(
        `[vocabulary.json] Category "${category.id}" has invalid theme "${category.theme}". ` +
          `Use one of: ${VALID_THEMES.join(", ")}`,
      );
    }

    for (const item of category.items) {
      if (seenItemIds.has(item.id)) {
        throw new Error(`[vocabulary.json] Duplicate item id "${item.id}"`);
      }
      seenItemIds.add(item.id);

      for (const field of [
        "english_word",
        "gujarati_script",
        "phonetic_pronunciation",
      ] as const) {
        if (!item[field]?.trim()) {
          throw new Error(
            `[vocabulary.json] Item "${item.id}" is missing "${field}"`,
          );
        }
      }
    }
  }

  return data;
}

const vocabulary = validate(rawData as VocabularyData);

export function getCategories(): Category[] {
  return vocabulary.categories;
}

export function getCategoryById(id: string): Category | undefined {
  return vocabulary.categories.find((category) => category.id === id);
}

export function getTotalWordCount(): number {
  return vocabulary.categories.reduce((sum, c) => sum + c.items.length, 0);
}
