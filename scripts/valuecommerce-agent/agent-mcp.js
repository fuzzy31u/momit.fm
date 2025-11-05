/**
 * ValueCommerce Affiliate Agent (MCP Version)
 *
 * INSTRUCTIONS FOR CLAUDE CODE:
 *
 * When user asks to "Check <article-url> and create a ValueCommerce MyLinkBox if needed":
 *
 * 1. Check the article for ValueCommerce links
 *    - Navigate to article URL using mcp__playwright-mcp__playwright_navigate
 *    - Use mcp__playwright-mcp__playwright_evaluate to check:
 *      - ValueCommerce iframes: iframe[src*="valuecommerce"]
 *      - MyLinkBox divs: [data-vc_mylinkbox_id]
 *    - Extract article title from h1.entry-title
 *    - Extract product names from Amazon links
 *
 * 2. If article already has MyLinkBox widgets:
 *    - Report to user and close browser
 *
 * 3. If article is missing MyLinkBox:
 *    - Navigate to https://aff.valuecommerce.ne.jp/
 *    - Take screenshot and ask user to login manually
 *    - Wait for user confirmation
 *
 * 4. Navigate to MyLinkBox creation page:
 *    - Go to https://aff.valuecommerce.ne.jp/ad/myLinkBox/create
 *
 * 5. Fill the MyLinkBox form:
 *    - MyLinkBox名: "{category}_{product}" (e.g., "スマートリング_OuraRing")
 *    - キーワード: Exact product name from article
 *    - タイトル: SAME as キーワード (must be identical!)
 *
 * 6. Guide user to complete:
 *    - Search for products
 *    - Select matching products
 *    - Choose design/layout
 *    - Submit form
 *
 * 7. Close browser when done
 *    - Use mcp__playwright-mcp__playwright_close
 */
