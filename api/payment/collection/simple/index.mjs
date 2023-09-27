/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This section (simple) of the library, deals with simple collections where all money goes to a single destination once
 */

import APISection, { transport } from "../../../../lib/section.mjs";
import SimpleCollectionTransaction from "./transaction.mjs";



export default class SimpleCollectionSection extends APISection {



    /**
     * This method creates a charge in order to receive money via Mobile Money.
     * @param {tranzak_node.payment.collection.simple.MobileMoneyChargeParams} data 
     * 
     */
    async chargeMobileMoney(data) {

        return new SimpleCollectionTransaction(
            await this[transport].request(
                {
                    path: 'request/create-mobile-wallet-charge',
                    body: data,
                    method: 'POST'
                }
            ),
            this[transport]
        );

    }

    /**
     * This method creates a web redirect transaction.
     * @param {tranzak_node.payment.collection.simple.WebRedirectChargeParams} data 
     * 
     */
    async chargeByWebRedirect(data) {
        return new SimpleCollectionTransaction(
            await this[transport].request(
                {
                    path: 'request/create',
                    body: data,
                    method: 'POST'
                }
            ),
            this[transport]
        )
    }

    /**
     * Creates a direct charge using QR Code obtained from Tranzak mobile app. 
     * 
     * The request will be pushed directly to the user for authorization. 
     * 
     * ### To prevent abuse, access to this service will be **disabled** after 10 failed attempts.
     * @param {tranzak_node.payment.collection.simple.QRChargeParams} data 
     * 
     */
    async chargeByQR(data) {

        return new SimpleCollectionTransaction(
            await this[transport].request(
                {
                    path: 'request/create-in-store-charge',
                    body: data,
                    method: 'POST'
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
     * const transactions = await myApiClient.payment.collection.simple.history()
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
            path: `request/history`,
            /**
             * 
             * @param {tranzak_node.payment.collection.simple.Transaction} data 
             */
            transform: (data) => new SimpleCollectionTransaction(data, this[transport])
        })

    }


    /**
     * This method retrieves a single transaction
     * @param {tranzak_node.payment.collection.simple.TransactionSearch} search 
     * @returns {Promise<SimpleCollectionTransaction>}
     */
    async find(search) {
        const transaction = await new SimpleCollectionTransaction(
            search,
            this[transport]
        );
        await transaction.refresh()
        return transaction;
    }

}