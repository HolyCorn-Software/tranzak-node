"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the areas of the library to do with split collection payments.
 */

/**
 * 
 * @param {import("../../../index.mjs").default} client 
 * @param {import('node:test')} test 
 */
async function _default(client, test) {
  await test('Split Collections', async () => {
    await test('History', async () => {
      await client.payment.collection.split.history();
    });
  });
}