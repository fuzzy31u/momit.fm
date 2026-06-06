---
name: generate-shownote
description: Generate a momit.fm podcast shownote (episode description) in plain text from a Japanese transcript, following the established style guide with topic emojis and ad-insertion suggestions.
---

You are tasked with generating a podcast episode shownote (description) from a Japanese transcript.

## Input
- Argument: $1
  - If a file path (e.g., `~/Downloads/momitfm95.txt`): read as raw transcript
  - If a number (e.g., `95`): read from `public/transcripts/$1.json` (JSON format with segments)
- Raw transcript format: Speaker Name (MM:SS.mmm) followed by transcribed text
- JSON transcript format: `{ "episodeId": N, "segments": [{ "speaker", "timestamp", "text" }] }`

## Style Reference

First, read the style guide for established patterns and real examples:
```bash
cat .claude/skills/_shared/episode-style-guide.md
```

## Output Format Requirements

Generate a plain text description following momit.fm's established style.

### Structure:
1. Opening paragraph (2-3 sentences summarizing the episode)
2. Blank line
3. Topic sections with emojis and bold titles
4. Blank line
5. Separator line
6. Blank line
7. Closing section with links

### Plain Text Format Template:
```
[Opening summary paragraph - 2-3 sentences, conversational tone]

[Emoji] **[Topic Title]** – [Description/explanation]
[Emoji] **[Topic Title]** – [Description/explanation]
[Emoji] **[Topic Title]** – [Description/explanation]

…………………………………………………………………

✨＼ momit hub更新しました /／ ✨

[【最新の hub.momit.fm 記事タイトル】](記事 URL)


…………………………………………………………………

✨ 📩 フィードバック募集中！

ハッシュタグ [#momitfm](https://x.com/search?q=momitfm) もしくは [お便りフォーム](https://docs.google.com/forms/d/e/1FAIpQLSfwtvdBRjwhWyI4wvpX42knaLbQ3Ac05XVwd0mr4GFvYmT1wg/viewform) でのご意見ご感想お待ちしています！📩
💛 番組のフォローと⭐評価もお願いいたします！


…………………………………………………………………

✨🎧 Credits

🎙️This Show Hosted by [@_yukamiya](https://x.com/_yukamiya) & [@m2vela](https://x.com/m2vela)

🎶 Intro Crafted by [@kirillovlov2983](https://www.youtube.com/@kirillovlov2983)
```

> **momit hub ブロック**: その回に紹介する最新記事がある場合のみ含める。記事がなければこのブロック（区切り線 + 「momit hub更新しました」 + 記事タイトル）を省略し、フィードバック募集ブロックから始める。
>
> **リンクはハイパーリンク（HTML アンカー）で**: Art19 の Description は HTML リッチテキスト。生 URL や `テキスト (URL)` ではなく、表示テキストにハイパーリンクを設定する（記事は**タイトル文字列自体**にリンクを貼り、別行の生 URL は置かない）。上記の `[テキスト](URL)` は貼り付け先のリンク対象を示す表記。固定リンク先:
> - `#momitfm` → `https://x.com/search?q=momitfm`
> - `お便りフォーム` → `https://docs.google.com/forms/d/e/1FAIpQLSfwtvdBRjwhWyI4wvpX42knaLbQ3Ac05XVwd0mr4GFvYmT1wg/viewform`
> - `@_yukamiya` → `https://x.com/_yukamiya` / `@m2vela` → `https://x.com/m2vela`
> - `@kirillovlov2983` → `https://www.youtube.com/@kirillovlov2983`

### Style Guidelines:
- **Format**: Plain text without HTML tags for easy copy-paste
- **Tone**: Conversational, informative, friendly (casual Japanese)
- **Opening**: Brief context about what's discussed, written as natural summary. 聞きどころのハイライトを会話調で紹介
- **Topics**: Use relevant emojis that match the content (tech: 🤖🔧🧰💻, parenting: 📝✈️🎮, concepts: 🧠📏🌐)
- **Topic titles**: Bold with `**` markers. Concise and catchy
- **Descriptions**: Concise explanations using em dash (–) separator. 1 文で簡潔に
- **Topic count**: Main themes 3-5 + sub-topics as needed (total 5-12)
- **Links**: Art19 Description は HTML。表示テキストにハイパーリンク（アンカー）を設定する。生 URL や `Link Text (URL)` は使わない。記事はタイトル文字列自体にリンクを貼る
- **Separator**: Use `…………………………………………………………………` (full-width ellipsis × 15)
- **Blank lines**: Use single blank lines between sections for readability
- **Avoid**: Picking up too much from ice-break / small talk at the beginning. Focus on main topics

## Steps:
1. Read the style guide from `.claude/skills/_shared/episode-style-guide.md`
2. Read the transcript from $1
3. Identify main discussion topics (skip ice-break, focus on substantive content)
4. Understand the overall theme and context
5. Generate plain text description matching the established style
6. Output the shownote

## Ad Insertion Points (Bonus)

After the shownote, suggest 2-3 ad insertion points:
```
---
📍 広告挿入ポイント候補:
1. HH:MM:SS — [トピック転換の説明]
2. HH:MM:SS — [トピック転換の説明]
3. HH:MM:SS — [トピック転換の説明]
```

Generate the shownote now.
