import { expect, test } from '@playwright/test';
import {HomePage } from '../../pages/HomePage';
import {AdminPage} from '../../pages/AdminPage'

test('Admin can log in successfully from homepage', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.open();
  const adminLoginPage = await homePage.goToAdminLogin();
  await adminLoginPage.login('admin', 'password');
  const adminPage = new AdminPage(page);
  expect(await adminPage.isLoggedIn()).toBeTruthy();
});

test('failed login', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.open();
  const adminLoginPage = await homePage.goToAdminLogin();
  await adminLoginPage.login('adminafsd', 'passwordasd');
  await adminLoginPage.login('', '');
  await adminLoginPage.login('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
  await adminLoginPage.login('$@#$admin', '@$%#%password');
});

