/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests aspects of the library that have to do with simple transfers.
 */

import assert from 'node:assert';
import crypto from 'node:crypto'
import nodeUtil from 'node:util'


/**
 * 
 * @param {import('../../../index.mjs').default} client 
 * @param {import('node:test')} test 
 */
export default async function (client, test) {
    await test('Simple Transfers', async () => {

        let transactions = []

        await test('Payout Account', async () => {
            const transaction = await client.payment.transfer.simple.toPayoutAccount(
                {
                    amount: 1000,
                    currencyCode: 'XAF',
                    description: `For liquidity`,
                    payeeNote: `Internal transfer for liquidity.`,
                    customTransactionRef: `${crypto.randomUUID()}`.replaceAll('-', '')
                }
            );

            transactions.push(transaction)
            await new Promise(x => setTimeout(x, 1000))
            await transaction.refresh()
            assert.strictEqual(transaction.data.status, "SUCCESSFUL", "Transfer to payout account not working.")

        })


        await test('Mobile Money', async () => {
            const transaction = await client.payment.transfer.simple.toMobileMoney(
                {
                    amount: 1000,
                    currencyCode: 'XAF',
                    description: `Lunch`,
                    customTransactionRef: crypto.randomUUID().replace('-', ''),
                    payeeNote: `Payment for lunch.`,
                    payeeAccountId: '237677683958'
                }
            );

            let found;
            for await (const item of await client.payment.transfer.simple.history()) {
                if ((item.data.transferId == transaction.data.transferId) && (item.data.customTransactionRef == transaction.data.customTransactionRef)) {
                    found = true
                    break
                }
            }

            if (!found) {
                throw new Error(`Something wrong with fetching transaction history.`)
            }

            const clone = await client.payment.transfer.simple.find({ customTransactionRef: transaction.data.customTransactionRef })
            assert.strictEqual(clone.data.transferId, transaction.data.transferId, `Something wrong with refreshing transaction status.`)

            await new Promise(x => setTimeout(x, 1000))

            await transaction.refresh()

            assert.strictEqual(transaction.data.status, 'SUCCESSFUL', `Transaction refresh() not working.`)
        })




    })
}