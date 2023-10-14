"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _transport = _interopRequireDefault(require("../lib/transport.js"));
var _index = _interopRequireDefault(require("./account/index.js"));
var _index2 = _interopRequireDefault(require("./payment/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * 
 */

class TRANZAK {
  /**
   * 
   * @param {tranzak_node.Credentials} credentials 
   */
  constructor(credentials) {
    const transport = new _transport.default(credentials);
    this.payment = new _index2.default(transport);
    this.account = new _index.default(transport);
  }
}
exports.default = TRANZAK;