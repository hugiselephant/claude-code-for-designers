import Link from "next/link";
import { Logo } from "@/components/landing/logo";

export function Footer() {
  return (
    <footer className="border-border/20 border-t py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-1">
          <Logo size={22} />
          <span className="font-heading text-base tracking-tight">
            <span className="font-extralight">Neural Garden</span>{" "}
            <span className="font-semibold">Academy</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-text-muted/75 hover:text-text text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            href="/course"
            className="text-text-muted/75 hover:text-text text-sm transition-colors"
          >
            Course
          </Link>
        </nav>

        <p className="text-text-muted/65 text-xs">
          Built by a designer, for designers.
        </p>
      </div>
    </footer>
  );
}
