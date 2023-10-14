"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _section = require("./section.js");
var _transport2 = _interopRequireDefault(require("./transport.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module (live-object), defines a common structure of objects that allow the caller to add functions to an API response
 */

/**
 * @template DataType
 */
class LiveObject {
  /**
   * 
   * @param {DataType} data 
   * @param {Transport} _transport 
   */
  constructor(data, _transport) {
    this.data = data;
    this[_section.transport] = _transport;
  }
}
exports.default = LiveObject;