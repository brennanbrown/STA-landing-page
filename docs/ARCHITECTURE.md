# Architecture Overview

This document outlines the architecture for migrating Self-Teach Academy from a static landing to a full-stack application.

## Stack
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Auth: Supabase Auth (Google/GitHub OAuth)
- Database: PostgreSQL (Supabase) via Prisma ORM
- APIs: Next.js Route Handlers under `/app/api`
- Jobs: Vercel/Edge Cron or Supabase cron
- Hosting: Vercel (web) + Supabase (DB/Auth/Storage)

## High-Level Flow
1. User authenticates via Google/GitHub.
2. User connects one or more services (GitHub, CSV import, API-key providers).
3. Ingestion runs (on-demand or scheduled) and stores normalized `Activity` rows.
4. Dashboard and other views query per-user data via server components or API.

## Directory Layout (planned)
- `/index.html` marketing page (existing)
- `/app` Next.js app (scaffolded)
  - `/app/(protected)/dashboard`
  - `/app/(protected)/integrations`
  - `/app/(protected)/settings`
  - `/app/api/*`
  - `/lib` (db, auth, schemas)
  - `/prisma/schema.prisma`
  - `/tests`

## Security & Privacy
- Per-user row-level authorization enforced by server based on session userId.
- Secrets in environment variables; no client exposure except `NEXT_PUBLIC_*`.
- Audit-friendly: store source metadata on `Activity` and `Integration` records.

## Observability
- Basic request logging and error tracking (to be selected later: Sentry/Logflare).
- Rate limiting for ingestion endpoints.
