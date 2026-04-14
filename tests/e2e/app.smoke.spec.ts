import { expect, test } from '@playwright/test';

test('returns hardened security headers', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['permissions-policy']).toContain('camera=()');
  expect(headers['cross-origin-opener-policy']).toBe('same-origin');
});

test('loads editor shell menu', async ({ page }) => {
  await page.goto('/');
  const skipIntroButton = page.getByRole('button', { name: /Skip intro|Saltar intro/ });
  if (await skipIntroButton.isVisible().catch(() => false)) {
    await skipIntroButton.click();
  }

  await expect(page.getByRole('menuitem', { name: 'File' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Light|Dark/ })).toBeVisible();
});
