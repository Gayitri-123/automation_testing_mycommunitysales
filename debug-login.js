const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://mycommunitysales.com/garage-sale/otp-login');
  
  // Wait for page to load
  await page.waitForTimeout(3000);
  
  // Inspect form structure
  const inputs = await page.locator('input').count();
  console.log('Total inputs found:', inputs);
  
  for (let i = 0; i < inputs; i++) {
    const inp = page.locator('input').nth(i);
    const type = await inp.getAttribute('type');
    const name = await inp.getAttribute('name');
    const id = await inp.getAttribute('id');
    const placeholder = await inp.getAttribute('placeholder');
    console.log(`Input ${i}: type=${type}, name=${name}, id=${id}, placeholder=${placeholder}`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'debug-login-form.png', fullPage: true });
  console.log('Screenshot saved to debug-login-form.png');
  
  await browser.close();
})();
