import { test, expect } from '@playwright/test';
test('Validate Simple Form Demo Message', async ({ page }) => {
  const testMessage = 'Welcome to TestMu AI';
await page.goto('https://www.testmuai.com/selenium-playground/');
  const simpleFormDemoLink = page.getByRole('link', {
    name: /simple form demo/i,  });

  await expect(simpleFormDemoLink).toBeVisible();
  await simpleFormDemoLink.click();
  const currentUrl = page.url();
  if (currentUrl.includes('simple-form-demo')) {
    console.log('URL Validation Passed');} else {
    console.log('URL Validation Failed');
    throw new Error(`Expected URL to contain 'simple-form-demo' but found: ${currentUrl}`);
  }
  const messageInput = page.getByPlaceholder('Please enter your Message');
  const getCheckedValueButton = page.getByRole('button', {
    name: /get checked value/i,
  });
  const yourMessageField = page.locator('#message');
  await expect(messageInput).toBeVisible();
  await expect(getCheckedValueButton).toBeVisible();
  await messageInput.fill(testMessage);

  await expect(messageInput).toHaveValue(testMessage);

await page.screenshot({
    path: 'screenshots/message-entered.png',
    fullPage: true,
  });
  await getCheckedValueButton.click();
  await expect(yourMessageField).toBeVisible();

  const actualMessage = (await yourMessageField.textContent())?.trim();
  if (actualMessage === testMessage) {
    console.log('Test Pass');
    console.log(`Expected: ${testMessage}`);
    console.log(`Actual  : ${actualMessage}`);
  } else {
    console.log('Test Fail');
    console.log(`Expected: ${testMessage}`);
    console.log(`Actual  : ${actualMessage}`);

    throw new Error(
      `Message validation failed. Expected "${testMessage}" but got "${actualMessage}"` );
  }

  await expect(yourMessageField).toHaveText(testMessage);
  await page.screenshot({
    path: 'screenshots/test-pass.png',
    fullPage: true,
  });
});
