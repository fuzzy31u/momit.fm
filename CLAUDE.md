# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based podcast website for momit.fm, a Japanese parenting and tech podcast. The site fetches episode data from an RSS feed and renders episode listings and individual episode pages.

## Development Commands

### Next.js Application
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### ValueCommerce Agent (scripts/valuecommerce-agent/)
- Ask Claude Code: `"Check <article-url> and create a ValueCommerce MyLinkBox if needed"`
- Uses Playwright MCP with manual login workflow

### Transcript Conversion
- `node scripts/convertTranscript.js <episode-number>` - Convert transcript from ~/Downloads/momitfm{N}.txt to public/transcripts/{N}.json

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

## Scripts and Automation

### Transcript Processing (scripts/convertTranscript.js)
Converts raw transcript text files into structured JSON format for episodes.

**Input format**: `~/Downloads/momitfm{N}.txt` with pattern:
```
Speaker Name (MM:SS.mmm)
Transcript text...
```

**Output format**: `public/transcripts/{N}.json`:
```json
{
  "episodeId": 87,
  "segments": [
    {"speaker": "...", "timestamp": "00:MM:SS", "text": "..."}
  ]
}
```

**Processing notes**:
- Removes spaces between Japanese characters
- Converts MM:SS.mmm timestamps to HH:MM:SS format
- Can process single episode or batch (hardcoded list in script)

### ValueCommerce Agent (scripts/valuecommerce-agent/)
Automates creating ValueCommerce affiliate MyLinkBox links for hub.momit.fm articles via Playwright MCP.

**Usage**: User asks `"Check <article-url> and create a ValueCommerce MyLinkBox if needed"`

**Workflow**:
1. Check article for existing MyLinkBox widgets
2. Extract product info from Amazon links
3. Open ValueCommerce login (manual login)
4. Guide user through MyLinkBox creation form

**File**: `agent-mcp.js` - Instructions for Claude Code's Playwright MCP workflow

### GitHub Actions Automation

**.github/workflows/rss-monitor.yml**:
- Runs daily to check RSS feed for new episodes
- Compares SHA256 hash of RSS feed against stored hash
- When changed: commits new hash, triggers Vercel deploy, dispatches announcement generation

**.github/workflows/generate-announcement.yml**:
- Triggered by rss-monitor or manually
- Uses Playwright to scrape episode details
- Generates announcement text using Gemini API
- Commits announcement.txt to repository

## Development Notes

- The codebase uses a mix of TypeScript strict and non-strict patterns
- RSS parsing is synchronous within async functions
- Episode numbering is reverse-calculated from array position
- Audio player uses native HTML5 `<audio>` element
- Transcripts are stored as static JSON files in public/transcripts/
- GitHub Actions handle RSS monitoring and announcement generation automatically

## Code Quality Guidelines

- **Remove dead code**: Proactively identify and remove unused functions, variables, and imports when found
- **Clean up as you go**: When working on files, remove any obvious dead code or unused declarations

## Documentation Preferences

- **Avoid creating multiple .md files**: Keep documentation minimal and consolidated
- **Use existing README.md**: Add new info to existing docs rather than creating new files
- **No verbose guides**: Keep instructions concise and practical
- **Delete unnecessary documentation**: If you created multiple instruction files (XX.md), consolidate and remove extras