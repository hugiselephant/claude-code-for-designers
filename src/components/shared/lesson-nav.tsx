import Link from "next/link";
import type { LessonMeta } from "@/content/lessons";

interface LessonNavProps {
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav className="border-border/30 mt-12 flex items-center justify-between border-t pt-6">
      {prev ? (
        <Link
          href={`/course/${prev.slug}`}
          className="text-text-muted hover:text-text group flex flex-col text-sm"
        >
          <span className="text-xs uppercase tracking-wide opacity-60">
            Previous
          </span>
          <span className="group-hover:underline">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/course/${next.slug}`}
          className="text-text-muted hover:text-text group flex flex-col text-right text-sm"
        >
          <span className="text-xs uppercase tracking-wide opacity-60">
            Next
          </span>
          <span className="group-hover:underline">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
