---
name: affiliate-links
description: Issue Amazon アソシエイト links for momit.fm episode descriptions using the site's tracking ID (momitfm-site-22). Use when an episode recommends books, manga, gadgets or services, or when the user says "アフィリエイトリンク", "affiliate link".
---

You are issuing Amazon アソシエイト links for a momit.fm episode description.

## Tracking ID

**`momitfm-site-22`**

Issue every link under this ID. Never reuse a link copied from somewhere else — re-issue it here.

## Generating a link

Always go through `scripts/affiliateLink.js`. Never hand-build a URL — the `?`/`&` separator differs between product and search links, and typing the tag by hand is how the wrong ID gets in.

```bash
# 検索リンク（既定）
node scripts/affiliateLink.js search "つかめ 理科ダマン" "つかめ！理科ダマン"

# 商品リンク（ASIN を実際に確認できたときだけ）
node scripts/affiliateLink.js product 4023318035 "アレルギーのサバイバル 1"
```

Passing a display label also prints the anchor HTML, with the label and URL HTML-escaped.

## Choosing search vs product

- **検索リンクを既定にする.** Most things the show recommends are multi-volume series (漫画・学習まんが), where pointing at one arbitrary volume is worse than a search.
- **ASIN 直リンクは、単巻の書籍やガジェットで ASIN を実際に確認できた場合のみ.** Never invent an ASIN — a wrong one is a live link to the wrong product.

## Verify the product name before issuing

The transcript comes from Riverside's Japanese ASR, which mangles proper nouns. A wrong keyword makes the link useless, so confirm the real name first. Actual misses from ep101:

- 「理科だマン」→ **「つかめ！理科ダマン」**（マガジンハウス）
- 「サバイバルシリーズ」→ **「科学漫画サバイバルシリーズ」**（朝日新聞出版）

## Disclosure

The Amazon Associates statement lives on the site's main page — `components/Footer.tsx`, in Amazon's own required wording ([Amazon ヘルプ](https://affiliate.amazon.co.jp/help/node/topic/GHQNZAU6669EZS98)):

```
Amazonのアソシエイトとして、momit.fm は適格販売により収入を得ています。
```

**Episode descriptions carry no disclosure text** — no `（PR）` on link labels, no summary line under the topic list. This is the show owner's standing decision; do not re-add it.

## What to link

Link the **concrete products the hosts actually recommended** — books, manga, gadgets, services. Skip passing mentions and small talk. In the description, the topic heading becomes the anchor:

```html
<p>🧪 <a href="https://www.amazon.co.jp/s?k=...&amp;tag=momitfm-site-22" rel="noopener noreferrer" target="_blank"><strong>Dr.STONE は圧倒的1位</strong></a> – 説明文</p>
```

The `&amp;` is what `buildAnchorHtml` emits — paste its output as-is rather than re-escaping or un-escaping by hand.

## Before handing off

Check every affiliate anchor carries `tag=momitfm-site-22`. `upload-art19` asserts the same thing from the editor DOM after setting the description.
