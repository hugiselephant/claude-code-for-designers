"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

const variantStyles = {
  default: "border-border bg-surface text-text",
  success: "border-success/50 bg-success/10 text-success",
  error: "border-error/50 bg-error/10 text-error",
  warning: "border-warning/50 bg-warning/10 text-warning",
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "shadow-panel animate-in slide-in-from-right-full duration-normal flex items-start gap-3 rounded-lg border px-4 py-3",
            variantStyles[toast.variant],
          )}
          style={{ minWidth: 280, maxWidth: 400 }}
        >
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 text-xs opacity-80">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
