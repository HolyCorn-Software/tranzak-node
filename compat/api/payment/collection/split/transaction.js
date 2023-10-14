"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _liveObject = _interopRequireDefault(require("../../../../lib/live-object.js"));
var _section = require("../../../../lib/section.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module defines methods that can be performed on a split collection transaction.
 */

/**
 * @extends LiveObject<tranzak_node.payment.collection.split.Transaction>
 */
class SplitCollectionTransaction extends _liveObject.default {
  /**
  * This method returns additional details about a transaction.
  * @returns {Promise<tranzak_node.payment.collection.split.TransactionDetails>}
  */
  async details() {
    return await this[_section.transport].request({
      path: `platform/details?platformRequestId=${this.data.platformRequestId}`
    });
  }

  /**
   * This method triggers the payout of the recipients of this transaction, if the transaction was slated for manual settlements.
   * @returns {Promise<tranzak_node.payment.collection.split.TransactionDetails>}
   */
  async execute() {
    return await this[_section.transport].request({
      path: `platform/transfer`,
      method: 'POST',
      body: {
        platformRequestId: this.data.platformRequestId
      }
    });
  }

  /**
   * This method returns the full transaction.
   * @returns {Promise<SplitCollectionTransaction>}
   */
  async refresh() {
    Object.assign(this, await this[_section.transport].request({
      method: 'GET',
      path: `platform/details?${this.data.platformRequestId ? `platformRequestId=${this.data.platformRequestId}` : `platformTransactionRef=${this.data.platformTransactionRef}`}`
    }));
  }
}
exports.default = SplitCollectionTransaction;