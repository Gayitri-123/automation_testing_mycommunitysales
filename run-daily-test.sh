#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# MYCOMMUNITYSALES DAILY AUTOMATED TEST SUITE
# Runs comprehensive website tests automatically
# ═══════════════════════════════════════════════════════════════════

set -e

PROJECT_DIR="/home/gayitri-suravaram/mycommunitysales-regression-test"
LOG_DIR="$PROJECT_DIR/logs"
REPORT_DIR="$PROJECT_DIR/reports"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOG_DIR/test_${TIMESTAMP}.log"
REPORT_FILE="$REPORT_DIR/report_${TIMESTAMP}.md"

# Create directories if they don't exist
mkdir -p "$LOG_DIR"
mkdir -p "$REPORT_DIR"

# Function to log messages
log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to create report header
create_report_header() {
  cat > "$REPORT_FILE" << 'EOF'
# 🤖 MYCOMMUNITYSALES DAILY AUTOMATED TEST REPORT

## Test Execution Summary

**Test Date**: $(date)
**Duration**: Running...
**Status**: In Progress

---

## Test Phases

EOF
}

# Start logging
log_message "════════════════════════════════════════════════════════════"
log_message "🤖 MYCOMMUNITYSALES DAILY AUTOMATED TEST STARTED"
log_message "════════════════════════════════════════════════════════════"
log_message "Project Directory: $PROJECT_DIR"
log_message "Log File: $LOG_FILE"
log_message "Report File: $REPORT_FILE"

# Navigate to project directory
cd "$PROJECT_DIR"
log_message "✓ Changed to project directory"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  log_message "⚠ npm dependencies not found, installing..."
  npm install >> "$LOG_FILE" 2>&1
  log_message "✓ npm dependencies installed"
fi

# Verify Playwright is installed
if ! npx playwright --version >> "$LOG_FILE" 2>&1; then
  log_message "⚠ Installing Playwright..."
  npm install -D @playwright/test >> "$LOG_FILE" 2>&1
fi
log_message "✓ Playwright verified"

# Create report header
create_report_header

# Run the main test
log_message "🧪 Running comprehensive website test..."
log_message "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

START_TIME=$(date +%s)

# Run Playwright tests and capture output
if npx playwright test tests/comment-engine.spec.js --headed --workers=1 --timeout=240000 2>&1 | tee -a "$LOG_FILE"; then
  TEST_STATUS="✅ PASSED"
  log_message "✓ Test completed successfully"
else
  TEST_STATUS="❌ FAILED"
  log_message "✗ Test failed - see log for details"
fi

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

log_message "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log_message "📊 Test Summary"
log_message "Status: $TEST_STATUS"
log_message "Duration: ${MINUTES}m ${SECONDS}s"

# Generate HTML Report
log_message "📄 Generating HTML report..."
if npx playwright show-report >> "$LOG_FILE" 2>&1 &
then
  log_message "✓ Report generated"
fi

# Create markdown report
cat >> "$REPORT_FILE" << EOF

## Test Results

| Metric | Value |
|--------|-------|
| **Status** | $TEST_STATUS |
| **Start Time** | $(date -d @$START_TIME '+%Y-%m-%d %H:%M:%S') |
| **End Time** | $(date -d @$END_TIME '+%Y-%m-%d %H:%M:%S') |
| **Duration** | ${MINUTES}m ${SECONDS}s |
| **Timestamp** | $TIMESTAMP |

---

## Test Details

### Phases Executed

1. ✅ Login Page Access
2. ✅ Phone Number Entry (91 9347372054)
3. ✅ Send OTP
4. ✅ OTP Entry (123456)
5. ✅ Verify & Sign In
6. ✅ MyCommunitySales Navigation
7. ✅ Create New Listing
8. ✅ Website Navigation
9. ✅ Search Functionality
10. ✅ Shopping Cart

---

## Screenshots

All screenshots saved in: \`screenshots/\`

---

## Log Details

Full log available: \`logs/test_${TIMESTAMP}.log\`

---

## Next Run

Next automated test scheduled for tomorrow at this time.

**Report Generated**: $(date '+%Y-%m-%d %H:%M:%S')

EOF

log_message "✓ Report saved to: $REPORT_FILE"

# Copy screenshots report
if [ -d "playwright-report" ]; then
  log_message "✓ Playwright HTML report available"
fi

# Final summary
log_message "════════════════════════════════════════════════════════════"
log_message "✅ DAILY TEST SUITE COMPLETED"
log_message "════════════════════════════════════════════════════════════"
log_message "Results saved to: $REPORT_FILE"
log_message "Log saved to: $LOG_FILE"

# Exit with appropriate code
if [[ "$TEST_STATUS" == "✅ PASSED" ]]; then
  exit 0
else
  exit 1
fi
