/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This section of the library, deals withAPIfunctions that have to do with making a transfer once, to a single destination.
 */

import APISection, { transport } from "../../../../lib/section.mjs";
import SimpleTransferTransaction from "./transaction.mjs";



export default class SimpleTransferSection extends APISection {


    /**
     * This function transfers funds from the **payout** account, to another TRANZAK user.
     * ***
     * ### Make sure there are sufficient funds in the _payout_ account.
     * @param {tranzak_node.payment.transfer.simple.InternalTransferParams} data 
     */
    async toTranzakUser(data) {
        return new SimpleTransferTransaction(
            await this[transport].request(
                {
                    path: 'transfer/to-internal-user',
                    body: data,
                    method: 'POST',
                }
            ),
            this[transport]
        )
    }

    /**
     * This function transfers funds from the **payout** account, into a **CEMAC** bank account.
     * ***
     * ### Make sure there are sufficient funds in the _payout_ account.
     * @param {tranzak_node.payment.transfer.simple.CEMACBankTransferParams} data 
     */
    async toCEMACBank(data) {
        return new SimpleTransferTransaction(
            await this[transport].request(
                {
                    path: 'transfer/to-bank-account',
                    body: data,
                    method: 'POST',
                }
            ),
            this[transport]
        )
    }

    /**
     * This function transfers funds from the **payout** account, to **Mobile Money**.
     * ***
     * ### Make sure there are sufficient funds in the _payout_ account.
     * @param {tranzak_node.payment.transfer.simple.MobileMoneyTransferParams} data 
     */
    async toMobileMoney(data) {
        return new SimpleTransferTransaction(
            await this[transport].request(
                {
                    path: 'transfer/to-mobile-wallet',
                    body: data,
                    method: 'POST',
                }
            ),
            this[transport]
        )
    }


    /**
     * This function transfers money from any account (most likely, the collection primary account), to the **payout** account.
     * 
     * @param {tranzak_node.payment.transfer.simple.PayoutAccountTransferParams} data 
     */
    async toPayoutAccount(data) {
        return new SimpleTransferTransaction(
            await this[transport].request(
                {
                    path: 'transfer/payout-account-topup',
                    body: data,
                    method: 'POST',
                }
            ),
            this[transport]
        )
    }


    /**
     * This function returns the previous transactions, as an Async Iterable.
     * 
     * 
     * This means, you're **NOT** expecting a flat array, but an object that can be consumed in a **for loop**, or with the **spread operator**.
     * ***
     * For Example,
     * 
     * ```js
     * const myApiClient = new TRANZAK(...blablabla)
     * const transactions = await myApiClient.payment.transfer.split.history()
     * for await (const item of transactions){
     *      console.log(`A transaction `, item.data)
     *  }
     * 
     * ```
     * ***
     * 
     * To better familiarize yourself with the concept of the AsyncGenerator, you can lookup the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).
     * 
     */
    async history() {

        return await this[transport].paginatedRequest({
            path: `transfer/history`,
            /**
             * 
             * @param {tranzak_node.payment.transfer.simple.Transaction} data 
             */
            transform: (data) => new SimpleTransferTransaction(data, this[transport])
        })

    }


    /**
     * This method retrieves a single transaction
     * @param {tranzak_node.payment.transfer.simple.TransactionSearch} search
     */
    async find(search) {
        const transaction = new SimpleTransferTransaction(
            search,
            this[transport]
        )
        await transaction.refresh();
        return transaction
    }




}