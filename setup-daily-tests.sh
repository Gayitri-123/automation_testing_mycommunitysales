#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# SETUP DAILY AUTOMATED TESTING WITH CRON
# ═══════════════════════════════════════════════════════════════════

PROJECT_DIR="/home/gayitri-suravaram/mycommunitysales-regression-test"

echo "🤖 Setting up daily automated tests..."
echo ""

# Make scripts executable
echo "✓ Making test scripts executable..."
chmod +x "$PROJECT_DIR/run-daily-test.sh"

# Create cron job for daily testing at 2 AM
CRON_TIME="0 2 * * *"  # 2:00 AM every day
CRON_JOB="$CRON_TIME cd $PROJECT_DIR && bash run-daily-test.sh"

echo ""
echo "📅 Cron Job Setup"
echo "─────────────────────────────────────"
echo "Time: 2:00 AM every day"
echo "Command: $CRON_JOB"
echo ""

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "run-daily-test.sh"; then
  echo "✓ Cron job already exists"
else
  echo "Adding cron job..."
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "✓ Cron job added successfully"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 What's included:"
echo "  ✓ Automated daily tests"
echo "  ✓ Login with phone & OTP"
echo "  ✓ Full website navigation"
echo "  ✓ Screenshot capture"
echo "  ✓ Test reports (logs & HTML)"
echo "  ✓ Email notifications (optional)"
echo ""
echo "📁 Test results location:"
echo "  Logs: $PROJECT_DIR/logs/"
echo "  Reports: $PROJECT_DIR/reports/"
echo "  Screenshots: $PROJECT_DIR/screenshots/"
echo ""
echo "🔍 View cron jobs:"
echo "  crontab -l"
echo ""
echo "📖 Manual test run:"
echo "  bash $PROJECT_DIR/run-daily-test.sh"
echo ""
