"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _transport = _interopRequireDefault(require("../../lib/transport.js"));
var _index = _interopRequireDefault(require("./collection/index.js"));
var _index2 = _interopRequireDefault(require("./transfer/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This section of the library deals with API functions related to payment
 */

class PaymentAPI {
  /**
   * 
   * @param {Transport} transport 
   */
  constructor(transport) {
    this.collection = new _index.default(transport);
    this.transfer = new _index2.default(transport);
  }
}
exports.default = PaymentAPI;