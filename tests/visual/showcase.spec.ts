import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const combinations = [
  ['comfortable', 'light'],
  ['comfortable', 'dark'],
  ['compact', 'light'],
  ['compact', 'dark'],
] as const;

for (const [density, scheme] of combinations) {
  test(`${density}-${scheme}`, async ({ page }) => {
    await page.goto(`/?density=${density}&scheme=${scheme}`);
    await expect(page.locator('[data-testid="showcase-root"]')).toHaveAttribute('data-sewak-density', density);
    await expect(page.locator('[data-testid="showcase-root"]')).toHaveAttribute('data-sewak-color-scheme', scheme);
    await expect(page.locator('main#top')).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    await expect(page).toHaveScreenshot(`${density}-${scheme}.png`, {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });
}

test('toolbar updates density and scheme query parameters', async ({ page }) => {
  await page.goto('/?density=comfortable&scheme=light');
  await page.getByLabel('Density').selectOption('compact');
  await expect(page).toHaveURL(/density=compact/);
  await page.getByLabel('Colour scheme').selectOption('dark');
  await expect(page).toHaveURL(/scheme=dark/);
});
