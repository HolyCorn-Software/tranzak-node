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
 * The tranzak-node library
 * This module allows intelligence to be added to transfer transactions.
 */

/**
 * @extends LiveObject<tranzak_node.payment.transfer.simple.Transaction>
 */
class SimpleTransferTransaction extends _liveObject.default {
  /**
   * Call this method to refresh the transaction.
   */
  async refresh() {
    Object.assign(this.data, await this[_section.transport].request({
      method: 'GET',
      path: `transfer/details?${this.data.transferId ? `transferId=${this.data.transferId}` : `customTransactionRef=${this.data.customTransactionRef}`}`
    }));
  }
}
exports.default = SimpleTransferTransaction;