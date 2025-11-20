const { test, expect } = require('@playwright/test');
const config = require('../test-config.js'); // keep for future use if you want

test('Explore login page', async ({ page }) => {
  // Go to homepage
  await page.goto('https://mycommunitysales.com', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'screenshots/explore_1_homepage.png', fullPage: true });

  // Look for login button/link
  const loginBtn = page.locator('text=Login').first();
  const loginCount = await loginBtn.count();
  console.log('Login button exists:', loginCount);

  if (loginCount > 0) {
    await loginBtn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/explore_2_login_page.png', fullPage: true });

    // Check for phone inputs
    const phoneInputs = page.locator(
      'input[type="tel"], input[placeholder*="phone" i], input[placeholder*="mobile" i]'
    );
    const phoneCount = await phoneInputs.count();
    console.log('Phone inputs found:', phoneCount);

    // Check for send button
    const sendBtn = page.locator('button:has-text("Send")');
    const sendCount = await sendBtn.count();
    console.log('Send button found:', sendCount);

    // Check all text on page
    const bodyText = await page.locator('body').textContent();
    console.log('Page contains "OTP":', bodyText.includes('OTP') || bodyText.includes('otp'));
    console.log('Page contains "Send":', bodyText.includes('Send'));
    console.log('Page contains "Verify":', bodyText.includes('Verify'));

    // Example assertion so test is meaningful
    await expect(loginBtn).toBeVisible();
  } else {
    throw new Error('Login button not found on homepage');
  }
});
