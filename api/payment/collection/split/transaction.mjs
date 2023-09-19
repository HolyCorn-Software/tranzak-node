/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module defines methods that can be performed on a split collection transaction.
 */

import LiveObject from "../../../../lib/live-object.mjs";
import { transport } from "../../../../lib/section.mjs";






/**
 * @extends LiveObject<tranzak_node.payment.collection.split.Transaction>
 */
export default class SplitCollectionTransaction extends LiveObject {
    /**
    * This method returns additional details about a transaction.
    * @returns {Promise<tranzak_node.payment.collection.split.TransactionDetails>}
    */
    async details() {
        return await this[transport].request(
            {
                path: `platform/details?platformRequestId=${this.data.platformRequestId}`
            }
        )
    }


    /**
     * This method triggers the payout of the recipients of this transaction, if the transaction was slated for manual settlements.
     * @returns {Promise<tranzak_node.payment.collection.split.TransactionDetails>}
     */
    async execute() {
        return await this[transport].request(
            {
                path: `platform/transfer`,
                method: 'POST',
                body: {
                    platformRequestId: this.data.platformRequestId
                }
            }
        )
    }


    /**
     * This method returns the full transaction.
     * @returns {Promise<SplitCollectionTransaction>}
     */
    async refresh() {
        Object.assign(this, await this[transport].request(
            {
                method: 'GET',
                path: `platform/details?${this.data.platformRequestId ? `platformRequestId=${this.data.platformRequestId}` : `platformTransactionRef=${this.data.platformTransactionRef}`}`
            }
        ))
    }

}
