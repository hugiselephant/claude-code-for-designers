"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/listmonk/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-success/30 bg-success/10 px-6 py-4 text-center">
        <p className="text-sm font-medium text-success">
          You&apos;re on the list! We&apos;ll notify you when the next cohort opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border-border bg-surface placeholder:text-text-muted/50 flex-1 rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="cta-brand shrink-0 rounded-lg px-5 py-3 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Notify Me"}
      </button>
      {status === "error" && (
        <p className="text-error absolute mt-14 text-xs">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
