"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transport = exports.default = void 0;
var _transport2 = _interopRequireDefault(require("../lib/transport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module simplifies routinuous tasks of this api
 */

class APISection {
  /**
   * 
   * @param {Transport} _transport 
   */
  constructor(_transport) {
    this[transport] = _transport;
  }
}
exports.default = APISection;
const transport = exports.transport = Symbol();