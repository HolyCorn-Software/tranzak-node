"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _transport = _interopRequireDefault(require("../../../lib/transport.js"));
var _index = _interopRequireDefault(require("./simple/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This section of the libray, deals with API functions, that have to do with transferring money out of the account.
 */

class TransferAPI {
  /**
   * 
   * @param {Transport} transport 
   */
  constructor(transport) {
    this.simple = new _index.default(transport);
  }
}
exports.default = TransferAPI;