# Testing momit.fm Preview Deployments

momit.fm is a Next.js podcast website hosted on Vercel. When verifying preview deployments (e.g. for Dependabot PRs or dependency updates), check the following.

## Project Structure

- `pages/index.tsx` — Homepage listing all episodes
- `pages/episode/[id].tsx` — Dynamic episode page with audio player
- Static site generation (SSG) via `getStaticProps` / `getStaticPaths`
- RSS feed as data source

## Finding the Preview URL

Vercel preview URLs appear in PR comments or status checks. Look for a deployment from Vercel in the PR's status checks or comments section.

## Homepage Verification

1. Navigate to the preview URL root `/`
2. Verify:
   - Header shows "momit.fm" title with site description
   - Episode list displays 90+ episodes as `<article>` elements
   - Each episode has a clickable title link (`/episode/{id}`) and date in `YYYY/MM/DD` format
   - Footer section with subscription links: Apple Podcasts, YouTube, Amazon Podcast, Spotify, RSS
   - "momit hub" link and feedback section in footer

## Episode Page Verification

1. Click on the most recent episode from the homepage
2. Verify:
   - Episode title displayed as `<h2>` heading
   - Publication date in `YYYY/MM/DD` format
   - Audio player (`<audio>` element with controls) is present and shows duration
   - Episode description/show notes HTML rendered below the audio player
   - Transcript toggle button ("文字起こし") visible
   - Header and footer present (same as homepage)

## Build Verification

```bash
npm install
npm run build
```

The build generates ~98 static pages (homepage + episode pages). All pages should generate without errors.

## Notes

- The site is in Japanese
- `package-lock.json`-only changes (e.g. `npm audit fix`) should not affect rendering but always verify visually
- Dev dependencies (eslint toolchain) don't affect production builds, but verify anyway
