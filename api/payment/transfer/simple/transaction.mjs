/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module allows intelligence to be added to transfer transactions.
 */

import LiveObject from "../../../../lib/live-object.mjs";
import { transport } from "../../../../lib/section.mjs";


/**
 * @extends LiveObject<tranzak_node.payment.transfer.simple.Transaction>
 */
export default class SimpleTransferTransaction extends LiveObject {

    /**
     * Call this method to refresh the transaction.
     */
    async refresh() {
        Object.assign(this.data, await this[transport].request(
            {
                method: 'GET',
                path: `transfer/details?${this.data.transferId ? `transferId=${this.data.transferId}` : `customTransactionRef=${this.data.customTransactionRef}`}`
            }
        ))
    }


}