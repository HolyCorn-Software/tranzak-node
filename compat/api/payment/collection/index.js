"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _transport = _interopRequireDefault(require("../../../lib/transport.js"));
var _index = _interopRequireDefault(require("./simple/index.js"));
var _index2 = _interopRequireDefault(require("./split/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module deals (in a macro way), with the parts of the API, that have to do with collecting money from the user
 */

class CollectionAPI {
  /**
   * 
   * @param {Transport} transport 
   */
  constructor(transport) {
    this.simple = new _index.default(transport);
    this.split = new _index2.default(transport);
  }
}
exports.default = CollectionAPI;