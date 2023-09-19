/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module deals with the sections of the API on split collections.
 * That is, collections that take money from one source, into several source.
 */

import APISection, { transport } from "../../../../lib/section.mjs";
import SplitCollectionTransaction from "./transaction.mjs";



export default class SplitCollectionAPI extends APISection {


    /**
     * 
     * @param {tranzak_node.payment.collection.split.WebRedirectChargeParams} data 
     */
    async webRedirectCharge(data) {

        return await this.find(
            await this[transport].request(
                {
                    path: 'platform/create',
                    method: 'POST',
                    body: data,
                }
            ),
            this[transport]
        )


    }

    /**
     * 
     * @param {tranzak_node.payment.collection.split.MobileMoneyChargeParams} data 
     */
    async chargeMobileMoney(data) {

        return await this.find(
            await this[transport].request(
                {
                    path: 'platform/create-mobile-wallet-charge',
                    method: 'POST',
                    body: data,
                }
            ),
            this[transport]
        )


    }

    /**
     * 
     * @param {tranzak_node.payment.collection.split.QRCodeChargeParams} data 
     */
    async chargeByQRCode(data) {

        return await this.find(
            await this[transport].request(
                {
                    path: 'platform/create-in-store-charge',
                    method: 'POST',
                    body: data,
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
     * const transactions = await myApiClient.payment.collection.split.history()
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
            path: `platform/history`,
            /**
             * 
             * @param {tranzak_node.payment.collection.split.Transaction} data 
             */
            transform: (data) => new SplitCollectionTransaction(data, this[transport])
        })

    }



    /**
     * This method retrieves a single transaction
     * @param {tranzak_node.payment.collection.simple.TransactionSearch} search 
     * @returns {Promise<SplitCollectionTransaction>}
     */
    async find(search) {
        const transaction = new SplitCollectionTransaction(
            search,
            this[transport]
        )
        await transaction.refresh();
        return transaction
    }



}