"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return true;
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("ng-theme", next ? "dark" : "light");
    } catch {}
  }, []);

  return (
    <button
      onClick={toggle}
      className="border-border/30 flex h-10 w-10 items-center justify-center rounded-full border bg-white/80 text-neutral-400 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-neutral-600 dark:bg-neutral-900/80 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
