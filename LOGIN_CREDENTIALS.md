# Login Credentials Configuration

## Default Login Credentials

Your test suite is now configured with the following credentials:

```
Country Code: 91 (India)
Phone Number: 9347372054
Default OTP: 123456
```

These credentials are stored in `test-config.js` and are used throughout all tests.

---

## How Login Steps Work

### In `steps.txt` (Human-Readable Format)

```
# PHASE 0 — Login with Credentials
Load homepage
Enter phone with country code 91 9347372054
Click button containing "Send OTP"
Wait 2000
Enter OTP 123456
Click button containing "Verify"
Wait 2000
Take full-page screenshot
```

### In CommentEngine (Automated)

The `comment-engine.helper.js` file contains handlers that:

1. **Parse the step**: Extract phone number and country code
2. **Find input fields**: Locate phone/country code inputs on the page
3. **Fill values**: Enter your credentials
4. **Click buttons**: Find and click "Send OTP", "Verify", etc.
5. **Enter OTP**: Fill in the OTP code (default: 123456)
6. **Verify login**: Take screenshot or continue to next step

---

## Configuration File

### `test-config.js` - Main Configuration

```javascript
module.exports = {
  login: {
    countryCode: '91',
    phone: '9347372054',
    otp: '123456',
  },
  // ... more config options
};
```

**To change credentials:**

```javascript
// Edit test-config.js
module.exports = {
  login: {
    countryCode: '91',        // Change country code
    phone: '9876543210',      // Change phone number
    otp: '654321',            // Change OTP
  },
};
```

Then your tests will automatically use the new credentials.

---

## Supported Login Patterns

### Pattern 1: Full Login with Country Code
```
Enter phone with country code 91 9347372054
```
- ✅ Automatically finds country code selector
- ✅ Fills country code: 91
- ✅ Fills phone number: 9347372054

### Pattern 2: Simple Phone Entry
```
Enter phone 9347372054
```
- ✅ Fills just the phone number
- ❌ Does NOT fill country code

### Pattern 3: OTP Entry
```
Enter OTP 123456
```
- ✅ Finds OTP input field
- ✅ Fills the OTP code

### Pattern 4: Default Login (Uses Config)
```
Login
```
or
```
Default Login
```
or
```
Login with default credentials
```
- ✅ Uses credentials from `test-config.js`
- ✅ Automatically selects country code
- ✅ Automatically fills phone
- ✅ No need to specify numbers

### Pattern 5: Click Buttons
```
Click button containing "Send OTP"
Click button containing "Verify"
```
- ✅ Finds buttons by partial text match
- ✅ Case-insensitive
- ✅ Works with different button labels

---

## How to Use in Your Tests

### Option 1: Use Default Credentials
Just use the default login pattern:

```
# steps.txt
Enter phone with country code 91 9347372054
Click button containing "Send OTP"
Wait 2000
Enter OTP 123456
Click button containing "Verify"
```

### Option 2: Override Credentials in Steps
Manually specify different credentials:

```
# steps.txt
Enter phone with country code 91 9876543210
Click button containing "Send OTP"
Wait 2000
Enter OTP 654321
Click button containing "Verify"
```

### Option 3: Update Config File
Edit `test-config.js` to change defaults for all tests:

```javascript
// test-config.js
login: {
  countryCode: '91',
  phone: '9876543210',  // Changed
  otp: '654321',        // Changed
}
```

---

## Test Execution Examples

### Run Login Only
```bash
STEP_FROM=1 STEP_TO=8 npm run test:headed
```

### Run Login Then Marketplace
```bash
STEP_FROM=1 STEP_TO=30 npm run test:headed
```

### Run Full Test Suite (With Login)
```bash
npm run test:headed
```

### Run Login Headless (No Browser Window)
```bash
STEP_FROM=1 STEP_TO=8 npx playwright test tests/comment-engine.spec.js
```

---

## Handler Implementation Details

### Location: `tests/comment-engine.helper.js`

#### Handler 1: Enter Phone with Country Code
```javascript
m = line.match(/^enter phone with country code\s*(\d+)?\s*(\d+)?$/i);
if (m) {
  const countryCode = m[1] || config.login.countryCode;
  const phone = m[2] || config.login.phone;
  // ... finds and fills country code selector
  // ... finds and fills phone input
  console.log(`✓ Entered phone: +${countryCode} ${phone}`);
}
```

#### Handler 2: Click Button Containing
```javascript
m = line.match(/^click button containing\s+"(.+)"$/i);
if (m) {
  const text = m[1];
  const button = this.page.locator(`button:has-text("${text}")`).first();
  if (await button.count()) {
    await button.click();
    console.log(`✓ Clicked button containing "${text}"`);
  }
}
```

#### Handler 3: Enter OTP
```javascript
m = line.match(/^enter otp\s+(\d+)?$/i);
if (m) {
  const otp = m[1] || config.login.otp;
  // ... finds OTP input
  // ... fills OTP value
  console.log(`✓ Entered OTP: ${otp}`);
}
```

---

## Troubleshooting

### "Could not find phone input field"
**Cause**: The page doesn't have a visible phone input on page load

**Solution**:
1. Add a wait before entering phone:
   ```
   Wait 2000
   Enter phone with country code 91 9347372054
   ```
2. Check if login page URL is correct in steps.txt
3. Inspect page source to find actual input selector

### "Could not find button containing 'Send OTP'"
**Cause**: Button has different text or is not visible

**Solution**:
1. Inspect the actual button text on the page
2. Update steps.txt with correct button text:
   ```
   Click button containing "Request OTP"  # If button says "Request OTP"
   ```
3. Or click by ID/selector instead:
   ```
   Click "#sendOtpBtn"
   ```

### OTP Not Being Entered
**Cause**: Multiple text inputs exist and wrong one is selected

**Solution**:
1. Add screenshot before OTP step:
   ```
   Take full-page screenshot
   Enter OTP 123456
   ```
2. Inspect which input actually needs the OTP
3. Consider adding a label/placeholder hint:
   ```
   Wait for "OTP"
   Enter OTP 123456
   ```

### Login Steps Pass But Not Logged In
**Cause**: Page load/redirect after OTP might not be complete

**Solution**:
1. Add longer wait after "Click button containing 'Verify'":
   ```
   Click button containing "Verify"
   Wait 5000
   Take full-page screenshot
   ```
2. Add URL expectation:
   ```
   Expect URL contains "/dashboard"
   ```

---

## Production Usage

### Step 1: Change Credentials
Edit `test-config.js`:
```javascript
login: {
  countryCode: '91',
  phone: 'YOUR_ACTUAL_NUMBER',
  otp: 'YOUR_OTP_OR_LOGIC',
}
```

### Step 2: Update Steps (Optional)
If using production numbers in steps.txt:
```
Enter phone with country code 91 YOUR_ACTUAL_NUMBER
```

### Step 3: Run Tests
```bash
npm run test:headed
```

### Step 4: Monitor Output
```
✓ Entered phone: +91 YOUR_ACTUAL_NUMBER
✓ Clicked button containing "Send OTP"
✓ Entered OTP: 123456
✓ Clicked button containing "Verify"
```

---

## Notes

- Credentials are **NOT** committed to version control (add to `.gitignore` if needed)
- OTP validation logic depends on backend implementation
- Some tests may use hardcoded test OTPs (e.g., '123456' for local dev)
- For CI/CD, consider using environment variables:
  ```javascript
  login: {
    countryCode: process.env.LOGIN_COUNTRY_CODE || '91',
    phone: process.env.LOGIN_PHONE || '9347372054',
    otp: process.env.LOGIN_OTP || '123456',
  }
  ```

---

## Quick Reference

| Task | Command |
|------|---------|
| Run login test | `STEP_FROM=1 STEP_TO=8 npm run test:headed` |
| Change phone number | Edit `test-config.js` line 5 |
| Change country code | Edit `test-config.js` line 4 |
| Change OTP | Edit `test-config.js` line 6 |
| Run headless | `STEP_FROM=1 STEP_TO=8 npx playwright test tests/comment-engine.spec.js` |
| View test report | `npm run test:report` |
| Debug with DevTools | `PWDEBUG=1 STEP_FROM=1 STEP_TO=8 npm run test:headed` |

---

**Last Updated**: November 19, 2025  
**Credentials**: 📞 +91 9347372054 | 🔐 OTP: 123456
