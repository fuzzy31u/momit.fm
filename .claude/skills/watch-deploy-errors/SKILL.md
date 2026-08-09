---
name: watch-deploy-errors
description: Watch momit.fm Vercel deploy errors, auto-fix build failures, and merge or escalate based on CI + Greptile score. Use when the user says "デプロイ監視", "deploy watch", "postmortem loop", or to run one watch iteration inside a /loop.
---

# Deploy Error Watch（postmortem 自動化）

Vercel デプロイ失敗の検知 → バグ修正 → 安全ならマージ、危険ならエスカレーション、を 1 イテレーションとして実行する。

## 1. 検知

- `gh api "repos/fuzzy31u/momit.fm/deployments?per_page=3"` で最新デプロイを取得し、`gh api "repos/fuzzy31u/momit.fm/deployments/{id}/statuses"` で state を確認（`failure` / `error` を検知）
- `gh run list --repo fuzzy31u/momit.fm --limit 10` で直近の失敗ワークフローも確認
- momitfm ワークスペースの Slack MCP が認証済みなら、C02ENEYK0NB の Vercel 失敗通知も確認
- 新しい失敗がなければ何もせず終了（次の tick まで待機）

## 2. 重複防止

- `gh pr list --repo fuzzy31u/momit.fm --state open` を確認し、同じ失敗に対応する `fix/` ブランチの PR が既にあればスキップ（必要ならその PR のゲート判定だけ進める）

## 3. 再現と修正

- scratchpad に `git worktree add <scratchpad>/momit-main origin/main` で worktree を作成（ローカルの作業ツリーを汚さない）
- `npm ci && npm run build` でエラーを再現
- 最小限の修正を行い、build が通ることを確認
- `fix/<内容のスラッグ>` ブランチでコミット・push し、PR を作成（原因・修正・確認内容を日本語で記載）
- 終了時に worktree を削除

## 4. ゲート判定（マージ or エスカレーション）

- `gh pr checks <N> --repo fuzzy31u/momit.fm --watch` で CI 完了を待つ
- `greptile-apps` のコメントから「Confidence Score: X/5」を読み取る
- **全チェック成功 かつ Score 5/5** → `gh pr merge <N> --repo fuzzy31u/momit.fm --merge --delete-branch` で自動マージ
- それ以外（チェック失敗、Score 5/5 未満、Greptile コメントなし、修正に確信が持てない場合を含む）→ **マージせず** PR に `@fuzzy31u` メンション付きでエスカレーションコメントを投稿（理由と判断材料を明記）

## 5. 報告

- 実行結果（原因 / 修正 / PR リンク / マージ or エスカレーション）をユーザーに要約報告
- Slack（momitfm）が使える場合は、元のエラー通知スレッドへの返信をドラフト作成（送信はしない）

## 安全ルール

- 自動マージは上記ゲート条件を完全に満たす場合のみ。迷ったらエスカレーション
- main への直接 push は禁止（必ず PR 経由）
- 修正はビルドを通すための最小限に留め、機能変更を混ぜない
