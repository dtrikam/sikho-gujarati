"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  resetCategory,
  setLearned,
  subscribe,
} from "@/lib/progress-store";

/**
 * Read and update the "words learned" progress for the whole app.
 * Progress is stored locally on the device (no account needed).
 */
export function useProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const learnedCount = useCallback(
    (categoryId: string, validIds?: readonly string[]) => {
      const learned = progress[categoryId] ?? [];
      // Ignore stale ids for words that were removed from the JSON.
      return validIds
        ? learned.filter((id) => validIds.includes(id)).length
        : learned.length;
    },
    [progress],
  );

  const isLearned = useCallback(
    (categoryId: string, itemId: string) =>
      (progress[categoryId] ?? []).includes(itemId),
    [progress],
  );

  return {
    progress,
    learnedCount,
    isLearned,
    setLearned,
    resetCategory,
  };
}
