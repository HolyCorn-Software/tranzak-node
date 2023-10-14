"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _liveObject = _interopRequireDefault(require("../../lib/live-object.js"));
var _section = require("../../lib/section.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This section of the library covers API function that deal with account management.
 */

/**
 * @extends LiveObject<tranzak_node.account.Account>
 */
class Account extends _liveObject.default {
  /**
   * This method returns details of the account
   * @returns {Promise<tranzak_node.account.AccountDetails>}
   */
  async details() {
    return await this[_section.transport].request({
      path: `account/details?id=${this.data.id}`
    });
  }

  /**
   * This method generates an authentication code, which can be used to directly authorize transactions from this account.
   * ## Think Again
   * > #### This code gives direct, unquestionned access to the account to authorize transactions of any amount.
   * @returns {Promise<string>}
   */
  async generateAuthCode() {
    const response = await this[_section.transport].request({
      path: 'account/generate-auth-code',
      method: 'POST'
    });

    // console.log(`Response `, response)
  }
}
exports.default = Account;