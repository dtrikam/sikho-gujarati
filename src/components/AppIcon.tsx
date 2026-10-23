import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { getIcon } from "@/lib/icons";

interface AppIconProps extends LucideProps {
  /** Name of an icon registered in `src/lib/icons.ts`. */
  name: string | undefined;
}

/** Renders a Lucide icon looked up by name (e.g. from the JSON data). */
export function AppIcon({ name, ...props }: AppIconProps) {
  return createElement(getIcon(name), { "aria-hidden": true, ...props });
}
