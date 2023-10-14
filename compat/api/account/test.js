"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the library in the domain of account management.
 */

/**
 * 
 * @param {import('../../index.mjs').default} client 
 * @param {import('node:test')} test 
 */
async function _default(client, test) {
  await test('Accounts', async () => {
    let accounts;
    await test('Account Listings', async () => {
      accounts = await client.account.list();
    });
    await test('Account Details', accounts[0].details());
  });
}