"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
var _nodeAssert = _interopRequireDefault(require("node:assert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the simple collection features of the library.
 */

/**
 * 
 * @param {import("../../../index.mjs").default} client
 * @param {import('node:test')} test 
 */
async function _default(client, test) {
  await test('Simple Collections', async () => {
    /**
     * This method tests a particular payment method
     * @param {Promise<import('./transaction.mjs').default>} promise 
     */
    async function testMethod(promise, label = "Mobile Money") {
      const transaction = await promise;
      const iterator = await client.payment.collection.simple.history();
      let found = false;

      /** @type {tranzak_node.payment.collection.STATUS} */
      const strSuccess = 'SUCCESSFUL';
      for await (const entry of iterator) {
        if (entry.data.mchTransactionRef === transaction.data.mchTransactionRef) {
          found = true;
          break;
        }
      }
      if (!found) {
        throw new Error(`The created transaction unfortunately disappeared.`);
      }
      await new Promise(x => setTimeout(x, 3000));
      await transaction.refresh();
      _nodeAssert.default.strictEqual(transaction.data.status, strSuccess, `${label} transactions do not complete.\nTransaction with id ${transaction.data.requestId} failed.`);
    }
    await test("Mobile Money", async () => {
      await testMethod(client.payment.collection.simple.chargeMobileMoney({
        amount: 300_000,
        currencyCode: 'XAF',
        description: 'Web Development Services',
        mobileWalletNumber: '237677683958',
        mchTransactionRef: _nodeCrypto.default.randomUUID().replaceAll('-', ''),
        payerNote: 'Payment for Web Development Services from HolyCorn Software'
      }), "Mobile Money");
    });
    await test('QR Code Charge', async () => {
      const code = await (await client.account.list())[0].generateAuthCode();
      // console.log(`Code `)
      // await testMethod(promise, 'QR Code Charge')
    });
  });
}