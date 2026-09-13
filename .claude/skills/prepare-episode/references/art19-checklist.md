# Art19 アップロードチェックリスト

Art19 にエピソードを手動アップロードする際の入力フィールドと手順。

---

## 必要な素材

| 素材 | 生成元 | フォーマット |
|---|---|---|
| 音源ファイル | Riverside.fm で編集・エクスポート（`edit-riverside` スキル）。**再エンコードしない** | MP3/WAV |
| タイトル | `/generate-titles` で候補生成 → 選択 | Plain text |
| 説明文（Shownote） | `/generate-shownote` で生成 | Plain text |
| 広告挿入ポイント | `/generate-chapters` がスケール済み音声時間でサジェスト（既定は音源の中点） | タイムスタンプ |
| アフィリエイトリンク | `/generate-shownote` が商品を検出 → `affiliate-links` スキルが発行 | `tag=momitfm-site-22` 付き URL。PR 表記はサイトのフッター側 |

## Art19 入力フィールド

### Episode Details
- **Title**: エピソードタイトル（`{N}. {Topic1} / {Topic2} / {Topic3}` 形式）
- **Description**: Shownote テキストをそのまま貼り付け
- **Episode Type**: Full
- **Season**: 設定なし（シーズン分けなし）

### Audio
- **Audio File**: 編集済み音源をアップロード。**ビットレートを下げない** — Art19 は納品ファイルに関係なく 128 kbps で配信する（ep97-101 で検証、2026-09）。下げると Art19 の再エンコード前に劣化を 1 回足すだけで、リスナーの音質が落ちる

### Chapters（チャプターマーカー） — **Art19 に存在しない**
Art19 はネイティブのチャプター機能を提供していない（[公式 FAQ](https://art19.zendesk.com/hc/en-us/articles/40885686831501-Does-ART19-support-Chapters)）。New Marker のメニューは `Ad Insertion Point` と `Embedded Ad` の 2 種類のみ。momit.fm の RSS にもチャプター要素は 1 件も存在しない（全 100 回で `psc:chapter` / `podcast:chapters` / `chaptersUrl` すべて 0 件、2026-09 確認）。

公式の代替は「説明文にプレーンテキストのタイムコードを書く」方式だが、**momit.fm では採用しない**。ダイナミック広告挿入を使っているため、タイムコードは広告なしの尺を指し、リスナー側の再生位置は挿入された広告の分だけ後ろにズレる。Pre/Mid/Post の 3 枠 × 最大 120 秒なので、ズレは数分に達しうる。広告尺は動的で、事前補正もできない。

`generate-chapters` は配信用ではなく、ショーノートの構成把握と広告ポイント選定のための**内部用**として残している。

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
   - 広告ポイント → Ad markers
6. プレビューで確認
7. 公開（Publish）

## 公開後の自動処理

Art19 で公開すると RSS フィードが更新され、以下が自動実行される:
- GitHub Actions (rss-monitor.yml) が RSS 変更を検知
- Vercel にデプロイ webhook を送信 → momit.fm サイト更新
- generate-announcement ワークフローをトリガー → announcement.txt 生成
