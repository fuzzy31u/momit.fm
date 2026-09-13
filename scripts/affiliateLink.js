/**
 * Amazon アソシエイトのアフィリエイトリンク生成（momit.fm 用・API 不要）。
 *
 * PA-API 5.0 は廃止済み、後継の Creators API は審査制のため、
 * 手動指定の ASIN / 検索キーワードからタグ付き URL を組み立てる。
 *
 * トラッキング ID は momit.fm 専用の `momitfm-site-22`。
 * hub.momit.fm は別 ID (`momithub-22`) を使うので取り違えないこと。
 */

const TRACKING_ID = 'momitfm-site-22';
const AMAZON_BASE = 'https://www.amazon.co.jp';
const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

/** ASIN からタグ付きの商品 URL を生成する。 */
function buildProductUrl(asin, tag = TRACKING_ID) {
  const normalized = String(asin || '').trim().toUpperCase();
  if (!ASIN_PATTERN.test(normalized)) {
    throw new Error(`不正な ASIN です（10 桁の英数字が必要）: ${JSON.stringify(asin)}`);
  }
  return `${AMAZON_BASE}/dp/${normalized}?tag=${tag}`;
}

/**
 * 検索キーワードからタグ付きの検索 URL を生成する。
 * クエリ（k=）が既にあるため tag は ? ではなく & で付与する。
 */
function buildSearchUrl(query, tag = TRACKING_ID) {
  const normalized = String(query || '').trim();
  if (!normalized) {
    throw new Error('検索キーワードが空です');
  }
  const encoded = encodeURIComponent(normalized).replace(/%20/g, '+');
  return `${AMAZON_BASE}/s?k=${encoded}&tag=${tag}`;
}

/** 番組概要に貼るアンカー HTML を組み立てる。表示テキストには必ず（PR）を付ける。 */
function buildAnchorHtml(url, label) {
  const text = label.endsWith('（PR）') ? label : `${label}（PR）`;
  return `<a href="${url}" rel="noopener noreferrer" target="_blank"><strong>${text}</strong></a>`;
}

function usage() {
  console.error(`使い方:
  node scripts/affiliateLink.js search "検索キーワード" [表示テキスト]
  node scripts/affiliateLink.js product <ASIN> [表示テキスト]

表示テキストを渡すと、番組概要に貼るアンカー HTML も出力する。
トラッキング ID: ${TRACKING_ID}`);
}

function main() {
  const [mode, value, label] = process.argv.slice(2);
  if (!mode || !value) {
    usage();
    process.exit(1);
  }

  let url;
  try {
    if (mode === 'search') {
      url = buildSearchUrl(value);
    } else if (mode === 'product') {
      url = buildProductUrl(value);
    } else {
      usage();
      process.exit(1);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(url);
  if (label) {
    console.log(buildAnchorHtml(url, label));
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  TRACKING_ID,
  AMAZON_BASE,
  buildProductUrl,
  buildSearchUrl,
  buildAnchorHtml,
};
