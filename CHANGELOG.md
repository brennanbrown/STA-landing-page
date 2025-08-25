# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project adheres to Semantic Versioning.

## [Unreleased]
- Migrate to pnpm; install dependencies and configure build approvals
- Add Prisma schema and generate client; add Prisma scripts and seed file
- Add Supabase client helper and env example
- Scaffold protected routes: `/dashboard`, `/integrations`, `/settings` and Navbar
- Start Next.js dev server successfully with Turbopack

## [0.1.0] - 2025-08-25
### Added
- Dashboard demo section in `index.html` (`#sta-dashboard`) with metric cards and two charts
- Frontend logic `js/sta-app.js` with mock data, localStorage persistence, and Chart.js rendering
- Added Chart.js via CDN to `index.html`
- Project docs: `TODO.md` and `CHANGELOG.md`

## [0.1.1] - 2025-08-25
### Fixed
- Corrected malformed Khan Academy link in `index.html`
- Fixed footer email `mailto:` in `index.html`

### Decisions
- Chosen stack: Next.js (App Router) + TypeScript + Tailwind + Supabase (Postgres/Auth) + Prisma

