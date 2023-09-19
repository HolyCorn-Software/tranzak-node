/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module provides a utility object for simple payment transactions, that permits direct access to API calls that have to do with that transaction
 */

import LiveObject from "../../../../lib/live-object.mjs";
import { transport } from "../../../../lib/section.mjs";



/**
 * @extends LiveObject<tranzak_node.payment.collection.simple.Transaction>
 */
export default class SimpleCollectionTransaction extends LiveObject {


    /**
     * This method cancels the transaction
     */
    async cancel() {
        /** @type {tranzak_node.payment.collection.Transaction} */
        const response = await this[transport].request(
            {
                path: 'request/cancel',
                body: {
                    requestId: this.data.requestId,
                }
            }
        );
        Object.assign(this.data, response)
    }

    /**
     * This method refreshes the data we know about the transaction.
     */
    async refresh() {
        Object.assign(this.data, await this[transport].request(
            {
                path: `request/details?${this.data.requestId ? `requestId=${this.data.requestId}` : `mchTransactionRef=${this.data.mchTransactionRef}`}`,
                method: 'GET',
            }
        ))
    }


    /**
     * Occasionally, though rarely, some operators such as mobile money providers, might be not send out timely notification when a transaction completes. 
     * 
     * This function can be called to ***forcefully*** obtain the latest transaction status from a third party provider thereby enhancing the payment experience for the payer.
     */
    async forceRefresh() {
        Object.assign(this.data, await this[transport].request(
            {
                path: `request/refresh-transaction-status`,
                body: {
                    requestId: this.data.requestId
                }
            }
        ))
    }

}