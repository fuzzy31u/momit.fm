# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds Next.js routes (`index.tsx`, `episode/[id].tsx` for episode pages).
- `components/` contains shared UI (Header, Footer, Head).
- `styles/` uses CSS Modules (e.g., `styles/Home.module.css`).
- `const/` and `util/` hold site constants and helpers.
- `public/` contains static assets and transcripts at `public/transcripts/{episodeId}.json`.
- `scripts/` includes automation like `convertTranscript.js` and the ValueCommerce agent.

## Build, Test, and Development Commands
- `npm run dev` starts the dev server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm start` runs the production server.
- `npm run lint` runs ESLint (Next.js config).
- `node scripts/convertTranscript.js <episode-number>` converts `~/Downloads/momitfm{N}.txt` to `public/transcripts/{N}.json`.

## Coding Style & Naming Conventions
- TypeScript + React (Next.js). Keep imports ordered and lean.
- Indentation is 2 spaces (match existing files like `pages/index.tsx`).
- CSS Modules naming is `styles.<token>`; keep class names descriptive.
- Use `strict: false` TypeScript patterns; avoid introducing stricter types without a reason.
- Lint with `npm run lint` before PRs.

## Testing Guidelines
- No dedicated test folder/framework is currently configured.
- If you add tests (e.g., Playwright), place them under `tests/` and document the command in this file.
- Manual check: run `npm run dev` and validate homepage + an episode page.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative, and task-focused (e.g., “Add transcript for episode 92”, “Update RSS hash”).
- PRs should include: a brief summary, what changed, and screenshots for UI updates.
- Link related issues or episodes when applicable.

## Automation & Configuration Notes
- RSS-driven content is fetched at build time (see `const/` + RSS logic in `pages/`).
- GitHub Actions update the RSS hash and generate announcements.

## Agent-Specific Instructions
- Keep docs consolidated; prefer updating existing docs over adding new ones.
- Remove obvious dead code or unused imports when touching files.
