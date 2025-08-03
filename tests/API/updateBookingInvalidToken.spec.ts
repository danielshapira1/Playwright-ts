import { test, expect } from '@playwright/test';

const baseURL = 'https://automationintesting.online/api';

const validPayload = {
  bookingdates: {
    checkin: "2027-08-30",
    checkout: "2027-09-02"
  },
  roomid: 1,
  firstname: "jhon",
  lastname: "doe",
  email: "jhondoe@gmail.com",
  phone: "05251234567"
};

test('Update booking: invalid token', async ({ request }) => {
  const create = await request.post(`${baseURL}/booking/`, { data: validPayload });
  const { bookingid } = await create.json();

  const invalidToken = 'invalid.token';
  const res = await request.put(`${baseURL}/booking/${bookingid}`, {
    headers: { Cookie: `token=${invalidToken}` },
    data: { ...validPayload, firstname: 'Grace' }
  });

  expect([401, 403, 404]).toContain(res.status());

});