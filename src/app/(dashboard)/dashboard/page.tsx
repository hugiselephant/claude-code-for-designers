import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { getDb, hasDatabase } from "@/lib/db/server";
import { enrollments, cohorts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getModuleLessons } from "@/content/lessons";
import { BookOpen, ExternalLink, MessageSquare } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  let cohort = null;

  if (hasDatabase()) {
    const db = getDb();
    const result = await db
      .select({
        enrollment: enrollments,
        cohort: cohorts,
      })
      .from(enrollments)
      .innerJoin(cohorts, eq(enrollments.cohortId, cohorts.id))
      .where(
        and(
          eq(enrollments.userId, session.user.id),
          eq(enrollments.status, "active"),
        ),
      )
      .limit(1);

    if (result[0]) {
      cohort = result[0].cohort;
    }
  }

  const modules = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-3xl font-medium tracking-tight">
          Welcome back, {session.user.name?.split(" ")[0] ?? "designer"}
        </h1>
        <p className="text-text-muted">
          {cohort
            ? `You're enrolled in ${cohort.name}`
            : "Your learning journey starts here."}
        </p>
      </div>

      {/* Quick links */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-border/30 hover:border-border/60 flex items-center gap-3 rounded-xl border p-4 transition-colors"
        >
          <MessageSquare className="h-5 w-5 text-indigo-500" />
          <div>
            <div className="text-sm font-medium">Discord Community</div>
            <div className="text-text-muted text-xs">Chat with your cohort</div>
          </div>
          <ExternalLink className="text-text-muted ml-auto h-3.5 w-3.5" />
        </a>
        <a
          href="https://youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-border/30 hover:border-border/60 flex items-center gap-3 rounded-xl border p-4 transition-colors"
        >
          <BookOpen className="h-5 w-5 text-red-500" />
          <div>
            <div className="text-sm font-medium">Video Lessons</div>
            <div className="text-text-muted text-xs">Watch on YouTube</div>
          </div>
          <ExternalLink className="text-text-muted ml-auto h-3.5 w-3.5" />
        </a>
        <Link
          href="/course/01-what-is-claude-code"
          className="border-border/30 hover:border-border/60 flex items-center gap-3 rounded-xl border p-4 transition-colors"
        >
          <BookOpen className="h-5 w-5 text-primary-500" />
          <div>
            <div className="text-sm font-medium">Course Content</div>
            <div className="text-text-muted text-xs">Read the lessons</div>
          </div>
        </Link>
      </div>

      {/* Curriculum */}
      <h2 className="font-heading mb-4 text-xl font-medium">Curriculum</h2>
      <div className="space-y-4">
        {modules.map((mod) => {
          const moduleLessons = getModuleLessons(mod);
          const moduleNames = [
            "",
            "Getting Started",
            "The Developer Mindset",
            "Git & Version Control",
            "Building Your First App",
            "From Local to Live",
            "Ship Your Project",
          ];
          return (
            <div
              key={mod}
              className="border-border/30 rounded-xl border bg-white p-5 dark:bg-neutral-900"
            >
              <h3 className="font-heading mb-3 text-sm font-medium uppercase tracking-wide opacity-60">
                Module {mod}: {moduleNames[mod]}
              </h3>
              {moduleLessons.length > 0 ? (
                <ul className="space-y-2">
                  {moduleLessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/course/${lesson.slug}`}
                        className="text-text-muted hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 text-sm transition-colors"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-muted/50 text-sm italic">
                  Content coming soon
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
