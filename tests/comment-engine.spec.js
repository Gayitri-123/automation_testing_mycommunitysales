const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

test('Deep website testing via CommentEngine script', async ({ page }) => {
  // ensure screenshots directory exists
  fs.mkdirSync(path.resolve(process.cwd(), 'screenshots'), { recursive: true });

  // load the helper (CommonJS)
  const { CommentEngine } = require('./comment-engine.helper');

  const engine = new CommentEngine(page, expect, { baseURL: 'https://mycommunitysales.com' });

  // support either steps.txt or deep_website_testing_steps.txt
  let stepsFile = path.resolve(process.cwd(), 'steps.txt');
  if (!fs.existsSync(stepsFile)) {
    stepsFile = path.resolve(process.cwd(), 'deep_website_testing_steps.txt');
  }
  // allow running a subset of steps via env vars: STEP_FROM, STEP_TO, STEP_MATCH
  const opts = {};
  if (process.env.STEP_FROM) opts.startLine = process.env.STEP_FROM;
  if (process.env.STEP_TO) opts.endLine = process.env.STEP_TO;
  if (process.env.STEP_MATCH) opts.match = process.env.STEP_MATCH;
  await engine.run(stepsFile, Object.keys(opts).length ? opts : undefined);
});
