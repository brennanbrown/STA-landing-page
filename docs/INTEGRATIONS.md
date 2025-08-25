# Integrations

This document outlines initial integrations: GitHub (OAuth) and API-key providers (WakaTime, Codewars, Exercism), plus CSV Import.

## GitHub (OAuth)
- Purpose: Treat commits/pushes as activity signals.
- Auth: OAuth (scopes: `read:user`, `repo:status` not needed; we primarily read events via REST). Start minimal with `read:user`.
- Data: Recent events per user (`/users/:username/events` or `/users/:username/events/public`). For authenticated user: `/user/events`.
- Notes: Rate-limited; we will cache and backfill. Map to `Activity` with `service = github`, duration estimate heuristic per day.
- Env (via provider config):
  - `GITHUB_ID`
  - `GITHUB_SECRET`

## CSV Import
- Purpose: Quick path to real data. User uploads CSV of activity history.
- Expected columns:
  - `date` (YYYY-MM-DD)
  - `service` (slug, e.g., `duolingo`, `khan`, `codecademy`)
  - `minutes` (integer)
  - `title` (string)
- Behavior: Parse, validate, create `Activity` rows for the current user.

## WakaTime (API key)
- Purpose: Import coding time by language/project.
- Auth: Personal API key.
- Endpoint: `GET https://wakatime.com/api/v1/users/current/summaries?start=YYYY-MM-DD&end=YYYY-MM-DD`
- Env: `WAKATIME_API_KEY`
- Mapping: Sum minutes per day; service=`wakatime`, title=`project` or `language` summary.

## Codewars (simple token or public)
- Purpose: Track kata completions.
- Endpoint: `GET https://www.codewars.com/api/v1/users/{username}` and `/code-challenges/completed?page=0`
- Env: `CODEWARS_API_KEY` (optional; many endpoints are public)
- Mapping: Each completion as an `Activity` with nominal minutes.

## Exercism (token)
- Purpose: Completed exercises metadata.
- Auth: Personal token.
- Endpoint: GraphQL/REST as available: `https://exercism.org/api/v2/solutions` (token in headers)
- Env: `EXERCISM_TOKEN`
- Mapping: Each submitted solution recorded as `Activity` with nominal minutes.

## Scheduling & Backfill
- On-demand import and daily cron (Vercel/Supabase) for incremental sync.

## Error Handling
- Store integration status with last sync time and last error on `Integration`.
- Rate-limit and exponential backoff on failures.
