import { Page, Locator, expect } from '@playwright/test';
import {AdminPage} from './AdminPage'

export class AdminLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(username: string, password: string): Promise<boolean> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        // Wait briefly to let the page respond
        await this.page.waitForTimeout(500);

        // Check if failure message is visible
        const isErrorVisible = await this.page.getByText('Invalid credentials').isVisible();

        if (isErrorVisible) {
        console.log('Login failed: Invalid credentials');
        return false;
        }

        // Optionally check if you're on the right page
        await this.page.waitForURL('**/admin/rooms', { timeout: 3000 });
        console.log('Login successful');
        return true;
    }

    getAdminPage(): AdminPage {
        return new AdminPage(this.page);
  }
}
