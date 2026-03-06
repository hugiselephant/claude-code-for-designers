#!/bin/sh
set -e

echo "Neural Garden Academy starting..."

# Push database schema (safe to run multiple times — idempotent)
if [ -n "$DATABASE_URL" ]; then
  echo "Pushing database schema..."
  npx drizzle-kit push --force 2>&1 || echo "Schema push failed (non-fatal, may already be up to date)"
fi

# Start Next.js
echo "Starting Next.js on port ${PORT:-3000}..."
exec node server.js
