# 🤖 HOW TO RUN TESTS EVERY DAY AUTOMATICALLY

## ✅ QUICK ANSWER: Already Set Up!

Your tests are **already configured to run automatically every day at 2:00 AM**. 

You don't need to do anything! ✅

---

## 🔍 Verify It's Running

### Check if Cron Job is Active
```bash
crontab -l
```

**You should see:**
```
0 2 * * * cd /home/gayitri-suravaram/mycommunitysales-regression-test && bash run-daily-test.sh
```

This means: **Run every day at 2:00 AM**

---

## 📅 Change the Time (Optional)

### To run at a different time, edit the cron job:

```bash
crontab -e
```

**Find this line:**
```
0 2 * * * cd /home/gayitri-suravaram/mycommunitysales-regression-test && bash run-daily-test.sh
```

**Change to your preferred time:**

| Time | Code |
|------|------|
| **9:00 AM** | `0 9 * * *` |
| **12:00 PM (Noon)** | `0 12 * * *` |
| **3:00 PM** | `0 15 * * *` |
| **6:00 PM** | `0 18 * * *` |
| **9:00 PM** | `0 21 * * *` |
| **2:00 AM** (Current) | `0 2 * * *` |

**Example: To run at 9:00 AM, change to:**
```
0 9 * * * cd /home/gayitri-suravaram/mycommunitysales-regression-test && bash run-daily-test.sh
```

---

## ▶️ Run Test Manually (Anytime)

### Run test right now:
```bash
cd /home/gayitri-suravaram/mycommunitysales-regression-test
bash run-daily-test.sh
```

Or simply:
```bash
bash /home/gayitri-suravaram/mycommunitysales-regression-test/run-daily-test.sh
```

---

## 📊 View Test Results

### After test runs, check results:

```bash
# View latest log
tail -f /home/gayitri-suravaram/mycommunitysales-regression-test/logs/test_*.log

# View latest report
cat /home/gayitri-suravaram/mycommunitysales-regression-test/reports/report_*.md

# View screenshots (34 per test)
ls -lh /home/gayitri-suravaram/mycommunitysales-regression-test/screenshots/

# Open HTML report
cd /home/gayitri-suravaram/mycommunitysales-regression-test
npx playwright show-report
```

---

## 🔄 Test Automation Flow

```
Every Day at 2:00 AM
        ↓
    [Cron Job Triggers]
        ↓
    [Bash Script Runs]
    (run-daily-test.sh)
        ↓
    [Playwright Launches]
        ↓
    [Test Executes: 34 Phases]
    ├─ Login (automatic)
    ├─ MyCommunitySales navigation
    ├─ Website navigation
    ├─ Search & shopping
    └─ Resource verification
        ↓
    [Results Saved]
    ├─ logs/test_*.log
    ├─ reports/report_*.md
    ├─ screenshots/*.png
    └─ playwright-report/
        ↓
    ✅ Test Complete
```

---

## 🎯 What Happens Automatically

| Step | What Happens | Time |
|------|--------------|------|
| 1 | Cron job starts test script | 2:00 AM |
| 2 | Browser launches (headless) | 2:00:05 AM |
| 3 | Login: Phone entered | 2:00:10 AM |
| 4 | Login: OTP entered | 2:00:15 AM |
| 5 | Login: Sign in clicked | 2:00:20 AM |
| 6 | Navigation & search | 2:00:30 AM |
| 7 | Shopping & verification | 2:01:00 AM |
| 8 | Results saved | 2:02:30 AM |
| 9 | Test complete | 2:03:00 AM |

**Total Duration: ~3 minutes**

---

## 📁 Where Results Are Saved

```
/home/gayitri-suravaram/mycommunitysales-regression-test/

├── logs/
│   ├── test_2025-11-20_02-00-00.log    ← Daily log
│   ├── test_2025-11-21_02-00-00.log
│   └── test_2025-11-22_02-00-00.log
│
├── reports/
│   ├── report_2025-11-20_02-00-00.md   ← Daily report
│   ├── report_2025-11-21_02-00-00.md
│   └── report_2025-11-22_02-00-00.md
│
├── screenshots/
│   ├── 01_login_page.png
│   ├── 02_phone_entered.png
│   ├── ... (34 screenshots)
│   └── 34_test_complete.png
│
└── playwright-report/
    └── index.html   ← HTML test report
```

---

## ✅ Checklist: Is Everything Working?

- [ ] Check cron: `crontab -l` (should show our job)
- [ ] Run manual test: `bash run-daily-test.sh`
- [ ] Check logs created: `ls -lh logs/`
- [ ] Check reports created: `ls -lh reports/`
- [ ] Check screenshots: `ls -lh screenshots/`
- [ ] Open HTML report: `npx playwright show-report`

---

## 🆘 Troubleshooting

### Test Not Running at 2 AM?

**Step 1: Check if cron is active**
```bash
systemctl status cron
```
Should show: `active (running)`

**Step 2: Check crontab**
```bash
crontab -l
```
Should show our test job

**Step 3: Check recent cron jobs**
```bash
grep CRON /var/log/syslog | tail -10
```

**Step 4: Check system logs**
```bash
sudo journalctl -u cron
```

---

### Test Failed?

**Check the log:**
```bash
tail -50 /home/gayitri-suravaram/mycommunitysales-regression-test/logs/test_*.log
```

**Run manual test for debugging:**
```bash
bash /home/gayitri-suravaram/mycommunitysales-regression-test/run-daily-test.sh
```

---

### Still Having Issues?

**Reinstall cron job:**
```bash
bash /home/gayitri-suravaram/mycommunitysales-regression-test/setup-daily-tests.sh
```

---

## 📞 Quick Commands Reference

```bash
# Run test now
bash run-daily-test.sh

# Check if scheduled
crontab -l

# Change schedule time
crontab -e

# View latest log
tail -f logs/test_*.log

# View latest report
cat reports/report_*.md | tail -1

# View screenshots
ls -lh screenshots/

# Open HTML report
npx playwright show-report

# Re-setup cron
bash setup-daily-tests.sh

# Make executable
chmod +x *.sh
```

---

## 🎉 That's It!

✅ Your website will be tested **automatically every day at 2:00 AM**  
✅ No manual work required  
✅ Results saved automatically  
✅ You can change the time if you want  

**Sit back and let the automation do the work!** 🤖

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README_DAILY_TESTING.md` | Complete setup guide |
| `DAILY_AUTOMATED_TESTING_GUIDE.md` | Detailed automation guide |
| `TEST_STATUS_DASHBOARD.md` | Current status & metrics |
| `HOW_TO_RUN_DAILY.md` | This file (how to run) |
| `run-daily-test.sh` | Test runner script |
| `setup-daily-tests.sh` | Cron setup script |
| `steps-daily-comprehensive.txt` | Main test file (34 phases) |

---

**Setup Date**: November 20, 2025  
**Status**: ✅ Active and Running  
**Next Test**: Tomorrow at 2:00 AM  
**No action needed from you!** 🚀
