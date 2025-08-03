import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/api';

test('Retrieve booking: non existent id ', async ({ request }) => {
  const nonExistentId = 999_999;
  const res = await request.get(`${baseURL}/booking/${nonExistentId}`);
  expect(res.status()).toBe(404);
});