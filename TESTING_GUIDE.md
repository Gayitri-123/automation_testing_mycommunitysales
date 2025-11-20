# MyCommunitySales Regression Test Suite - Quick Start Guide

## Overview
Your website testing suite is fully operational with **39 of 130 steps** (30.0% coverage) working end-to-end with browser automation.

## How to Run Tests

### Run All Steps (Full Test)
```bash
npx playwright test tests/comment-engine.spec.js --headed
```

### Run Tests Point-to-Point (Specific Lines)

#### Run a single step (line 12)
```bash
STEP_FROM=12 STEP_TO=12 npx playwright test tests/comment-engine.spec.js --headed
```

#### Run a range of steps (lines 5-25)
```bash
STEP_FROM=5 STEP_TO=25 npx playwright test tests/comment-engine.spec.js --headed
```

#### Run steps matching a keyword (e.g., "cart")
```bash
STEP_MATCH=cart npx playwright test tests/comment-engine.spec.js --headed
```

#### Run headless (no browser window)
```bash
STEP_FROM=10 STEP_TO=20 npx playwright test tests/comment-engine.spec.js
```

## View Available Steps
List all steps with their current support status:
```bash
node list-steps.js
```

Output shows:
- ✅ **Known/Working** steps (automated)
- ❌ **Unknown/Not Yet Implemented** steps
- **Coverage %** and summary

## Currently Supported Step Types

### Navigation & Checks (10 steps)
- `Load homepage` - Opens site and checks HTTP 200 status
- `Check page load time` - Measures DOM and load timings
- `Confirm no JavaScript console errors` - Scans for JS errors
- `Check missing CSS/JS resources` - Finds 404/500 resources
- `Click each menu item` - Iterates through all navigation links
- `Check broken images` - Validates image loads
- `Check broken links` - HTTP checks first 50 links
- `Take full-page screenshot` - Captures screenshot to disk
- `Open /path` - Navigate to any URL path
- `Wait [milliseconds]` - Pause execution

### Marketplace Operations (9 steps)
- `Search for "teddy bear"` - Search marketplace items
- `Click on first item` - Opens first marketplace item
- `Click on item image` - Views item image/carousel
- `Iterate through items` - Visits first 3 marketplace items
- `Apply price filter` - Applies price range filter
- `Sort items` - Sorts marketplace results
- `Add to cart` - Adds item to shopping cart
- `Remove from cart` - Removes item from cart
- `Go to cart page` - Navigate to `/cart`

### Forms & Listings (8 steps)
- `Submit form` - Submits any form on page
- `Submit empty form` - Submits without filling fields
- `Create listing` - Navigate to listing creation page
- `Upload images` - Detects file upload input
- `Enter details` - Fills listing description field
- `Submit listing` - Submits new listing
- `Validate listing appears` - Checks listing on page
- `Validate success` - Checks for success message

### Vendor & Community (4 steps)
- `Load vendor list` - Navigate to vendor listing
- `Open a vendor` - Clicks on a vendor detail page
- `Submit comment` - Fills and submits vendor comment
- `Click notify group` - Triggers group notification

### Input & Interactions (8 steps)
- `Enter phone [number]` - Fills phone input (e.g., `Enter phone 9347372054`)
- `Enter OTP [code]` - Fills OTP input (e.g., `Enter OTP 123456`)
- `Click "[button name]"` - Clicks button by text
- `Type "[text]" into "[field]"` - Types into field
- `Fill "[field]" with "[value]"` - Fills input field
- `Expect page to contain "[text]"` - Asserts text visible
- `Expect URL contains "[fragment]"` - Asserts URL pattern
- `Wait for "[text]"` - Waits for element to appear

## Example Test Runs

### Complete Marketplace + Cart Journey
```bash
# Search for item, view it, check cart
STEP_FROM=10 STEP_TO=35 npx playwright test tests/comment-engine.spec.js --headed
```
This runs:
- 10. Marketplace page load
- 12. Search "teddy bear"
- 15. Iterate items
- 17. Click first item
- 19. View item image
- 21. Navigate to cart
- 32-35. Cart operations

### Navigation & Link Checking Only
```bash
# Homepage, menus, broken links
STEP_FROM=1 STEP_TO=9 npx playwright test tests/comment-engine.spec.js --headed
```

### Just a Single Step
```bash
# Screenshot only
STEP_FROM=6 STEP_TO=6 npx playwright test tests/comment-engine.spec.js --headed
```

## View Test Artifacts

### HTML Report
```bash
npx playwright show-report
```
Opens Playwright HTML report in browser showing:
- Test execution timeline
- Screenshots
- Video recording
- Error logs

### Screenshots
Located in: `screenshots/`
- `full_page.png` - Homepage screenshot
- `menu_*.png` - Menu/navigation screenshots

### Video Recordings
Located in: `test-results/`
- Automatic video capture of test execution
- Useful for debugging failures

## Step Coverage Status

| Category | Count | Status |
|----------|-------|--------|
| Homepage & Navigation | 10 | ✅ Working |
| Marketplace | 9 | ✅ Working |
| Cart & Checkout | 4 | ✅ Working (partial) |
| Forms & Listings | 8 | ✅ Working |
| Vendor & Community | 4 | ✅ Working |
| Input & Interactions | 8 | ✅ Working |
| **Total Working** | **39/130** | **30.0%** |
| Not Yet Implemented | 91 | ❌ Pending |

## Not Yet Implemented Features (Pending)

These steps currently return warnings but are recognized:
- Image carousel test
- Seller info test
- Description load
- Add same item twice
- Create/Edit/Delete listing (full flow)
- Groups/Community posting
- API testing (OTP generation, listing creation API, etc.)
- Performance (Lighthouse, load time targets)
- Cross-browser/device testing
- Security (XSS, SQL injection, CSRF)
- Post-deployment checks

## Environment Variables

Control test execution with:
- `STEP_FROM=N` - Start from line N (1-based)
- `STEP_TO=N` - End at line N (1-based)
- `STEP_MATCH=text` - Run only lines containing "text" (case-insensitive)

Examples:
```bash
# All 3 together
STEP_FROM=5 STEP_TO=15 STEP_MATCH=marketplace npx playwright test tests/comment-engine.spec.js

# Combined with other Playwright options
STEP_FROM=1 STEP_TO=20 npx playwright test tests/comment-engine.spec.js --workers=1 --timeout=120000
```

## Tips & Tricks

1. **Debug a specific step**
   ```bash
   # Run just that step and watch in headed mode
   STEP_FROM=17 STEP_TO=17 npx playwright test tests/comment-engine.spec.js --headed
   ```

2. **Quick smoke test (first 10 steps)**
   ```bash
   STEP_TO=10 npx playwright test tests/comment-engine.spec.js --headed
   ```

3. **Full test with extended timeout**
   ```bash
   npx playwright test tests/comment-engine.spec.js --headed --timeout=180000
   ```

4. **Run in debug/pause mode**
   ```bash
   PWDEBUG=1 npx playwright test tests/comment-engine.spec.js --headed
   ```

## Extending the Test Suite

To add support for new steps:

1. Edit `tests/comment-engine.helper.js` - Add a new handler in the `runLine()` method
2. Example pattern:
   ```javascript
   m = line.match(/^my new command$/i);
   if (m) {
     // your automation here
     console.log(`✓ Executed my new command`);
     return;
   }
   ```

3. Update `list-steps.js` - Add regex pattern to `knownPatterns` array

4. Update `steps.txt` - Add your new step command

## Support Matrix

| Browser | Status | Command |
|---------|--------|---------|
| Chromium | ✅ Supported | (default) |
| Firefox | ⏳ Supported | (via Playwright) |
| WebKit | ⏳ Supported | (via Playwright) |

## Troubleshooting

**Test hangs on a step**
→ Check if the page element exists; adjust timeout or add explicit wait

**Screenshot not created**
→ Ensure `screenshots/` directory exists (auto-created) or check disk space

**Element not found**
→ Run in headed mode to visually inspect; adjust selector in helper.js

**Previous test artifacts in the way**
→ Clear: `rm -rf test-results/ screenshots/ playwright-report/`

---

**Last Updated:** November 18, 2025  
**Coverage:** 39/130 steps (30.0%)  
**Command:** `node list-steps.js` to view all steps and their status
