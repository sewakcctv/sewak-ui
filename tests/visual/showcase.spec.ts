import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

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

const openStates = ['toast', 'tooltip', 'dialog', 'confirm', 'dropdown', 'drawer', 'mobile-nav'] as const;
const openContentFor = (page: Page, state: typeof openStates[number]) => {
  if (state === 'toast') return page.getByRole('status').filter({ hasText: 'Proposal saved' });
  if (state === 'tooltip') return page.getByRole('tooltip');
  if (state === 'dropdown') return page.getByRole('menu');
  const title = state === 'dialog' ? 'Add a camera' : state === 'confirm' ? 'Delete proposal?' : state === 'drawer' ? 'Proposal details' : 'Navigation';
  return page.getByRole('dialog', { name: title });
};

for (const state of openStates) {
  test(`renders and audits the ${state} open state`, async ({ page }, testInfo) => {
    test.skip(state === 'mobile-nav' && testInfo.project.name !== 'mobile');
    test.skip(state !== 'mobile-nav' && testInfo.project.name !== 'desktop');
    await page.goto(`/?density=comfortable&scheme=light&state=${state}`);
    if (state === 'tooltip') {
      const trigger = page.getByRole('button', { name: 'Timezone help' });
      await trigger.scrollIntoViewIfNeeded();
      await trigger.hover();
    }
    const openContent = openContentFor(page, state);
    await expect(openContent).toBeVisible();
    if (state === 'tooltip') await expect(page.getByRole('button', { name: 'Timezone help' })).toHaveAttribute('aria-describedby');
    else if (state === 'dropdown') {
      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('menuitem', { name: 'Duplicate' })).toBeFocused();
      await expect(page.getByRole('menuitem', { name: 'Delete unavailable' })).toBeDisabled();
    } else if (state === 'dialog') await expect(page.getByLabel('Camera label')).toBeFocused();
    else if (state !== 'toast') await expect(openContent.getByRole('button').first()).toBeFocused();
    const axe = new AxeBuilder({ page });
    if (state === 'tooltip') axe.include('.sewak-tooltip').disableRules(['region']);
    if (state === 'dropdown') axe.include('.sewak-menu').disableRules(['region', 'page-has-heading-one']);
    const results = await axe.analyze();
    expect(results.violations).toEqual([]);
    await expect(page).toHaveScreenshot(`open-${state}.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 0,
    });
    if (state !== 'toast') {
      await page.keyboard.press('Escape');
      await expect(openContent).toBeHidden();
    }
  });
}
