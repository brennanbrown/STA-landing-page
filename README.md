# [Self-Teach Academy](https://selfteach.academy/)

> Empowering self-taught students and life-long learners to track their progress and amplify their potential.

Self-Teach Academy is a centralized dashboard for tracking learning across multiple platforms, with integrations to ingest activity automatically.

## Repository Structure

- `index.html` — existing static landing page and demo.
- `app/` — Next.js full‑stack application (App Router, TypeScript, Tailwind, Prisma, Supabase):
  - `src/app/` — routes and layouts
  - `src/components/` — shared components (e.g., `Navbar`, `RequireAuth`)
  - `src/lib/` — clients (`prisma.ts`, `supabase.ts`)
  - `prisma/` — Prisma schema and seed script

## Current Status

- Next.js app scaffolded under `app/` with pnpm.
- Prisma schema added and client generated.
- Supabase client wired; env example provided.
- Protected routes stubbed: `/(protected)/dashboard`, `/integrations`, `/settings`.
- Seed script for default `Service` entries.

## Getting Started (Dev)

1) Prereqs
   - Node 18+ and Corepack (ships with recent Node)
   - pnpm: `corepack enable && corepack prepare pnpm@latest --activate`

2) Install deps
   - From repo root: `pnpm -C app install`

3) Environment
   - Copy env example: `cp app/env.example app/.env.local`
   - Set at minimum in `app/.env.local`:
     - `DATABASE_URL=postgresql://...`
     - `NEXT_PUBLIC_SUPABASE_URL=...`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`

4) Database
   - Generate Prisma client: `pnpm -C app run prisma:generate`
   - Create DB and run migrations: `pnpm -C app run prisma:migrate`
   - Seed defaults: `pnpm -C app run db:seed`

5) Run the app
   - `pnpm -C app run dev`
   - App: http://localhost:3000

## Scripts (in `app/`)

- `dev` — start Next.js dev server (Turbopack)
- `build` — production build
- `start` — run production server
- `prisma:generate` — generate Prisma Client
- `prisma:migrate` — run dev migrations
- `prisma:studio` — open Prisma Studio
- `db:seed` — seed default data

## Roadmap (high level)

- OAuth auth (GitHub/Google) with Supabase
- Activity ingestion APIs and first integrations
- Dashboard/Goals/Settings UIs backed by DB
- Deployment: Vercel (app) + Supabase (DB/Auth/Storage)

## Legacy Demo

The static `index.html` remains for the landing and demo content while the app under `app/` is developed.

---
For notable changes, see `CHANGELOG.md`. Active tasks are tracked in `TODO.md`.