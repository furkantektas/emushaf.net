import { test, expect } from '@playwright/test';

test('header visibility after click', async ({ page }) => {
  await page.goto('http://localhost:3000/sure/yasin');

  // Wait for initial header to hide (it has a 2s timeout)
  await page.waitForTimeout(3000);

  const header = page.locator('.header-container');
  // Check if header is hidden (opacity-0)
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-0/);

  // Click on the page (outside the header)
  // Swiper container should be safe to click
  await page.mouse.click(500, 500);

  // Header should become visible (opacity-100)
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-100/);

  // Wait for 4 seconds - it should still be visible because we set it to 10s
  await page.waitForTimeout(4000);
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-100/);

  // Move mouse to trigger mouseMove event away from the top
  await page.mouse.move(500, 500);
  // It should STILL be visible because the timer is active
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-100/);

  // Wait for more than 10 seconds total from the click
  await page.waitForTimeout(7000);
  // Header should now be hidden
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-0/);
});

test('header visibility on hover', async ({ page }) => {
  await page.goto('http://localhost:3000/sure/yasin');

  // Wait for initial header to hide
  await page.waitForTimeout(3000);
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-0/);

  // Move mouse to top of screen
  await page.mouse.move(500, 50);
  // Header should become visible (duration 0 in showHeader)
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-100/);

  // Move mouse away from top
  await page.mouse.move(500, 500);
  // Header should hide immediately (because no timer was set)
  await expect(page.locator('div.fixed.top-0.left-0.z-10.w-full')).toHaveClass(/opacity-0/);
});
