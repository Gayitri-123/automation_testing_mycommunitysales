#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for CLI output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(msg, color = 'reset') {
  console.log(colors[color] + msg + colors.reset);
}

// Parse steps
function getSteps() {
  const stepsFile = path.resolve(process.cwd(), 'steps.txt');
  const raw = fs.readFileSync(stepsFile, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  const normalizeLine = (l) => {
    l = l.replace(/^\s*[0-9]+[\.)]?\s*/,'').replace(/^\s*-\s*/,'').trim();
    const mappings = [
      [/^load homepage$/i, 'open homepage'],
      [/^take full-?page screenshot$/i, 'screenshot "full_page"'],
      [/^go to login page$/i, 'open /login'],
      [/^verify http status is (\d{3})$/i, 'check status $1'],
      [/^check page load time$/i, 'check loadtime'],
      [/^confirm no javascript console errors$/i, 'check console'],
      [/^check missing css\/?js resources$/i, 'check missing-resources'],
      [/^click each menu item$/i, 'click each menu item'],
      [/^check broken images$/i, 'check broken-images'],
      [/^check broken links$/i, 'check broken-links'],
      [/^verify favicon and metadata load$/i, 'check favicon-meta'],
    ];
    for (const [re, rep] of mappings) {
      const mm = re.exec(l);
      if (mm) {
        return rep.replace(/\$(\d+)/g, (_, idx) => mm[Number(idx)] || '');
      }
    }
    return l;
  };

  return lines.map(normalizeLine).filter(Boolean);
}

function showMenu() {
  const steps = getSteps();
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║  MyCommunitySales Regression Test Runner - Interactive  ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝\n', 'cyan');

  log(`Total Steps: ${steps.length}\n`, 'blue');

  log('Quick Commands:', 'yellow');
  log('  1. Run all steps', 'reset');
  log('  2. Run first 10 steps (smoke test)', 'reset');
  log('  3. Run marketplace workflow (steps 10-35)', 'reset');
  log('  4. List all steps with status', 'reset');
  log('  5. Open HTML report', 'reset');
  log('  6. View screenshots', 'reset');
  log('  7. Run custom range', 'reset');
  log('  8. Run step by keyword match', 'reset');
  log('  9. View testing guide', 'reset');
  log('  0. Exit\n', 'reset');

  // Read user input from command line args or prompt
  const arg = process.argv[2];
  if (arg && !isNaN(arg)) {
    handleChoice(arg, steps);
  } else {
    log('Usage: npm run test:interactive [choice]', 'yellow');
    log('  Example: npm run test:interactive 1', 'reset');
    log('  Example: npm run test:interactive 3\n', 'reset');
  }
}

function handleChoice(choice, steps) {
  switch(choice) {
    case '1':
      log('\n🚀 Running all steps...', 'green');
      execSync('npx playwright test tests/comment-engine.spec.js --headed', { stdio: 'inherit' });
      break;

    case '2':
      log('\n🚀 Running first 10 steps (smoke test)...', 'green');
      execSync('STEP_TO=10 npx playwright test tests/comment-engine.spec.js --headed', { stdio: 'inherit' });
      break;

    case '3':
      log('\n🚀 Running marketplace workflow (steps 10-35)...', 'green');
      execSync('STEP_FROM=10 STEP_TO=35 npx playwright test tests/comment-engine.spec.js --headed', { stdio: 'inherit' });
      break;

    case '4':
      log('\n📋 Listing all steps...\n', 'green');
      execSync('node list-steps.js', { stdio: 'inherit' });
      break;

    case '5':
      log('\n📊 Opening HTML report...', 'green');
      try {
        execSync('npx playwright show-report', { stdio: 'inherit' });
      } catch (e) {
        log('❌ No report found. Run a test first.', 'red');
      }
      break;

    case '6':
      log('\n🖼️  Screenshots location: screenshots/', 'green');
      try {
        const files = fs.readdirSync('screenshots');
        files.forEach(f => log(`  • ${f}`, 'reset'));
      } catch (e) {
        log('❌ No screenshots found yet.', 'red');
      }
      break;

    case '7':
      const from = process.argv[3] || '1';
      const to = process.argv[4] || 'end';
      log(`\n🚀 Running steps ${from}-${to}...`, 'green');
      execSync(`STEP_FROM=${from} STEP_TO=${to} npx playwright test tests/comment-engine.spec.js --headed`, { stdio: 'inherit' });
      break;

    case '8':
      const keyword = process.argv[3] || 'cart';
      log(`\n🚀 Running steps matching "${keyword}"...`, 'green');
      execSync(`STEP_MATCH=${keyword} npx playwright test tests/comment-engine.spec.js --headed`, { stdio: 'inherit' });
      break;

    case '9':
      log('\n📖 Opening testing guide...', 'green');
      try {
        execSync('cat TESTING_GUIDE.md | less', { stdio: 'inherit' });
      } catch (e) {
        log('❌ Testing guide not found.', 'red');
      }
      break;

    case '0':
      log('\n👋 Goodbye!\n', 'green');
      process.exit(0);
      break;

    default:
      log(`\n❌ Invalid choice: ${choice}`, 'red');
      log('Valid options: 0-9\n', 'reset');
  }
}

showMenu();
