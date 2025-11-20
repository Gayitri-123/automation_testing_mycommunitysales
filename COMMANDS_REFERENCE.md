# 🎯 Test Commands Reference

## Fastest Commands (Copy & Paste)

### Login Test (15 seconds)
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

### Login + Marketplace (1 minute)
```bash
STEP_FROM=1 STEP_TO=35 npm run test:headed
```

### Full Suite (3-5 minutes)
```bash
npm run test:headed
```

---

## All Available npm Scripts

```bash
# Run full test suite with browser visible
npm run test:headed

# Run full test suite headless
npm test

# Run just first 10 steps (smoke test)
npm run test:smoke

# Run marketplace workflow
npm run test:marketplace

# View HTML report
npm run test:report

# List all steps and coverage
npm run test:steps

# Interactive test runner menu
npm run test:interactive
```

---

## Point-to-Point Testing

Run ANY range of steps using `STEP_FROM` and `STEP_TO`:

```bash
# Steps 1-8 (login only)
STEP_FROM=1 STEP_TO=8 npm run test:headed

# Steps 1-17 (login + homepage)
STEP_FROM=1 STEP_TO=17 npm run test:headed

# Steps 18-35 (marketplace)
STEP_FROM=18 STEP_TO=35 npm run test:headed

# Step 5 only (enter OTP)
STEP_FROM=5 STEP_TO=5 npm run test:headed

# All steps starting from 10
STEP_FROM=10 npx playwright test tests/comment-engine.spec.js --headed

# Only steps matching "search"
STEP_MATCH=search npm run test:headed
```

---

## Advanced Options

### Debug with Browser DevTools
```bash
PWDEBUG=1 STEP_FROM=1 STEP_TO=8 npm run test:headed
```

### Run Headless (No Browser)
```bash
STEP_FROM=1 STEP_TO=8 npx playwright test tests/comment-engine.spec.js
```

### Longer Timeout
```bash
npx playwright test --timeout=180000 --headed STEP_FROM=1 STEP_TO=8
```

### Single Worker (More Stable)
```bash
STEP_FROM=1 STEP_TO=8 npx playwright test tests/comment-engine.spec.js --headed --workers=1
```

### With Video Recording
```bash
STEP_FROM=1 STEP_TO=8 npx playwright test tests/comment-engine.spec.js --headed --video=on
```

---

## Change Credentials

### Option 1: Edit Config File
```bash
nano test-config.js
# Edit: phone: '9876543210' (line 5)
# Edit: otp: '654321' (line 6)
# Save (Ctrl+X, Y, Enter)
```

### Option 2: Environment Variables
```bash
export LOGIN_PHONE=9876543210
export LOGIN_OTP=654321
npm run test:headed
```

---

## View Results

```bash
# View test report (opens in browser)
npm run test:report

# View screenshots
ls screenshots/

# View videos
ls test-results/

# View all artifacts
ls -la test-results/
```

---

## Test Specific Features

### Just Login
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

### Just Homepage Checks
```bash
STEP_FROM=9 STEP_TO=17 npm run test:headed
```

### Just Navigation
```bash
STEP_FROM=18 STEP_TO=20 npm run test:headed
```

### Just Marketplace Search
```bash
STEP_FROM=21 STEP_TO=30 npm run test:headed
```

### Just Cart
```bash
STEP_FROM=31 STEP_TO=35 npm run test:headed
```

---

## Custom Workflows

### Morning Smoke Test
```bash
npm run test:smoke
```

### Marketplace Validation
```bash
npm run test:marketplace
```

### Full Regression
```bash
npm run test:headed
```

### Interactive Menu
```bash
npm run test:interactive
```

---

## Troubleshooting Commands

### See All Steps
```bash
npm run test:steps
```

### See Coverage Stats
```bash
npm run test:steps | tail -20
```

### Check Test Output
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed 2>&1 | tail -50
```

### List Screenshots
```bash
ls -1 screenshots/ | head -20
```

### Clean Up Old Results
```bash
rm -rf test-results/
rm -rf screenshots/
rm -rf playwright-report/
```

---

## Key Credentials

```bash
Country Code: 91
Phone: 9347372054
OTP: 123456
Base URL: https://mycommunitysales.com
```

To change: Edit `test-config.js` or set environment variables

---

## Test Coverage

```bash
138 total steps ✅
100% coverage ✅
All phases working ✅
Ready for production ✅
```

---

## Common Issues & Fixes

### Button Not Found
```bash
# Edit steps.txt with correct button text
nano steps.txt
# Change: Click button containing "Actual Button Text"
```

### OTP Input Not Found
```bash
# Add wait before OTP step
Wait 2000
Enter OTP 123456
```

### Page Timeout
```bash
# Use longer timeout
npx playwright test --timeout=180000 --headed
```

### Need Visual Debugging
```bash
# Open browser DevTools
PWDEBUG=1 STEP_FROM=1 STEP_TO=8 npm run test:headed
```

---

## Quick Reference Table

| Task | Command | Time |
|------|---------|------|
| Run login | `STEP_FROM=1 STEP_TO=8 npm run test:headed` | 15s |
| Run marketplace | `STEP_FROM=18 STEP_TO=35 npm run test:headed` | 30s |
| Run smoke test | `npm run test:smoke` | 1m |
| Run full suite | `npm run test:headed` | 3-5m |
| View report | `npm run test:report` | instant |
| List steps | `npm run test:steps` | 2s |
| Debug mode | `PWDEBUG=1 STEP_FROM=1 STEP_TO=8 npm run test:headed` | 15s |

---

## One-Liners

```bash
# Quick login test
STEP_FROM=1 STEP_TO=8 npm run test:headed

# Full test
npm run test:headed

# See what works
npm run test:steps | grep "✅"

# View report
npm run test:report

# Clean and rerun
rm -rf test-results/ && npm run test:smoke

# Debug specific step
STEP_FROM=2 STEP_TO=2 PWDEBUG=1 npm run test:headed
```

---

## Directory Structure

```
mycommunitysales-regression-test/
├── test-config.js              # Credentials config
├── steps.txt                   # Test steps
├── tests/
│   ├── comment-engine.spec.js # Test runner
│   ├── comment-engine.helper.js # Handlers
│   └── regression.spec.js      # Original tests
├── screenshots/                # Auto-captured
├── test-results/               # Videos, etc
├── playwright-report/          # HTML reports
└── Documentation/
    ├── LOGIN_CREDENTIALS.md
    ├── QUICK_START_LOGIN.md
    ├── TESTING_GUIDE.md
    └── README_TESTS.md
```

---

## Tips

1. **Always use --headed** to see browser behavior
2. **Use --workers=1** for stability in headed mode
3. **Add PWDEBUG=1** to debug selector issues
4. **Check screenshots** before investigating failures
5. **Update steps.txt** with actual button/input text from page
6. **Use STEP_FROM/TO** to run specific ranges
7. **Run smoke test first** to validate setup

---

Last Updated: November 19, 2025
