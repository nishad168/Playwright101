import { test, expect } from '@playwright/test'; 
 
test('Validate Drag and Drop Slider from 15 to 95', async ({ page }) => { 
    await page.goto('https://www.testmuai.com/selenium-playground/'); 
 
  await page.screenshot({ 
    path: 'screenshots/01-home-page.png', 
    fullPage: true, 
  }); 
 
  const dragDropSliderLink = page.getByRole('link', { 
    name: /drag & drop sliders/i, 
  }); 
 
  await expect(dragDropSliderLink).toBeVisible(); 
  await dragDropSliderLink.click(); 
 
  await expect(page).toHaveURL(/drag-drop-range-sliders-demo/); 
 
  if (page.url().includes('drag-drop-range-sliders-demo')) { 
    console.log('   Navigation Successful'); 
  } else { 
    throw new Error('  Failed to navigate to Drag & Drop Sliders page'); 
  } 
 
  await page.screenshot({ 
    path: 'screenshots/02-slider-page.png', 
    fullPage: true, 
  }); 
 
  const slider = page.locator("input[value='15']").first(); 
 
  await expect(slider).toBeVisible(); 
 
  await slider.fill('95'); 
 
  const rangeValue = page.locator('#rangeSuccess'); 
 
  await expect(rangeValue).toBeVisible(); 
 
   await page.screenshot({ 
    path: 'screenshots/03-slider-moved.png', 
    fullPage: true, 
  }); 
 
   const actualValue = (await rangeValue.textContent())?.trim(); 
 
  if (actualValue === '95') { 
    console.log('   Test Pass'); 
    console.log(`Expected Value : 95`); 
    console.log(`Actual Value   : ${actualValue}`); 
  } else { 
    console.log('  Test Fail'); 
    console.log(`Expected Value : 95`); 
    console.log(`Actual Value   : ${actualValue}`); 
 
    throw new Error( 
      `Range value validation failed. Expected 95 but found ${actualValue}` 
    ); 
  } 
 
  await expect(rangeValue).toHaveText('95'); 
 
await page.screenshot({ 
path: 'screenshots/04-validation-passed.png', 
fullPage: true, 
}); 
console.log('Slider successfully moved to 95 and validated.');  
}); 