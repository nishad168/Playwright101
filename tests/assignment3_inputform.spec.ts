import { test } from '@playwright/test';

test('Input Form Submit Validation', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');
  await page.getByRole('link', { name: 'Input Form Submit' }).click();

  await page.getByRole('button', { name: 'Submit' }).click();

  const validationMessage = await page.locator('#name').evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

  if (validationMessage.includes('Please fill')) {
    console.log('Validation Test Pass');

    await page.screenshot({
      path: 'Validation_Pass.png',
      fullPage: true
    });
  } else {
    console.log('Validation Test Fail');
  }

  await page.locator('#name').fill('Nishad Dhamne');
  await page.locator('#inputEmail4').fill('nishaddhamne@testing.com');
  await page.locator('#inputPassword4').fill('Password@123');
  await page.locator('#company').fill('ABC Company');
  await page.locator('#websitename').fill('https://abc.com');
  await page.locator('#inputCity').fill('New York');
  await page.locator('#inputAddress1').fill('Address Line 1');
  await page.locator('#inputAddress2').fill('Address Line 2');
  await page.locator('#inputState').fill('NY');
  await page.locator('#inputZip').fill('10001');

  await page
    .locator('select[name="country"]')
    .selectOption({ label: 'United States' });

  await page.getByRole('button', { name: 'Submit' }).click();

  const expectedMessage =
    'Thanks for contacting us, we will get back to you shortly.';

  const actualMessage = (
    await page.locator('.success-msg').textContent()
  )?.trim();

  if (actualMessage === expectedMessage) {
    console.log('✅ Test Pass');

    await page.screenshot({
      path: 'Success_Test_Pass.png',
      fullPage: true
    });
  } else {
    console.log('❌ Test Fail');
    console.log(`Expected: ${expectedMessage}`);
    console.log(`Actual: ${actualMessage}`);

    await page.screenshot({
      path: 'Success_Test_Fail.png',
      fullPage: true
    });
  }
});