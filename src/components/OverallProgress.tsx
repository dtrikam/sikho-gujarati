"use client";

import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ProgressBar";

interface OverallProgressProps {
  /** Minimal shape so we don't ship every word to this component. */
  categories: { id: string; itemIds: string[] }[];
}

export function OverallProgress({ categories }: OverallProgressProps) {
  const { learnedCount } = useProgress();

  const total = categories.reduce((sum, c) => sum + c.itemIds.length, 0);
  const learned = categories.reduce(
    (sum, c) => sum + learnedCount(c.id, c.itemIds),
    0,
  );

  return (
    <div className="max-w-md rounded-3xl bg-white/20 p-4 backdrop-blur-sm">
      <ProgressBar
        value={learned}
        max={total}
        label={`You've learned ${learned} of ${total} words`}
        barClassName="bg-white"
        trackClassName="bg-white/25"
      />
    </div>
  );
}
