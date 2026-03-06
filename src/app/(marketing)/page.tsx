import Link from "next/link";
import {
  Code2,
  Palette,
  Rocket,
  Users,
  Terminal,
  GitBranch,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SpotlightCard } from "@/components/landing/spotlight-card";
import { EmailCapture } from "@/components/landing/email-capture";
import { Footer } from "@/components/landing/footer";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import { Logo } from "@/components/landing/logo";

export default function Home() {
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative -mt-[60px] pt-[60px]">
        <div className="pointer-events-none absolute inset-x-0 -top-40 z-0 flex justify-center">
          <div
            className="h-[500px] w-[900px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, var(--color-hero-glow) 0%, transparent 70%)",
              opacity: 0.4,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-15 pb-8 text-center">
          <h1
            className="font-heading mb-4 text-5xl leading-[1.08] font-extralight tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontKerning: "auto" }}
          >
            A designer learned
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              to code with AI
            </span>
          </h1>

          <p className="text-text-muted/75 mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light sm:text-lg">
            I&apos;m a graphic designer who built Neural Garden using Claude
            Code. No CS degree. No bootcamp. Now I&apos;m teaching you
            everything I learned — the dev process, git, deployment, and how to
            turn your design ideas into real, shipped products.
          </p>

          <Link
            href="/course"
            className="cta-brand inline-flex items-center gap-2 rounded-xl px-8 py-4.5 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            See the curriculum
          </Link>
        </div>
      </section>

      {/* ── What You'll Learn ────────────────────────────────────────── */}
      <section className="section-alt border-border/20 border-y py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-heading mb-4 text-3xl font-normal tracking-tight sm:text-4xl">
              What you&apos;ll learn
            </h2>
            <p className="text-text-muted/85 mx-auto max-w-xl text-lg">
              Everything a designer needs to ship real products with AI.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50/70 dark:bg-sky-950/40">
                <Terminal
                  className="h-7 w-7 text-sky-400 dark:text-sky-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                1. Claude Code fundamentals
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                Set up your environment, learn to talk to Claude Code
                effectively, and understand what&apos;s happening under the
                hood. No prior coding experience needed.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50/70 dark:bg-violet-950/40">
                <GitBranch
                  className="h-7 w-7 text-violet-400 dark:text-violet-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                2. The dev process, demystified
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                Git, branches, deployments, Docker — the &quot;programmer
                stuff&quot; that used to intimidate you, explained in designer
                language with real examples.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50/70 dark:bg-amber-950/40">
                <Rocket
                  className="h-7 w-7 text-amber-400 dark:text-amber-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                3. Ship your own project
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                By the end of the course, you&apos;ll have built and deployed a
                real web application. Not a tutorial project — your own idea,
                live on the internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Course ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-heading mb-4 text-3xl font-normal tracking-tight sm:text-4xl">
              Why this is different
            </h2>
            <p className="text-text-muted/85 mx-auto max-w-xl text-lg">
              Made by a designer who actually went through the journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SpotlightCard className="p-6">
              <div
                className={cn(
                  "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-sky-50/70 dark:bg-sky-950/40",
                )}
              >
                <Palette
                  className="h-5 w-5 text-sky-400 dark:text-sky-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                Designer-first perspective
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                No CS jargon. I explain concepts the way I wish someone
                had explained them to me — visually, with real context,
                and without assumptions about what you already know.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div
                className={cn(
                  "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-amber-50/70 dark:bg-amber-950/40",
                )}
              >
                <Code2
                  className="h-5 w-5 text-amber-400 dark:text-amber-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                Real case study: Neural Garden
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                Learn through the actual product I built — from first commit to
                production deployment. You&apos;ll see the mistakes, the
                breakthroughs, and the process.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div
                className={cn(
                  "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-teal-50/70 dark:bg-teal-950/40",
                )}
              >
                <Users
                  className="h-5 w-5 text-teal-400 dark:text-teal-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                Cohort-based, not self-paced
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                Learn alongside a small group of designers. Live Zoom workshops,
                a private Discord channel, and real accountability. You&apos;ll
                actually finish this one.
              </p>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div
                className={cn(
                  "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-violet-50/70 dark:bg-violet-950/40",
                )}
              >
                <Sparkles
                  className="h-5 w-5 text-violet-400 dark:text-violet-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading mb-2 text-lg font-medium">
                AI as your co-pilot
              </h3>
              <p className="text-text-muted/75 text-sm leading-relaxed">
                Claude Code isn&apos;t just a tool in this course — it&apos;s
                your development partner. Learn to communicate with AI
                effectively and build things you never thought possible.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="section-alt border-border/20 border-y py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-heading mb-4 text-3xl font-normal tracking-tight sm:text-4xl">
              How it works
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading mb-2 font-medium">Weekly Zoom workshops</h3>
              <p className="text-text-muted/75 text-sm">
                Live sessions where we build together, review work, and answer
                questions in real-time.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                <Users className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading mb-2 font-medium">Private Discord community</h3>
              <p className="text-text-muted/75 text-sm">
                Async Q&A, share your work, get feedback from peers and alumni
                who&apos;ve been through the journey.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                <Rocket className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading mb-2 font-medium">Ship by graduation</h3>
              <p className="text-text-muted/75 text-sm">
                You&apos;ll deploy your own project to a live URL before the
                cohort ends. Real output, not just theory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Email Capture / Waitlist ─────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading mb-4 text-3xl font-normal tracking-tight sm:text-4xl">
            Get notified when the
            <br />
            next cohort opens
          </h2>
          <p className="text-text-muted/85 mx-auto mb-10 max-w-lg text-lg">
            Spots are limited. Join the waitlist and be the first to know.
          </p>
          <div className="flex justify-center">
            <EmailCapture />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Sticky theme toggle ────────────────────────────────────── */}
      <div className="fixed right-4 bottom-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
