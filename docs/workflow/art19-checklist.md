# Art19 アップロードチェックリスト

Art19 にエピソードを手動アップロードする際の入力フィールドと手順。

---

## 必要な素材

| 素材 | 生成元 | フォーマット |
|---|---|---|
| 音源ファイル | Riverside.fm からエクスポート | MP3/WAV |
| タイトル | `/generate-titles` で候補生成 → 選択 | Plain text |
| 説明文（Shownote） | `/generate-shownote` で生成 | Plain text |
| チャプター | `/generate-chapters` で生成 | HH:MM:SS + タイトル |
| 広告挿入ポイント | Shownote/チャプター生成時にサジェスト | タイムスタンプ |

## Art19 入力フィールド

### Episode Details
- **Title**: エピソードタイトル（`{N}. {Topic1} / {Topic2} / {Topic3}` 形式）
- **Description**: Shownote テキストをそのまま貼り付け
- **Episode Type**: Full
- **Season**: 設定なし（シーズン分けなし）

### Audio
- **Audio File**: 編集済み音源をアップロード

### Chapters（チャプターマーカー）
- タイムスタンプ + チャプタータイトルを入力
- フォーマット: `HH:MM:SS チャプタータイトル`

### Ad Insertion（広告挿入）
- 広告ポイントのタイムスタンプを設定
- 通常 2-3 箇所

## アップロード手順

1. Art19 ダッシュボードにログイン
2. momit.fm の番組ページを開く
3. 「New Episode」を選択
4. 音源ファイルをアップロード
5. `/prepare-episode N` の出力から各フィールドにコピペ:
   - タイトル → Title
   - Shownote → Description
   - チャプター → Chapters
   - 広告ポイント → Ad markers
6. プレビューで確認
7. 公開（Publish）

## 公開後の自動処理

Art19 で公開すると RSS フィードが更新され、以下が自動実行される:
- GitHub Actions (rss-monitor.yml) が RSS 変更を検知
- Vercel にデプロイ webhook を送信 → momit.fm サイト更新
- generate-announcement ワークフローをトリガー → announcement.txt 生成
