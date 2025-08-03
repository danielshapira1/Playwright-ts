import { Page, Locator, expect } from '@playwright/test';

export class RoomPage {
    readonly page: Page;
    reserveNow: Locator;
    firstN: Locator;
    lastN: Locator;
    email: Locator;
    phone: Locator;
    bookingConfirmed: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.reserveNow = page.getByRole('button', { name: 'Reserve Now' });
        this.firstN = page.getByRole('textbox', { name: 'Firstname' });
        this.lastN = page.getByRole('textbox', { name: 'Lastname' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.phone = page.getByRole('textbox', { name: 'Phone' });
        this.bookingConfirmed = page.getByRole('heading', { name: 'Booking Confirmed' })
    }

    async reserveRoom(Firstname: string, Lastname: string, email: string, phone: string): Promise<void> {
        await this.reserveNow.click();
        await this.firstN.fill(Firstname);
        await this.lastN.fill(Lastname);
        await this.email.fill(email);
        await this.phone.fill(phone); 
        await this.reserveNow.click();
        const errorMessages = this.page.locator('div.alert[role="alert"] ul li');

        if (await errorMessages.count() > 0) {
        const count = await errorMessages.count();
        console.log(`${count} error message(s) found:`);
            for (let i = 0; i < count; i++) {
                const text = await errorMessages.nth(i).textContent();
                console.log(`- ${text?.trim()}`);
            }
        }

        else{
            await expect(this.bookingConfirmed).toHaveText('Booking Confirmed');
        }
    }
}
