import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { Footer } from "@/components/landing/footer";
import { ThemeToggle } from "@/components/landing/theme-toggle";

const curriculum = [
  {
    module: "Module 1: Getting Started",
    lessons: [
      "What is Claude Code and why it changes everything for designers",
      "Setting up your dev environment (Terminal, VS Code, Claude Code)",
      "Your first conversation with Claude Code",
      "Understanding how AI reads and writes code",
    ],
  },
  {
    module: "Module 2: The Developer Mindset",
    lessons: [
      "How developers think (and how designers can too)",
      "Working with programmers: translating design into specs",
      "Files, folders, and project structure",
      "The command line: your new best friend",
    ],
  },
  {
    module: "Module 3: Git & Version Control",
    lessons: [
      "What is git and why do I need it?",
      "Commits, branches, and pull requests explained visually",
      "GitHub: your project's home base",
      "Collaborating with Claude Code through git",
    ],
  },
  {
    module: "Module 4: Building Your First App",
    lessons: [
      "Choosing a project (from idea to plan)",
      "React & Next.js: the building blocks",
      "Designing in code with Tailwind CSS",
      "Components, pages, and routing",
    ],
  },
  {
    module: "Module 5: From Local to Live",
    lessons: [
      "Docker: packaging your app for the real world",
      "Databases: storing and retrieving data",
      "Deploying to a live server",
      "DNS, domains, and making it real",
    ],
  },
  {
    module: "Module 6: Ship Your Project",
    lessons: [
      "Final project planning and review",
      "Building and iterating with Claude Code",
      "Launch day: deploying your project",
      "What to learn next: your roadmap forward",
    ],
  },
];

export default function CoursePage() {
  return (
    <div className="bg-canvas-bg text-text relative min-h-screen">
      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <nav className="border-border/20 safe-top bg-glass sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between pt-5 pr-4 pb-4 pl-4 sm:pr-4 sm:pl-6">
          <Link href="/" className="flex min-w-0 items-center gap-0.5">
            <Logo size={28} />
            <span className="font-heading text-xl tracking-tight whitespace-nowrap">
              <span className="font-extralight">Neural Garden</span>{" "}
              <span className="font-semibold">Academy</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="cta-brand inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Join Next Cohort
          </Link>
        </div>
      </nav>

      {/* ── Course Header ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="font-heading mb-4 text-4xl font-extralight tracking-tight sm:text-5xl">
          Claude Code for Designers
        </h1>
        <p className="text-text-muted/75 mx-auto max-w-2xl text-lg leading-relaxed">
          A 6-week cohort-based course that takes you from &quot;I have an
          idea&quot; to &quot;I shipped a real product.&quot; Using Claude Code
          as your AI development partner.
        </p>
      </section>

      {/* ── Curriculum ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-8">
          {curriculum.map((mod, i) => (
            <div
              key={i}
              className="border-border/30 rounded-xl border bg-white p-6 dark:bg-neutral-900"
            >
              <h3 className="font-heading mb-4 text-lg font-medium">
                {mod.module}
              </h3>
              <ul className="space-y-2">
                {mod.lessons.map((lesson, j) => (
                  <li
                    key={j}
                    className="text-text-muted/75 flex items-start gap-2 text-sm"
                  >
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/login"
            className="cta-brand inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            Join the next cohort
          </Link>
        </div>
      </section>

      <Footer />

      <div className="fixed right-4 bottom-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
