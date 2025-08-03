import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/api';

const validPayload = {
  bookingdates: {
    checkin: "2028-07-30",
    checkout: "2028-08-02"
  },
  roomid: 1,
  firstname: "jhon",
  lastname: "doe",
  email: "jhondoe@gmail.com",
  phone: "05251234567"
}
;

test('Create booking: valid data', async ({ request }) => {
  // You can optionally get a token if needed here

  const res = await request.post(`${baseURL}/booking/`, {
    data: validPayload
  });

  expect([200, 201]).toContain(res.status());

  const body = await res.json();
  expect(body).toHaveProperty('bookingid');
});