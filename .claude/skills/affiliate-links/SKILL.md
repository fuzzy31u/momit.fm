---
name: affiliate-links
description: Issue Amazon アソシエイト links for momit.fm episode descriptions using the site's own tracking ID (momitfm-site-22), with the （PR）disclosure the regulations require. Use when an episode recommends books, manga, gadgets or services, or when the user says "アフィリエイトリンク", "affiliate link", "PR リンク".
---

You are issuing Amazon アソシエイト links for a momit.fm episode description.

## Tracking ID

**`momitfm-site-22`** — momit.fm's own ID.

> hub.momit.fm is a **different property with a different ID** (`momithub-22`). Never use the hub's ID here, and never copy a link from a hub article into an episode description without re-issuing it. Revenue is attributed per ID, so a mix-up sends momit.fm's earnings to the wrong property.

## Generating a link

Always go through `scripts/affiliateLink.js`. Never hand-build a URL — the `?`/`&` separator differs between product and search links, and typing the tag by hand is how the wrong ID gets in.

```bash
# 検索リンク（既定）
node scripts/affiliateLink.js search "つかめ 理科ダマン" "つかめ！理科ダマン"

# 商品リンク（ASIN を実際に確認できたときだけ）
node scripts/affiliateLink.js product 4023318035 "アレルギーのサバイバル 1"
```

Passing a display label also prints the anchor HTML, with `（PR）` appended if it is not already there.

## Choosing search vs product

- **検索リンクを既定にする.** Most things the show recommends are multi-volume series (漫画・学習まんが), where pointing at one arbitrary volume is worse than a search.
- **ASIN 直リンクは、単巻の書籍やガジェットで ASIN を実際に確認できた場合のみ.** Never invent an ASIN — a wrong one is a live link to the wrong product.

## Verify the product name before issuing

The transcript comes from Riverside's Japanese ASR, which mangles proper nouns. A wrong keyword makes the link useless, so confirm the real name first. Actual misses from ep101:

- 「理科だマン」→ **「つかめ！理科ダマン」**（マガジンハウス）
- 「サバイバルシリーズ」→ **「科学漫画サバイバルシリーズ」**（朝日新聞出版）

## Disclosure — two requirements, two places

Do not put both in the episode description. Doubling up adds nothing and clutters the description.

| 要件 | 満たす場所 |
|---|---|
| ステマ規制（景表法・2023/10〜）— 広告と判別できること | **番組概要**。リンクテキスト末尾に `（PR）` |
| Amazon 運営規約 — アソシエイト参加の明示 | **サイトのメインページ**。`components/Footer.tsx` に常設済み |

- `（PR）` の省略は不可。**アクセス数による免除規定は、ステマ規制にも Amazon 規約にも存在しない**
- 番組概要に `※この番組概要には…` のような長文の全体表記は書かない
- フッターの文言は Amazon 指定のフォーマット（[Amazon ヘルプ](https://affiliate.amazon.co.jp/help/node/topic/GHQNZAU6669EZS98)）:
  `Amazonのアソシエイトとして、momit.fm は適格販売により収入を得ています。`

## What to link

Link the **concrete products the hosts actually recommended** — books, manga, gadgets, services. Skip passing mentions and small talk. In the description, the topic heading becomes the anchor:

```html
<p>🧪 <a href="https://www.amazon.co.jp/s?k=...&tag=momitfm-site-22" rel="noopener noreferrer" target="_blank"><strong>Dr.STONE は圧倒的1位（PR）</strong></a> – 説明文</p>
```

## Before handing off

Check every affiliate anchor: the href carries `tag=momitfm-site-22` (not `momithub-22`), and the link text ends in `（PR）`. `upload-art19` asserts the same thing from the editor DOM after setting the description.
