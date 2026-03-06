# Neural Garden Academy

Cohort-based course platform for "Claude Code for Designers".

## Stack

- Next.js 16 (App Router, standalone output)
- React 19, TypeScript 5
- PostgreSQL 16 via Drizzle ORM
- tRPC 11 (HTTP batch link, SuperJSON)
- Auth.js v5 (Google + GitHub OAuth, JWT strategy)
- Tailwind CSS 4 with custom design tokens
- Stripe Checkout + webhooks
- Listmonk (self-hosted email/newsletter)
- MDX for course content

## Project Structure

```
src/
  app/
    (marketing)/     # Landing page, course overview, enroll
    (auth)/          # Login page
    (dashboard)/     # Student dashboard + course lessons
    (admin)/         # Admin panel (cohorts, students, stats)
    api/             # tRPC, auth, Stripe webhooks, Listmonk
  components/
    landing/         # Marketing page components
    shared/          # Dashboard nav, admin nav, lesson nav
    mdx/             # MDX component overrides
    ui/              # Base UI (button, card, toaster)
  content/lessons/   # MDX lesson files + metadata index
  lib/
    auth/            # Auth.js config
    db/              # Drizzle schema + client
    trpc/            # tRPC routers + client
    stripe/          # Stripe checkout + client
    listmonk/        # Listmonk API client
    utils/           # cn() utility
```

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm test` — Vitest
- `pnpm db:push` — push schema to database
- `pnpm db:studio` — open Drizzle Studio

## Conventions

- Role system: `admin`, `instructor`, `student` (varchar, not boolean)
- First user auto-promoted to admin
- Prices stored in cents (integer)
- Use `cn()` for conditional classNames
- Design tokens in `tokens.css`, fonts: Sora (headings), DM Sans (body), JetBrains Mono (code)
- Dark mode via `.dark` class on `<html>`
