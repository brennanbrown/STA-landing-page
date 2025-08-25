# TODO

A living checklist for moving from static mock-up to a full application.

## Now (High priority)
- [x] Decide backend stack and repo structure (Next.js + TypeScript + Supabase/Postgres + Prisma + Auth.js)
- [x] Design database schema (Users, Accounts, Services, Activities, Goals, Certificates, Integrations)
- [x] Scaffold app (Next.js App Router) with linting, formatting, env management
- [ ] Configure environment variables (`app/.env.local`): `DATABASE_URL`, Supabase keys, OAuth
- [ ] Run initial DB migration: `pnpm -C app run prisma:migrate`
- [ ] Seed default data: `pnpm -C app run db:seed`
- [ ] Implement authentication (OAuth via Google/GitHub)
- [ ] Define API routes for Activities, Services, Goals, Certificates
- [ ] Migration plan: keep current `index.html` as landing, add `/app` for authenticated dashboard

## Next
- [ ] Build initial real integrations (choose 1–2): e.g., Duolingo (scrape/API), Codecademy export, generic CSV importer
- [ ] Frontend screens: Dashboard, Activity Feed, Goals, Settings, Integrations
- [ ] Settings UI backed by user profile (timezone, weekly goals, service toggles)
- [ ] Charts: replace mock data with API data; add empty states and loaders
- [ ] Testing setup (unit + e2e) and CI workflow
- [ ] Deployment: Vercel (app) + Supabase (DB/Auth/Storage)

## Later
- [ ] Webhooks/cron ingestion for integrations
- [ ] Certificates store with expiry reminders
- [ ] Team/classroom mode (organizations, roles, sharing)
- [ ] Rate limiting, observability, and audit logs
- [ ] Privacy controls and full data export

## Done
- [x] Add frontend demo dashboard with mock data and charts
- [x] Switch to pnpm and complete dependency installation
- [x] Add Prisma schema and generate client
- [x] Add Supabase client helper
- [x] Scaffold protected routes: `/dashboard`, `/integrations`, `/settings`
- [x] Add Navbar and include in root layout
- [x] Add Prisma seed script and package.json scripts

## Notes
- Keep this file updated alongside CHANGELOG.md on each significant change.

