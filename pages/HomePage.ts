import { Page, Locator, expect } from '@playwright/test';
import { AdminLoginPage } from './AdminLoginPage';
import { RoomPage } from './RoomPage';

export class HomePage {
  page: Page;
  admin: Locator;
  chackIn: Locator;
  chackOut: Locator;
  roomSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.admin = page.getByRole('link', { name: 'Admin', exact: true });
    this.chackIn = page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox');
    this.chackOut = page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox');
    this.roomSelector = page.locator('div').filter({ hasText: /^£100 per nightBook now$/ }).getByRole('link');
  }

  async open(): Promise<void> {
    await this.page.goto('https://automationintesting.online/', { waitUntil: 'domcontentloaded' });
  }

  async goToAdminLogin(): Promise<AdminLoginPage> {
    await this.admin.click();
    await this.page.waitForURL('**/admin');
    return new AdminLoginPage(this.page);  
  }

  async bookRoom(): Promise<RoomPage> {
    await this.roomSelector.click();
    await this.page.waitForURL('**/reservation/1?checkin=**')
    await this.page.waitForTimeout(500);
    return new RoomPage(this.page);
  }
}