import { test, expect } from '@playwright/test';

test('verify privacy page and homepage footer', async ({ page }) => {
  // Check Homepage Footer
  await page.goto('/');
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'homepage-footer.png', fullPage: false });

  // Check Privacy Page
  await page.goto('/gizlilik');
  await page.waitForLoadState('networkidle');

  // Verify title duplication is fixed
  const h1 = page.locator('h1');
  await expect(h1).toHaveText('Bilgilendirme ve Gizlilik');

  // Verify PageFitButton is hidden in header
  const header = page.locator('.header-container');
  // In Header component, it renders <PageFitButton /> and <ThemeSwitcher /> inside a div if right is not provided.
  // In PrivacyPage, I passed right={<ThemeSwitcher />}.
  // So PageFitButton (which contains a button with specific title or icon) should not be there.
  const pageFitButton = header.locator('button[title*="Sığdır"]'); // Assuming PageFitButton has a title like "Genişliğe Sığdır" or similar.
  await expect(pageFitButton).toHaveCount(0);

  await page.screenshot({ path: 'privacy-page.png', fullPage: true });
});
