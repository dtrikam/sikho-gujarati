import type { Category } from "@/types/vocabulary";
import { CategoryCard } from "@/components/CategoryCard";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        // `grid` makes each card stretch to equal row height
        <li key={category.id} className="grid">
          <CategoryCard category={category} index={index} />
        </li>
      ))}
    </ul>
  );
}
