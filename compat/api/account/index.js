"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _section = _interopRequireWildcard(require("../../lib/section.js"));
var _account = _interopRequireDefault(require("./account.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module handles parts of the API, that have to do with account management.
 */

class AccountManagementSection extends _section.default {
  /**
   * This method returns a list of all accounts.
   */
  async list() {
    /** @type {tranzak_node.account.Account[]} */
    const response = await this[_section.transport].request({
      path: 'account/accounts'
    });
    return response.map(data => new _account.default(data, this[_section.transport]));
  }
}
exports.default = AccountManagementSection;