#!/usr/bin/env bash
# SessionStart hook: detect recent unrenamed Riverside exports in ~/Downloads
# and surface a notification so the assistant prompts the user to release.
# Stays silent (exit 0, no output) when nothing relevant is found.

set -u

DOWNLOADS_DIR="$HOME/Downloads"
RECENCY_DAYS=7
RSS_URL="https://rss.art19.com/momitfm"

[ -d "$DOWNLOADS_DIR" ] || exit 0

# Newest unrenamed file for a given extension within the recency window, or empty.
# Mirrors scripts/renameDownloads.js findCandidateFiles() behavior.
newest_with_ext() {
  local ext="$1"
  local newest_time=0
  local newest_file=""
  local f t
  while IFS= read -r -d '' f; do
    t=$(stat -f '%m' "$f" 2>/dev/null) || continue
    if [ "$t" -gt "$newest_time" ]; then
      newest_time=$t
      newest_file="$f"
    fi
  done < <(find "$DOWNLOADS_DIR" -maxdepth 1 -type f \
    -iname "*.${ext}" \
    ! -iname 'momitfm*' \
    -mtime -"${RECENCY_DAYS}" \
    -print0 2>/dev/null)
  printf '%s' "$newest_file"
}

txt=$(newest_with_ext txt)
srt=$(newest_with_ext srt)
mp3=$(newest_with_ext mp3)

if [ -z "${txt}${srt}${mp3}" ]; then
  exit 0
fi

# Best-effort: derive next episode number from RSS (items + 1, same as renameDownloads.js)
ep_num=""
if command -v curl >/dev/null 2>&1; then
  rss=$(curl -fsS --max-time 5 "$RSS_URL" 2>/dev/null || true)
  if [ -n "$rss" ]; then
    item_count=$(printf '%s' "$rss" | grep -c '<item>' || true)
    if [ "${item_count:-0}" -gt 0 ]; then
      ep_num=$((item_count + 1))
    fi
  fi
fi

format_line() {
  local f="$1"
  [ -z "$f" ] && return 0
  local name date
  name=$(basename "$f")
  date=$(stat -f '%Sm' -t '%-m/%-d' "$f" 2>/dev/null)
  printf '  - %s (%s)\n' "$name" "$date"
}

if [ -n "$ep_num" ]; then
  echo "📻 New Riverside materials detected in ~/Downloads for episode ${ep_num}:"
else
  echo "📻 New Riverside materials detected in ~/Downloads:"
fi
format_line "$txt"
format_line "$srt"
format_line "$mp3"
echo
if [ -n "$ep_num" ]; then
  echo "To release this episode, run: /release-episode ${ep_num}"
else
  echo "To release this episode, run: /release-episode <N>  (RSS lookup failed; verify episode number)"
fi
