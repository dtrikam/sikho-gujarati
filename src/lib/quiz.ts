import type { VocabularyItem } from "@/types/vocabulary";

export interface QuizQuestion {
  /** The item being asked about (the correct answer). */
  answer: VocabularyItem;
  /** Shuffled answer options, including the correct one. */
  options: VocabularyItem[];
}

/** Fisher–Yates shuffle. Returns a new array; does not mutate the input. */
export function shuffle<T>(input: readonly T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Build a multiple-choice quiz from a list of items.
 * Distractors are drawn from the same category so options feel related.
 */
export function buildQuiz(
  items: readonly VocabularyItem[],
  optionCount = 4,
): QuizQuestion[] {
  const count = Math.min(optionCount, items.length);

  return shuffle(items).map((answer) => {
    const distractors = shuffle(
      items.filter(
        (item) =>
          item.id !== answer.id &&
          item.phonetic_pronunciation !== answer.phonetic_pronunciation,
      ),
    ).slice(0, count - 1);

    return { answer, options: shuffle([answer, ...distractors]) };
  });
}
