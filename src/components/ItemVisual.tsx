import Image from "next/image";
import type { VocabularyItem } from "@/types/vocabulary";
import { AppIcon } from "@/components/AppIcon";

type VisualSize = "md" | "lg";

const SIZES: Record<
  VisualSize,
  { emoji: string; box: string; icon: string; px: number }
> = {
  md: { emoji: "text-6xl", box: "size-20", icon: "size-10", px: 80 },
  lg: { emoji: "text-7xl sm:text-8xl", box: "size-28 sm:size-32", icon: "size-14 sm:size-16", px: 128 },
};

interface ItemVisualProps {
  item: VocabularyItem;
  size?: VisualSize;
  /** Tailwind classes for the icon tile (used when rendering a Lucide icon). */
  iconTileClassName?: string;
}

/**
 * Picks the best available visual for a vocabulary item.
 * Priority: image_url → emoji → color_hex → icon_name → first letter.
 * Purely decorative (the English word is always shown next to it).
 */
export function ItemVisual({
  item,
  size = "lg",
  iconTileClassName = "bg-sky-100 text-sky-600",
}: ItemVisualProps) {
  const s = SIZES[size];

  if (item.image_url) {
    return (
      <Image
        src={item.image_url}
        alt=""
        width={s.px}
        height={s.px}
        unoptimized
        className={`${s.box} object-contain`}
      />
    );
  }

  if (item.emoji) {
    return (
      <span aria-hidden className={`${s.emoji} leading-none drop-shadow-sm`}>
        {item.emoji}
      </span>
    );
  }

  if (item.color_hex) {
    return (
      <span
        aria-hidden
        className={`${s.box} rounded-full border-[6px] border-white shadow-lift ring-1 ring-slate-900/10`}
        style={{ backgroundColor: item.color_hex }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${s.box} grid place-items-center rounded-3xl ${iconTileClassName}`}
    >
      {item.icon_name ? (
        <AppIcon name={item.icon_name} className={s.icon} strokeWidth={2.25} />
      ) : (
        <span className="font-display text-5xl font-bold">
          {item.english_word.charAt(0)}
        </span>
      )}
    </span>
  );
}
