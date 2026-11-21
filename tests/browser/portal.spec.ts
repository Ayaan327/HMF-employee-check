import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function accessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  const layout = await page.evaluate(() => ({
    width: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll('main *')]
      .filter(
        (el) =>
          !el.closest('.table-scroll') && el.getBoundingClientRect().right > window.innerWidth,
      )
      .map((el) => ({
        tag: el.tagName,
        class: el.className,
        right: el.getBoundingClientRect().right,
      })),
  }));
  expect(layout.scroll, JSON.stringify(layout)).toBeLessThanOrEqual(layout.width);
}
async function login(page: Page, email: string) {
  await page.goto('/signin-with-chatgpt?return_to=/');
  await page.getByRole('textbox', { name: 'Company email', exact: true }).fill(email);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page
    .getByLabel('Password', { exact: false })
    .filter({ visible: true })
    .first()
    .fill(process.env.HMF_TEST_PASSWORD || 'HmfDemo!2026');
  await page.getByRole('button', { name: 'Sign in to HMF', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign out', exact: true })).toBeVisible();
}

test('employee sign-in, keyboard leave request, history and accessibility', async ({
  page,
}, info) => {
  await login(page, 'employee.uk@hmf.example');
  await expect(page.getByRole('button', { name: 'Settings', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Working time', exact: true })).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Leave', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Leave balance', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Request leave', exact: true }).press('Enter');
  await expect(page.getByRole('combobox', { name: 'Leave type', exact: true })).toBeFocused();
  await page.getByRole('combobox', { name: 'Leave type', exact: true }).press('Tab');
  await expect(page.getByLabel('Start date', { exact: true })).toBeFocused();
  await accessible(page);
  await page.screenshot({
    path: 'outputs/playwright/employee-leave-' + info.project.name + '.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Request leave', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'History', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
});

test('administrator calendars, directory and hours remain accessible', async ({ page }, info) => {
  await login(page, 'admin@hmf.example');
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Leave', exact: true }).click();
  await page.getByRole('combobox', { name: 'Office calendar', exact: true }).selectOption('PK');
  await expect(
    page.getByRole('heading', { name: 'Public holidays · PK', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Edit office calendar', exact: true }).click();
  await expect(page.getByLabel('Leave period starts', { exact: true })).toBeFocused();
  await accessible(page);
  await page.screenshot({
    path: 'outputs/playwright/admin-calendar-' + info.project.name + '.png',
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'People', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
  await page.getByRole('button', { name: 'Hours', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await accessible(page);
});
