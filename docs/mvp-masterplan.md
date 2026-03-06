# Neural Garden Academy — MVP Masterplan

> Last updated: 2026-03-05
> Status: Planning (pre-build)

---

## Vision

A cohort-based course platform that grows a tribe of true fans around Neural Garden. The course is one tool — the real goal is building a community of like-minded designers, creators, and builders who become Neural Garden users and loving customers.

### Growth Loop

```
Free valuable content → Email list → Community → Cohort course → True fans → Evangelists
         ↑                                                                        |
         └────────────────────────────────────────────────────────────────────────┘
```

### Core Philosophy

- Start with the smallest thing that works
- Own the relationship (email list > social followers)
- Cohort-based > self-paced (students bond with each other, not just with you)
- Free content pulls people in; paid content deepens the relationship
- Build in public — share the journey transparently

---

## MVP Scope (Phase 1)

One course. One cohort at a time. Maximum impact, minimum infrastructure.

### What We're Building

| Component | Solution | Notes |
|---|---|---|
| Landing page | Custom Next.js | Your brand, your design, conversion-optimized |
| Email capture + newsletters | Listmonk (self-hosted) | Open source, PostgreSQL, Docker on Coolify |
| Payments | Stripe Checkout | Hosted payment page, minimal integration |
| Auth | Auth.js (NextAuth v5) | Same as Neural Garden |
| Course content | MDX pages behind auth | Markdown-based, git-managed |
| Cohort management | Simple admin dashboard | Database tables + admin UI |
| Live workshops | Zoom | Already available |
| Video hosting | YouTube (unlisted) | Free, reliable, no video infrastructure needed |
| Community | Discord | Free, zero dev work, where the audience already lives |

### What We're NOT Building (Yet)

- Full LMS with progress tracking
- Self-paced course mode
- Quiz/assessment engine
- Certificate generation
- Public API
- Discourse forum
- Multi-course catalog
- Internationalization
- Mobile app

---

## Technical Architecture

### Stack (Mirrors Neural Garden)

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, standalone output) |
| Language | TypeScript |
| Database | PostgreSQL 16 via Drizzle ORM |
| API | tRPC |
| Auth | Auth.js v5 (Google + GitHub OAuth + email/password) |
| UI | Radix UI + Tailwind CSS 4 |
| Content | MDX files (Fumadocs or custom content layer) |
| Email | Listmonk (self-hosted) |
| Payments | Stripe Checkout + webhooks |
| Deployment | Docker → GitHub Container Registry → Coolify on Hetzner |
| CI/CD | GitHub Actions |
| Testing | Vitest + Playwright |

### Infrastructure (Self-Hosted on Coolify/Hetzner)

```
┌─────────────────────────────────────────────────┐
│                   Coolify (Hetzner)              │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐             │
│  │   Academy    │  │   Listmonk   │             │
│  │   Next.js    │  │  Newsletter  │             │
│  │   :3000      │  │   :9000      │             │
│  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                     │
│         └────────┬─────────┘                     │
│                  │                               │
│         ┌───────┴────────┐                       │
│         │  PostgreSQL 16 │                       │
│         │   :5432        │                       │
│         └────────────────┘                       │
│                                                  │
│  (Neural Garden also runs on this server)        │
└─────────────────────────────────────────────────┘

External services:
  - Stripe (payments)
  - YouTube (video hosting)
  - Discord (community)
  - Zoom (live workshops)
  - Cloudflare R2 (asset storage, when needed)
```

### Database Schema (MVP)

```sql
-- Users (via Auth.js adapter)
users
  id            uuid PK
  name          text
  email         text UNIQUE
  emailVerified timestamp
  image         text
  role          varchar(20) DEFAULT 'student'  -- admin | instructor | student
  createdAt     timestamp
  updatedAt     timestamp

-- Auth.js required tables
accounts       -- OAuth provider links
sessions       -- Active sessions
verification_tokens

-- Cohorts
cohorts
  id            uuid PK
  name          varchar(255)    -- "Cohort 1 - March 2026"
  description   text
  startDate     date
  endDate       date
  maxStudents   integer
  price         integer         -- in cents
  stripePriceId varchar(255)
  status        varchar(20)     -- draft | enrolling | active | completed
  createdAt     timestamp
  updatedAt     timestamp

-- Enrollments
enrollments
  id            uuid PK
  userId        uuid FK → users
  cohortId      uuid FK → cohorts
  status        varchar(20)     -- pending | active | completed | refunded
  stripePaymentId varchar(255)
  enrolledAt    timestamp
  completedAt   timestamp

-- Discord invites (track who got invited)
discord_invites
  id            uuid PK
  userId        uuid FK → users
  cohortId      uuid FK → cohorts
  inviteSent    boolean DEFAULT false
  sentAt        timestamp
```

### Key Pages / Routes

```
Public:
  /                     Landing page (hero, benefits, social proof, pricing, email capture)
  /course               Course overview (what you'll learn, curriculum outline, instructor bio)
  /enroll               Stripe Checkout redirect
  /api/webhooks/stripe  Stripe webhook handler

Protected (students):
  /dashboard            Student dashboard (your cohort, upcoming sessions, course materials)
  /course/[slug]        Course content pages (MDX, behind auth)
  /course/[slug]/[lesson]  Individual lesson pages

Protected (admin):
  /admin                Admin overview
  /admin/cohorts        Manage cohorts (create, edit, view enrollments)
  /admin/students       View all students, enrollment status
  /admin/content        Content management (if needed beyond git)
```

---

## Enrollment Flow

```
1. Visitor lands on homepage
2. Reads about the course, watches preview content
3. Clicks "Join Next Cohort" → /enroll
4. Stripe Checkout (hosted by Stripe — handles payment UI, card processing)
5. Stripe webhook fires → our API creates enrollment record
6. Welcome email sent via Listmonk (login instructions, Discord invite, Zoom links)
7. Student logs in → sees dashboard with cohort info and course materials
8. Auto-invited to private Discord channel for their cohort
```

---

## Listmonk Setup

### What Listmonk Handles

- Email collection from landing page signup forms
- Welcome email sequences for new subscribers
- Cohort announcement emails
- Newsletter / "build in public" updates
- Subscriber segmentation (leads vs students vs alumni)

### Lists (Segments)

| List | Who | Purpose |
|---|---|---|
| Newsletter | Everyone who signs up | Build in public updates, free content, course announcements |
| Cohort N Students | Enrolled students per cohort | Session reminders, materials, cohort-specific updates |
| Alumni | Completed students | Alumni community, mentorship opportunities, new course launches |
| Waitlist | Interested but not enrolled | Priority access to next cohort, early bird pricing |

### Integration with Academy App

- Landing page form → Listmonk API to add subscriber
- Stripe webhook (enrollment) → Listmonk API to add to cohort list
- Course completion → Listmonk API to move to alumni list
- Listmonk runs as a separate Docker container on Coolify, shares PostgreSQL

---

## Tribe-Building Strategy

### The "1,000 True Fans" Approach

You don't need millions of followers. You need 1,000 people who:
- Use Neural Garden regularly
- Take your courses
- Share your content with peers
- Give you feedback that shapes the product
- Advocate for you without being asked

### Content Flywheel (Free → Paid Pipeline)

```
YouTube tutorials (free, public)
  → "Subscribe for more" → Email list
  → "Want to go deeper?" → Course landing page
  → "Join the community" → Discord

Twitter/LinkedIn posts (free, public)
  → Short tips, workflow demos, "build in public" updates
  → Link to newsletter signup
  → Social proof from student testimonials

Newsletter (free, owned)
  → Weekly insights on design + AI + Claude Code
  → Behind-the-scenes of Neural Garden development
  → Early access announcements for next cohort

Discord (free, semi-private)
  → Daily interaction, Q&A, sharing work
  → Students help each other (reduces your support load)
  → Alumni mentor new students (deepens their investment)

Course (paid, private)
  → Deep, structured learning with live interaction
  → Cohort bonding creates lasting connections
  → Graduates become your most vocal advocates
```

### The Alumni Ladder

Turn students into advocates through increasing involvement:

1. **Student** → Takes the course, learns, ships projects
2. **Graduate** → Shares their experience, posts testimonials
3. **Community member** → Stays active in Discord, helps newcomers
4. **Mentor/TA** → Helps facilitate future cohorts (give them a title + recognition)
5. **Contributor** → Co-creates content, case studies, guest posts
6. **Evangelist** → Recommends Neural Garden to everyone they know

Each step deepens their identity as part of your tribe.

### Cohort Playbook

**Before cohort opens:**
- Announce on newsletter + social 2-3 weeks early
- Early bird pricing for existing subscribers
- "Limited to N students" (real scarcity, not fake)
- Alumni testimonials from previous cohorts

**During cohort:**
- Weekly Zoom workshops (recorded, posted to YouTube unlisted)
- Async Q&A in cohort Discord channel
- Students share their work — celebrate publicly
- "Office hours" for 1-on-1 help (builds deep loyalty)

**After cohort:**
- Completion celebration (even a simple email feels good)
- Invite to alumni Discord channel
- Ask for testimonials (strike while the iron is hot)
- Survey: what would you want to learn next? (shapes future courses)
- Invite top students to mentor next cohort

---

## Growth Path

### Now → 50 students
- Landing page + Stripe + Listmonk + Discord + Zoom + YouTube
- Manual cohort management (admin dashboard)
- Focus on content quality and student relationships
- Collect testimonials aggressively

### 50 → 200 students
- Add self-paced course option (for people who missed the live cohort)
- Add progress tracking
- Add Discourse for searchable knowledge base
- Consider a second course topic
- Automate more of the enrollment/onboarding flow

### 200 → 500 students
- Multiple courses, course catalog
- Certificate generation
- Affiliate/referral program
- API for integrations
- Consider hiring a community manager

### 500+ students
- Full platform (original masterplan scope)
- Subscription model alongside one-time purchases
- Mobile-optimized experience
- Advanced analytics (PostHog)
- Internationalization if audience demands it

---

## Decisions Made

| Decision | Choice | Reasoning |
|---|---|---|
| Framework | Next.js (App Router) | Matches Neural Garden, full-stack capable |
| Content format | MDX files in git | Write in markdown, render beautifully, version controlled |
| Auth | Auth.js v5 | Already proven in Neural Garden |
| Database | PostgreSQL + Drizzle ORM | Already running on Hetzner for Neural Garden |
| Payments | Stripe Checkout | Lowest fees, best API, user's preference |
| Email/newsletter | Listmonk (self-hosted) | Open source, PostgreSQL, free forever |
| Video hosting | YouTube (unlisted) | Free, reliable, no infra to maintain |
| Community | Discord (now) → Discourse (later) | Zero setup now, searchable knowledge base when needed |
| Live teaching | Zoom | Already available, students know it |
| Deployment | Docker → Coolify on Hetzner | Same as Neural Garden |
| Asset storage | Cloudflare R2 (when needed) | Zero egress fees, CDN included |
| Analytics | Umami (self-hosted, later) | Privacy-friendly, no consent banner needed |

## Decisions Deferred

| Decision | When to Decide | Notes |
|---|---|---|
| Documentation system (Fumadocs) | When adding self-paced content | Not needed for cohort-only MVP |
| Search engine (Meilisearch) | When content library grows | PostgreSQL ILIKE is fine for < 100 pages |
| Discourse forum | When Discord Q&A starts repeating | Add searchable knowledge base |
| Certificate generation | When students ask for it | Simple PDF template when ready |
| Progress tracking | When adding self-paced mode | Cohort model tracks via attendance |
| Multi-language support | When international demand appears | Set up i18n routing early if signals emerge |
| Public API | When external integrations needed | tRPC is internal-only for now |
| Content protection / DRM | Probably never | Good content + community > anti-piracy tech |

---

## Estimated Costs (Monthly)

### At Launch (0-50 students)

| Item | Cost |
|---|---|
| Hetzner server (shared with Neural Garden) | Already paid |
| Coolify | Free (self-hosted) |
| Listmonk | Free (self-hosted) |
| Discord | Free |
| YouTube | Free |
| Zoom | ~$13/mo (Pro plan) |
| Stripe | 2.9% + $0.30 per transaction |
| Domain + DNS | ~$10-15/year |
| **Total fixed costs** | **~$15/mo** |

### At 200 Students

| Item | Cost |
|---|---|
| Above + possible server upgrade | +$20-40/mo |
| Cloudflare R2 (if storing assets) | ~$5/mo |
| Umami analytics | Free (self-hosted) |
| Discourse (if added) | Free (self-hosted, needs 2GB+ RAM) |
| **Total fixed costs** | **~$50-70/mo** |

---

## Next Steps

1. [ ] Set up the project repo (Next.js + Drizzle + tRPC + Auth.js)
2. [ ] Design and build the landing page
3. [ ] Set up Listmonk on Coolify
4. [ ] Integrate Stripe Checkout + webhook handler
5. [ ] Build the enrollment flow
6. [ ] Create admin dashboard (cohort + student management)
7. [ ] Set up MDX content pages for course materials
8. [ ] Set up Discord server with cohort channels
9. [ ] Create welcome email sequence in Listmonk
10. [ ] Deploy to Coolify
11. [ ] Launch Cohort 1

---

## Reference Architecture

This project mirrors the Neural Garden tech stack:
- **Source:** `/Users/sung/github/project-starter-template/`
- **Key patterns to copy:** Docker multi-stage build, GitHub Actions CI/CD, Drizzle schema patterns, Auth.js setup, tRPC router structure, Coolify deployment config

---

*This is a living document. Update as decisions are made and the platform evolves.*
