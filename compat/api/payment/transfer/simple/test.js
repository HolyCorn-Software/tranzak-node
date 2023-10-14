"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _nodeAssert = _interopRequireDefault(require("node:assert"));
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
var _nodeUtil = _interopRequireDefault(require("node:util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests aspects of the library that have to do with simple transfers.
 */

/**
 * 
 * @param {import('../../../index.mjs').default} client 
 * @param {import('node:test')} test 
 */
async function _default(client, test) {
  await test('Simple Transfers', async () => {
    let transactions = [];
    await test('Payout Account', async () => {
      const transaction = await client.payment.transfer.simple.toPayoutAccount({
        amount: 1000,
        currencyCode: 'XAF',
        description: `For liquidity`,
        payeeNote: `Internal transfer for liquidity.`,
        customTransactionRef: `${_nodeCrypto.default.randomUUID()}`.replaceAll('-', '')
      });
      transactions.push(transaction);
      await new Promise(x => setTimeout(x, 1000));
      await transaction.refresh();
      _nodeAssert.default.strictEqual(transaction.data.status, "SUCCESSFUL", "Transfer to payout account not working.");
    });
    await test('Mobile Money', async () => {
      const transaction = await client.payment.transfer.simple.toMobileMoney({
        amount: 1000,
        currencyCode: 'XAF',
        description: `Lunch`,
        customTransactionRef: _nodeCrypto.default.randomUUID().replace('-', ''),
        payeeNote: `Payment for lunch.`,
        payeeAccountId: '237677683958'
      });
      let found;
      for await (const item of await client.payment.transfer.simple.history()) {
        if (item.data.transferId == transaction.data.transferId && item.data.customTransactionRef == transaction.data.customTransactionRef) {
          found = true;
          break;
        }
      }
      if (!found) {
        throw new Error(`Something wrong with fetching transaction history.`);
      }
      const clone = await client.payment.transfer.simple.find({
        customTransactionRef: transaction.data.customTransactionRef
      });
      _nodeAssert.default.strictEqual(clone.data.transferId, transaction.data.transferId, `Something wrong with refreshing transaction status.`);
      await new Promise(x => setTimeout(x, 1000));
      await transaction.refresh();
      _nodeAssert.default.strictEqual(transaction.data.status, 'SUCCESSFUL', `Transaction refresh() not working.`);
    });
  });
}