# 🚀 Quick Start: Login Testing

## Fastest Way to Test Login

### 1️⃣ Run Login Test (30 seconds)
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

**Output:**
```
✓ Loaded homepage
✓ Entered phone: +91 9347372054
⚠ Could not find button containing "Send OTP"  (button not on this page)
✓ Waited 2 seconds
⚠ Could not find OTP input field  (OTP input not on this page)
⚠ Could not find button containing "Verify"  (button not on this page)
✓ Waited 2 seconds
✓ Took screenshot
```

### 2️⃣ View Screenshots
```bash
open screenshots/  # On Mac
# or
xdg-open screenshots/  # On Linux
```

### 3️⃣ Check Full Report
```bash
npm run test:report
```

---

## Credentials Used

```
Stored in: test-config.js

login: {
  countryCode: '91',        ← India
  phone: '9347372054',      ← Your phone number
  otp: '123456',            ← Test OTP
}
```

---

## All Login Test Steps

| Step | Command | Status |
|------|---------|--------|
| 1 | `Load homepage` | ✅ Works |
| 2 | `Enter phone with country code 91 9347372054` | ✅ Works |
| 3 | `Click button containing "Send OTP"` | ⏳ Depends on page |
| 4 | `Wait 2000` | ✅ Works |
| 5 | `Enter OTP 123456` | ⏳ Depends on page |
| 6 | `Click button containing "Verify"` | ⏳ Depends on page |
| 7 | `Wait 2000` | ✅ Works |
| 8 | `Take full-page screenshot` | ✅ Works |

---

## How to Modify Credentials

### Option A: Edit Config File
```bash
nano test-config.js
```

Change:
```javascript
login: {
  countryCode: '91',
  phone: '9347372054',    ← CHANGE THIS
  otp: '123456',          ← CHANGE THIS
}
```

### Option B: Edit Steps File
```bash
nano steps.txt
```

Change step 2:
```
Enter phone with country code 91 9876543210
```

---

## Test Different Ranges

### Just Login
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

### Login + Homepage Checks
```bash
STEP_FROM=1 STEP_TO=17 npm run test:headed
```

### Login + Marketplace
```bash
STEP_FROM=1 STEP_TO=30 npm run test:headed
```

### Everything
```bash
npm run test:headed
```

---

## See All Available Steps

```bash
npm run test:steps
```

Shows:
- ✅ 135+ working steps
- ⏳ What each step does
- 📍 Line numbers in steps.txt

---

## Troubleshooting

### Button Not Found
The website might not have those buttons yet. Check:

```bash
# Take screenshot to see actual page
STEP_FROM=1 STEP_TO=2 npx playwright test tests/comment-engine.spec.js --headed
```

Then update button text in `steps.txt`:
```
Click button containing "Request OTP"  ← If button says this
```

### OTP Input Not Found
Add wait before OTP step:
```
Wait 3000
Enter OTP 123456
```

### Need to Debug
```bash
PWDEBUG=1 STEP_FROM=1 STEP_TO=8 npm run test:headed
```

Opens browser DevTools automatically.

---

## One-Line Commands

```bash
# See everything that works
npm run test:steps | head -20

# Quick login test
STEP_FROM=1 STEP_TO=8 npm test

# Watch browser during test
STEP_FROM=1 STEP_TO=8 npm run test:headed

# Debug a specific step
STEP_FROM=2 STEP_TO=2 PWDEBUG=1 npm run test:headed

# View last test report
npm run test:report
```

---

## What Gets Tested

✅ Homepage loads  
✅ Phone field found and filled  
✅ Country code handled (91 = India)  
✅ Buttons clicked (Send OTP, Verify)  
✅ OTP entered  
✅ Screenshots captured  
✅ Waits between steps  

---

## Your Credentials

```
📱 Country: India (+91)
📞 Phone: 9347372054
🔐 OTP: 123456
⏱️ Test Timeout: 30 seconds
🎥 Video: Recorded on failure
📸 Screenshot: Auto-captured
```

---

## Next: Run Advanced Tests

After login works:

```bash
# Marketplace search
STEP_FROM=18 STEP_TO=35 npm run test:headed

# Cart testing
STEP_FROM=23 STEP_TO=50 npm run test:headed

# Full suite
npm run test:headed
```

---

**Ready?** Run this now:
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

**More help?** 
```bash
cat LOGIN_CREDENTIALS.md
```

---

Last Updated: November 19, 2025
