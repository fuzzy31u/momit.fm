# ValueCommerce Agent

Automates ValueCommerce MyLinkBox creation for hub.momit.fm articles via Claude Code.

## Usage

Ask Claude Code:
```
Check https://hub.momit.fm/post-XXX/ and create a ValueCommerce MyLinkBox if needed
```

Claude will:
1. Navigate to the article and check if it has VC links
2. Extract product information from the article
3. Open ValueCommerce login (you login manually)
4. Guide you through MyLinkBox creation step-by-step

**Why this approach?** No passwords stored, works with 2FA, secure manual login.

## How It Works

Claude Code uses Playwright MCP to:
1. Check article for existing MyLinkBox widgets
2. Extract product names from Amazon links in the article
3. Open ValueCommerce login page (you login manually)
4. Fill MyLinkBox creation form with product info
5. Guide you through product selection and submission

## Important Notes

### Form Field Rules
When creating MyLinkBox, fill fields as follows:
- **MyLinkBox名**: `{category}_{product}` (e.g., "海外渡航グッズ_パスポートカバー")
- **キーワード**: Exact product name from article (e.g., "スーパーマリオ パスポートカバー")
- **タイトル**: **SAME as キーワード** (must be identical!)

### Product Extraction
- Agent extracts specific product names from Amazon/affiliate links in article
- Use product name (not article title) for search keyword
- Example: Article about UM travel → Product: "スーパーマリオ パスポートカバー（マリオキャラクターズ）"

### Technical Details
- Requires Claude Code with Playwright MCP
- Uses manual login (no credentials stored)
- Screenshots saved to ~/Downloads/ for reference
- Browser stays open until user completes manual steps
