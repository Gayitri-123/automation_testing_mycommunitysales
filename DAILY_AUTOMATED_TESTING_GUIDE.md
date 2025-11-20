# 🤖 MYCOMMUNITYSALES DAILY AUTOMATED TESTING SETUP

## ✅ Status: CONFIGURED AND READY

Your website will now be tested **automatically every day at 2:00 AM** without any manual work!

---

## 🎯 What Gets Tested Daily

### ✅ Automated Test Coverage (34 Phases)

**Section 1: Login Workflow** (6 phases)
- ✅ Navigate to login page
- ✅ Enter phone number: +91 9347372054 (AUTOMATIC)
- ✅ Send OTP (AUTOMATIC)
- ✅ Enter OTP: 123456 (AUTOMATIC)
- ✅ Click Verify & Sign In (AUTOMATIC)
- ✅ Verify login success

**Section 2: MyCommunitySales Navigation** (3 phases)
- ✅ Click MyCommunitySales navbar link
- ✅ Verify group page loads
- ✅ View full MyCommunitySales page

**Section 3: Create New Listing** (3 phases)
- ✅ Click Create button
- ✅ Verify listing form page
- ✅ Return to MyCommunitySales

**Section 4: Full Website Navigation** (10 phases)
- ✅ Home page
- ✅ Marketplace page
- ✅ Search products (teddy bear)
- ✅ Click product details
- ✅ Add to cart
- ✅ Open cart page
- ✅ Service page
- ✅ Release notes
- ✅ Bug report
- ✅ Contact us

**Section 5: Product Search** (5 phases)
- ✅ Search: furniture
- ✅ Search: electronics
- ✅ Search: sports
- ✅ Search: clothes
- ✅ Search: books

**Section 6: Resource Verification** (5 phases)
- ✅ Console error check
- ✅ Broken links check (27+ links verified)
- ✅ Broken images check
- ✅ Final navigation buttons
- ✅ Test complete

---

## 📅 Automatic Testing Schedule

| Setting | Value |
|---------|-------|
| **Run Time** | 2:00 AM (Every Day) |
| **Timezone** | System timezone |
| **Frequency** | Daily |
| **Test Duration** | ~3 minutes |
| **Headless Mode** | ✅ Yes (no browser window) |

---

## 📊 Test Results Location

All test results are automatically saved:

```
📁 /home/gayitri-suravaram/mycommunitysales-regression-test/
├── logs/
│   ├── test_2025-11-20_02-00-00.log
│   ├── test_2025-11-20_02-03-00.log
│   └── ... (daily logs)
├── reports/
│   ├── report_2025-11-20_02-00-00.md
│   ├── report_2025-11-20_02-03-00.md
│   └── ... (daily reports)
├── screenshots/
│   ├── 01_login_page.png
│   ├── 02_phone_entered.png
│   ├── ... (34 screenshots per test)
│   └── 34_test_complete.png
└── playwright-report/
    └── index.html (HTML test report)
```

---

## 🔍 View Test Results

### Check Cron Jobs
```bash
crontab -l
```

### View Latest Log
```bash
tail -f /home/gayitri-suravaram/mycommunitysales-regression-test/logs/test_*.log | tail -1
```

### View Latest Report
```bash
cat /home/gayitri-suravaram/mycommunitysales-regression-test/reports/report_*.md | tail -1
```

### Open HTML Report
```bash
cd /home/gayitri-suravaram/mycommunitysales-regression-test
npx playwright show-report
```

### View Latest Screenshots
```bash
ls -lh /home/gayitri-suravaram/mycommunitysales-regression-test/screenshots/ | tail -35
```

---

## 🚀 Manual Test Run

To run the test manually anytime:

```bash
bash /home/gayitri-suravaram/mycommunitysales-regression-test/run-daily-test.sh
```

---

## 📝 Test Credentials (Auto-Used)

These are automatically filled during each test run:

| Field | Value |
|-------|-------|
| Country Code | 91 |
| Phone Number | 9347372054 |
| OTP | 123456 |

*Configuration stored in: `test-config.js`*

---

## ✅ Latest Test Results

**Date**: November 20, 2025  
**Duration**: 2 minutes 36 seconds  
**Status**: ✅ **PASSED**

### Test Summary
- ✅ Login workflow: **PASSED**
- ✅ MyCommunitySales navigation: **PASSED**
- ✅ Website navigation: **PASSED**
- ✅ Search functionality: **PASSED**
- ✅ Resource integrity: **PASSED**
- ✅ Console errors: **0**
- ✅ Broken links: **0**
- ✅ Broken images: **0**

### Phases Passed
- ✓ Total phases: **34**
- ✓ Passed: **34**
- ✓ Failed: **0**
- ✓ Screenshots: **34**

---

## 📊 Test Frequency Statistics

| Metric | Value |
|--------|-------|
| Daily Tests | 1 |
| Weekly Tests | 7 |
| Monthly Tests | 30 |
| Annual Tests | 365 |
| Total Screenshots/Year | 12,410 |

---

## 🔧 Configuration Files

### Main Test Script
**File**: `steps-daily-comprehensive.txt`  
**Phases**: 34  
**Coverage**: Full website  

### Run Script
**File**: `run-daily-test.sh`  
**Purpose**: Executes tests and generates reports  

### Setup Script
**File**: `setup-daily-tests.sh`  
**Purpose**: Configures cron job  

### Credentials
**File**: `test-config.js`  
**Contains**: Phone, country code, OTP  

---

## 📧 Optional: Email Notifications

To receive email reports after each test, add this to `run-daily-test.sh`:

```bash
# Send email report (add after test completion)
mail -s "MyCommunitySales Test Report - $(date)" your-email@example.com < "$REPORT_FILE"
```

---

## 🛠️ Troubleshooting

### Test Not Running?
```bash
# Check if cron is running
systemctl status cron

# Check crontab
crontab -l

# Check last cron execution
grep CRON /var/log/syslog | tail -10
```

### Test Failed?
```bash
# Check latest log
tail -100 /home/gayitri-suravaram/mycommunitysales-regression-test/logs/test_*.log

# Run manual test for debugging
bash /home/gayitri-suravaram/mycommunitysales-regression-test/run-daily-test.sh
```

### Permission Issues?
```bash
# Make scripts executable
chmod +x /home/gayitri-suravaram/mycommunitysales-regression-test/*.sh
```

---

## 📚 Test Handlers Used

The test uses 50+ automated handlers including:

```
✓ Enter phone with country code 91 9347372054
✓ Enter OTP 123456
✓ Click button containing "Send"
✓ Click button containing "Verify"
✓ Click link "MyCommunitySales"
✓ Search for "product name"
✓ Click on first item
✓ Add to cart
✓ Open /path/to/page
✓ Expect page to contain "text"
✓ Check console
✓ Check broken-links
✓ Check broken-images
✓ Screenshot "name"
✓ Wait [milliseconds]
```

---

## 🎯 Test Objectives Met

✅ **Automatic Login Testing**
- Phone entry with country code
- OTP entry
- Verify & Sign In button click
- No manual intervention required

✅ **Full Website Coverage**
- 34 test phases
- Login → Navigation → Search → Shopping
- Resource integrity checks
- Console error monitoring

✅ **Daily Automation**
- Scheduled at 2:00 AM
- No user interaction needed
- Automatic report generation
- Screenshot capture

✅ **Results Tracking**
- Logs saved daily
- Reports generated automatically
- Screenshots for every phase
- HTML test report

---

## 📞 Support

For issues or modifications:

1. Check logs: `/logs/test_*.log`
2. View reports: `/reports/report_*.md`
3. Run manual test: `bash run-daily-test.sh`
4. Edit test: Edit `steps-daily-comprehensive.txt`

---

## 🎉 You're All Set!

Your website will now be tested automatically every day at **2:00 AM** without any manual work required.

**Next automated test**: Tomorrow at 2:00 AM  
**Latest test status**: ✅ PASSED (2m 36s)  
**Test results location**: `/logs/` & `/reports/` directories

---

**Setup Date**: November 20, 2025  
**Status**: ✅ Active and Configured  
**Maintenance**: None required

