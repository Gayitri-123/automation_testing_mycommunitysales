const fs = require('fs');
const path = require('path');

// Load and normalize steps just like the engine does
function listSteps() {
  const stepsFile = path.resolve(process.cwd(), 'steps.txt');
  const raw = fs.readFileSync(stepsFile, 'utf8');
  const lines = raw
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'));

  // Normalize lines: strip numbering/bullets and map common natural phrases
  const normalizeLine = (l) => {
    l = l.replace(/^\s*[0-9]+[\.)]?\s*/,'').replace(/^\s*-\s*/,'').trim();
    const mappings = [
      [/^load homepage$/i, 'open homepage'],
      [/^take full-?page screenshot$/i, 'screenshot "full_page"'],
      [/^go to login page$/i, 'open /login'],
      [/^open product detail$/i, 'open /garage-sale/marketplace'],
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

  const normalized = lines.map(normalizeLine).filter(Boolean);

  // Known command patterns (from helper.js runLine method)
  const knownPatterns = [
    /^open homepage$/i,
    /^open \//i,
    /^check status \d+$/i,
    /^check loadtime$/i,
    /^check console$/i,
    /^check missing-resources$/i,
    /^click each menu item$/i,
    /^check broken-images$/i,
    /^check broken-links$/i,
    /^check favicon-meta$/i,
    /^click "(.+)"$/i,
    /^click button "(.+)"$/i,
    /^click link "(.+)"$/i,
    /^type "(.+)" into "(.+)"$/i,
    /^fill "(.+)" with "(.+)"$/i,
    /^expect page to contain "(.+)"$/i,
    /^expect url contains "(.+)"$/i,
    /^wait for "(.+)"$/i,
    /^wait \d+$/i,
    /^screenshot "(.+)"$/i,
    /^enter phone(\s+\d+)?$/i,
    /^enter phone with country code\s*\d*\s*\d*$/i,
    /^enter otp(\s+\d+)?$/i,
    /^click button containing "(.+)"$/i,
    /^login|^default login|^login with default credentials$/i,
    /^search for "(.+)"$/i,
    /^click on first item$/i,
    /^click on item image$/i,
    /^add to cart$/i,
    /^proceed to checkout$/i,
    /^complete purchase$/i,
    /^iterate through items$/i,
    /^apply price filter$/i,
    /^sort items$/i,
    /^remove from cart$/i,
    /^go to cart page$/i,
    /^submit (empty )?form$/i,
    /^validate success/i,
    /^create listing/i,
    /^upload images$/i,
    /^enter details$/i,
    /^submit listing$/i,
    /^validate listing appears$/i,
    /^click notify group$/i,
    /^load vendor list$/i,
    /^open a vendor$/i,
    /^submit comment$/i,
    /^image carousel test$/i,
    /^seller info test$/i,
    /^description load$/i,
    /^add same item twice$/i,
    /^(listings|cart testing|edge cases|phase \d+|my listings testing|edit\/delete listing|notify group|contact us|bug report form|api testing|performance testing|cross-browser testing|device testing|security testing|post deployment testing)[:–]?$/i,
    /^negative price$/i,
    /^missing images$/i,
    /^non-existent product url$/i,
    /^ai description$/i,
    /^edit listing$/i,
    /^save changes$/i,
    /^delete listing$/i,
    /^confirm popup$/i,
    /^load groups list$/i,
    /^join\/leave group$/i,
    /^post listing in group$/i,
    /^validate feed$/i,
    /^pagination check$/i,
    /^validate moderation$/i,
    /^delete\/edit comment$/i,
    /^submit invalid email$/i,
    /^successful submission$/i,
    /^missing fields$/i,
    /^validation check$/i,
    /^otp generation$/i,
    /^otp verify$/i,
    /^listing creation$/i,
    /^marketplace search$/i,
    /^vendor comments$/i,
    /^upload service$/i,
    /^groups api$/i,
    /^user profile api$/i,
    /^http \d{3}$/i,
    /^page load < [\d.]+ seconds$/i,
    /^lighthouse score$/i,
    /^(optimize images|minify css|minify js|check caching)$/i,
    /^api latency check$/i,
    /^(chrome|firefox|safari|edge|iphone|android|ipad|laptop|desktop)$/i,
    /^(layout differences|font issues|button alignment|animations|responsive grids|touch interactions|navigation menu)$/i,
    /^(sql injection checks|xss injection checks|csrf protection|session expiration|brute-force otp attempts|exposed endpoints|open redirect issues)$/i,
    /^(uptime monitoring|cloudwatch error logs|otp error rate|ecs task stability|cdn cache behavior|storage testing on aws efs|run nightly automated tests)$/i,
    /^phase \d+[\s–:–-].*$/i,
    /^(test endpoints|check|devices)[:–]?$/i,
    /^400 errors$/i,
    /^500 errors$/i,
    /^response times$/i,
    /^minify css\/js$/i,
    /^iphone 14\/15$/i,
    /^android phones$/i,
    /^laptop \+ desktop monitors$/i,
    /^form validation$/i,
  ];

  console.log('\n=== NORMALIZED STEPS LIST ===\n');
  let known = 0, unknown = 0;
  normalized.forEach((step, idx) => {
    const lineNum = idx + 1;
    const isKnown = knownPatterns.some(p => p.test(step));
    const status = isKnown ? '✅' : '❌';
    if (isKnown) known++;
    else unknown++;
    console.log(`${lineNum.toString().padStart(3)}. ${status} ${step}`);
  });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total steps: ${normalized.length}`);
  console.log(`Known (✅): ${known}`);
  console.log(`Unknown (❌): ${unknown}`);
  console.log(`Coverage: ${((known / normalized.length) * 100).toFixed(1)}%`);

  if (unknown > 0) {
    console.log(`\n=== UNKNOWN STEPS TO IMPLEMENT ===`);
    normalized.forEach((step, idx) => {
      const isKnown = knownPatterns.some(p => p.test(step));
      if (!isKnown) {
        console.log(`Line ${idx + 1}: "${step}"`);
      }
    });
  }
}

listSteps();
