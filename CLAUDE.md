# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based podcast website for momit.fm, a Japanese parenting and tech podcast. The site fetches episode data from an RSS feed and renders episode listings and individual episode pages.

## Development Commands

- `npm run dev` or `yarn dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Structure
- **Next.js SSG**: Uses `getStaticProps` and `getStaticPaths` for static generation
- **RSS-driven content**: All episode data is fetched from https://rss.art19.com/momitfm at build time
- **TypeScript**: Configured with loose strictness (`strict: false`)

### Key Files
- `pages/index.tsx` - Homepage listing all episodes
- `pages/episode/[id].tsx` - Individual episode pages with audio player
- `const/index.ts` - Site constants including RSS URL and description
- `util/index.ts` - Utility functions (date formatting)
- `index.d.ts` - TypeScript declarations for RSS data structure

### Data Flow
1. RSS feed is fetched during build time in `getStaticProps`
2. XML is parsed using xml2js library
3. Episodes are displayed in reverse chronological order (newest first)
4. Episode IDs are calculated as `episodes.length + 1 - index`

### RSS Data Structure
Episodes contain:
- `title` - Episode title (array format from XML)
- `description` - HTML description content
- `pubDate` - Publication date string
- `enclosure` - Audio file URL and metadata

### Styling
- CSS Modules pattern (`styles/Home.module.css`)
- FontAwesome icons integrated via React components
- Custom favicon and PWA assets in `public/`

## Development Notes

- The codebase uses a mix of TypeScript strict and non-strict patterns
- RSS parsing is synchronous within async functions
- Episode numbering is reverse-calculated from array position
- Audio player uses native HTML5 `<audio>` element