"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _section = _interopRequireWildcard(require("../../lib/section.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Copyright 2024 HolyCorn Software
 * The tranzak-node library
 * This module provides features for areas of the API that deal with SMS messaging
 */

class SMSMessagingSection extends _section.default {
  /**
   * This method sends an SMS
   * @param {tranzak_node.sms.InputParams} data 
   * @returns {Promise<tranzak_node.sms.APIResponse>}
   */
  async send(data) {
    return await this[_section.transport].request({
      path: '/dn088/v1/sms/api/send',
      body: {
        phones: data.phones.join(','),
        msg: data.msg,
        senderId: data.senderId
      }
    });
  }
}
exports.default = SMSMessagingSection;