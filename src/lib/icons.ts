import {
  Check,
  Hand,
  HandHeart,
  Hash,
  Heart,
  MessageCircle,
  Moon,
  Palette,
  PawPrint,
  Smile,
  Sparkles,
  ThumbsUp,
  Users,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry of Lucide icons that can be referenced by name from the JSON data.
 *
 * Icons are imported individually (rather than the whole library) to keep the
 * bundle small. To use a new icon in vocabulary.json:
 *   1. Find it at https://lucide.dev/icons
 *   2. Import it above and add it to this map.
 */
const ICONS: Record<string, LucideIcon> = {
  Check,
  Hand,
  HandHeart,
  Hash,
  Heart,
  MessageCircle,
  Moon,
  Palette,
  PawPrint,
  Smile,
  Sparkles,
  ThumbsUp,
  Users,
  Utensils,
  X,
};

export function getIcon(name: string | undefined): LucideIcon {
  if (name && name in ICONS) return ICONS[name];
  if (name && process.env.NODE_ENV !== "production") {
    console.warn(`[icons] Unknown icon "${name}" — add it to src/lib/icons.ts`);
  }
  return Sparkles;
}
