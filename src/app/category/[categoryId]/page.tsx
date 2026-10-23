import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryById } from "@/lib/vocabulary";
import { CategoryHeader } from "@/components/CategoryHeader";
import { FlashcardDeck } from "@/components/FlashcardDeck";

/** Pre-render one flashcard page per category at build time. */
export function generateStaticParams() {
  return getCategories().map((category) => ({ categoryId: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[categoryId]">): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) return { title: "Topic not found" };
  return {
    title: `${category.title} flashcards`,
    description: `Learn ${category.title.toLowerCase()} in Gujarati (${category.title_gujarati}) with interactive flashcards.`,
  };
}

export default async function CategoryLearnPage({
  params,
}: PageProps<"/category/[categoryId]">) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) notFound();

  return (
    <>
      <CategoryHeader category={category} mode="learn" />
      <FlashcardDeck category={category} />
    </>
  );
}
