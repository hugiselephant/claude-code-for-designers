export interface LessonMeta {
  slug: string;
  title: string;
  module: number;
  order: number;
  description: string;
}

export const lessons: LessonMeta[] = [
  {
    slug: "01-what-is-claude-code",
    title: "What is Claude Code and why it changes everything",
    module: 1,
    order: 1,
    description:
      "An introduction to Claude Code and what it means for designers who want to build real products.",
  },
  {
    slug: "02-setting-up-your-environment",
    title: "Setting up your dev environment",
    module: 1,
    order: 2,
    description:
      "Install Terminal, VS Code, and Claude Code — everything you need to start building.",
  },
  {
    slug: "03-your-first-conversation",
    title: "Your first conversation with Claude Code",
    module: 1,
    order: 3,
    description:
      "Learn to talk to Claude Code effectively and build something in your first session.",
  },
  {
    slug: "04-how-ai-reads-code",
    title: "Understanding how AI reads and writes code",
    module: 1,
    order: 4,
    description:
      "A designer-friendly explanation of what happens when Claude Code generates code for you.",
  },
];

export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getModuleLessons(moduleNumber: number): LessonMeta[] {
  return lessons
    .filter((l) => l.module === moduleNumber)
    .sort((a, b) => a.order - b.order);
}

export function getAdjacentLessons(slug: string) {
  const idx = lessons.findIndex((l) => l.slug === slug);
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}
