export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

export const RATE_LIMIT_STANDARD: RateLimitConfig = {
  maxRequests: 500,
  windowMs: 60_000,
};

export const RATE_LIMIT_AI: RateLimitConfig = {
  maxRequests: 30,
  windowMs: 60_000,
};

export const RATE_LIMIT_BULK: RateLimitConfig = {
  maxRequests: 20,
  windowMs: 60_000,
};

export const RATE_LIMIT_AUTH: RateLimitConfig = {
  maxRequests: 30,
  windowMs: 60_000,
};

const CLEANUP_INTERVAL_MS = 60_000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

const MAX_WINDOW_MS = Math.max(
  RATE_LIMIT_STANDARD.windowMs,
  RATE_LIMIT_AI.windowMs,
  RATE_LIMIT_BULK.windowMs,
  RATE_LIMIT_AUTH.windowMs,
);

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      entry.timestamps = entry.timestamps.filter(
        (t) => now - t < MAX_WINDOW_MS,
      );
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);
  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): { allowed: boolean; remaining: number; resetMs: number } {
  ensureCleanup();

  const now = Date.now();
  let entry = store.get(key);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

  if (entry.timestamps.length >= config.maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const resetMs = config.windowMs - (now - oldestInWindow);
    return { allowed: false, remaining: 0, resetMs };
  }

  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.timestamps.length,
    resetMs: config.windowMs,
  };
}
