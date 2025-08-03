import { expect, test } from '@playwright/test';
import {HomePage } from '../../pages/HomePage';
import {RoomPage } from '../../pages/RoomPage';

test('user can oreder a room', async ({ page }) => {
  const homePage = new HomePage(page);
  const roomPage = new RoomPage(page);
  
  await homePage.open();
  await homePage.bookRoom();
  await roomPage.reserveRoom('jhon', 'doe', 'jhondoe@gmail.com', '054123456789' )
});

test('negative room order test', async ({ page }) => {
  const homePage = new HomePage(page);
  const roomPage = new RoomPage(page);
  
  await homePage.open();
  await homePage.bookRoom();
  await roomPage.reserveRoom('', '', '', '' );
  await roomPage.reserveRoom('j', 'd', 'jgmail', '1' );
  await roomPage.reserveRoom('jhonasdafdfsgsfdgs', 'doeasdfadvsfsffbfbfs', 'jhondoe@gmail', 'abc' );
  await roomPage.reserveRoom('#@$$%#', '!@$%%', '#$!e@gmail.com', '@#$@#%#%' );
});