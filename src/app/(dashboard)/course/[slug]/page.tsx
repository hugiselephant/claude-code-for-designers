import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getLessonBySlug, getAdjacentLessons } from "@/content/lessons";
import { LessonNav } from "@/components/shared/lesson-nav";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(slug);

  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/lessons/${slug}.mdx`);
    Content = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-4 text-sm font-medium text-primary-500">
        Module {lesson.module} &middot; Lesson {lesson.order}
      </div>
      <article className="prose-custom">
        <Content />
      </article>
      <LessonNav prev={prev} next={next} />
    </div>
  );
}
