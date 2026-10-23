import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryById } from "@/lib/vocabulary";
import { CategoryHeader } from "@/components/CategoryHeader";
import { Quiz } from "@/components/Quiz";

export function generateStaticParams() {
  return getCategories().map((category) => ({ categoryId: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[categoryId]/quiz">): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) return { title: "Topic not found" };
  return {
    title: `${category.title} quiz`,
    description: `Test your Gujarati ${category.title.toLowerCase()} with a fun multiple-choice quiz.`,
  };
}

export default async function CategoryQuizPage({
  params,
}: PageProps<"/category/[categoryId]/quiz">) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);
  if (!category) notFound();

  return (
    <>
      <CategoryHeader category={category} mode="quiz" />
      <Quiz category={category} />
    </>
  );
}
