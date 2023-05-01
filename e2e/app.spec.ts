import { test, expect } from '@playwright/test';

test('test', async ({ page, baseURL }) => {
  const url = process.env.CI ? `${baseURL}/notion-like-editor` : '/';

  await page.goto(url);

  const textarea = page.locator(
    `[placeholder="Type '/' for block, ('@' to link docs or people doesn't work for now😌)"]:first-child`
  );

  expect(textarea).toBeFocused();
  await textarea.fill('jkghgjhh ');
  await textarea.press('/');

  const menuWrapper = page.locator('[data-caret-observer]');
  const firstItem = menuWrapper.locator('li:first-child button');

  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('true');
  await firstItem.click();
  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('false');
  expect(await textarea.textContent()).toBe('jkghgjhh ');
  expect(await page.locator('[contenteditable="true"]').all()).toHaveLength(2);
  await textarea.focus();
  await textarea.fill('');
  await textarea.press('Space');
  await textarea.press('/');
  await textarea.press('1');
  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('true');
  expect(await firstItem.textContent()).toContain('Heading 1');
  await textarea.press('Enter');

  const heading = page.getByPlaceholder('Heading 1');

  expect(heading).toBeFocused();
  await heading.press('/');
  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('true');
  await heading.press('Space');
  await heading.press('Space');
  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('false');
  await heading.press('Enter');
  expect(heading).not.toBeFocused();
  await heading.focus();
  await heading.fill('');
  await heading.press('Backspace');
  expect(await menuWrapper.getAttribute('data-show-menu')).toBe('false');
  expect(heading).not.toBeInViewport();
  expect(textarea).toBeFocused();
});
