import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    branding: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.branding = page.getByRole('link', { name: 'Branding' });
    }

    async isLoggedIn(): Promise<boolean> {
    return this.branding.isVisible();
    }
}
