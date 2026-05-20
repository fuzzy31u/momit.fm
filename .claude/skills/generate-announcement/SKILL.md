---
description: Generate SNS announcement text for published episode
argument-hint: [episode_number]
---

You are tasked with generating SNS announcement text for a published momit.fm episode.

## Input
- Episode number: $1

## Steps

1. **Fetch the RSS feed** to get episode info:
   ```bash
   curl -s https://rss.art19.com/momitfm | head -100
   ```
   Extract the latest episode's title and number.

2. **Get Spotify episode URL**:
   ```bash
   curl -s "https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX" \
     -H "User-Agent: Mozilla/5.0" | grep -oP 'https://open\.spotify\.com/episode/[a-zA-Z0-9]+' | head -1
   ```
   Fallback: `https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX`

3. **Get Apple Podcast episode URL**:
   Try to extract from the Apple Podcasts page. If that fails, use the show URL:
   `https://podcasts.apple.com/jp/podcast/momit-fm/id1589345170`

4. **Generate announcement text** following the established template:

### X/Twitter 用
```
IT企業で働くママによる子育て×Tech Podcast http://momit.fm を配信しました🎙️ w/
@m2vela

—
{episode_number}. {episode_title}

👇Spotify
{spotify_url}

👇Apple
{apple_url}

#momitfm #子育テック
```

5. **Save to file**:
   ```bash
   cat > announcement.txt << 'ANNOUNCEMENT'
   [generated text]
   ANNOUNCEMENT
   ```

6. **Output the announcement** for user review and also mention:
   - The text has been saved to `announcement.txt`
   - User can copy-paste to X/Twitter
   - Character count (X limit: 280 chars per post, but URLs are shortened)

## Notes
- This skill is for post-publication use (after Art19 upload and RSS update)
- The GitHub Actions workflow also generates this automatically, but this skill allows manual generation with potentially better URL accuracy
- If episode-specific URLs can't be found, use show-level URLs as fallback
- Don't modify the template structure — it's established and consistent
