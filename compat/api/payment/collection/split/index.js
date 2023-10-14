"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _section = _interopRequireWildcard(require("../../../../lib/section.js"));
var _transaction = _interopRequireDefault(require("./transaction.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module deals with the sections of the API on split collections.
 * That is, collections that take money from one source, into several source.
 */

class SplitCollectionAPI extends _section.default {
  /**
   * 
   * @param {tranzak_node.payment.collection.split.WebRedirectChargeParams} data 
   */
  async webRedirectCharge(data) {
    return await this.find(await this[_section.transport].request({
      path: 'platform/create',
      method: 'POST',
      body: data
    }), this[_section.transport]);
  }

  /**
   * 
   * @param {tranzak_node.payment.collection.split.MobileMoneyChargeParams} data 
   */
  async chargeMobileMoney(data) {
    return await this.find(await this[_section.transport].request({
      path: 'platform/create-mobile-wallet-charge',
      method: 'POST',
      body: data
    }), this[_section.transport]);
  }

  /**
   * 
   * @param {tranzak_node.payment.collection.split.QRCodeChargeParams} data 
   */
  async chargeByQRCode(data) {
    return await this.find(await this[_section.transport].request({
      path: 'platform/create-in-store-charge',
      method: 'POST',
      body: data
    }), this[_section.transport]);
  }

  /**
   * This function returns the previous transactions, as an Async Iterable.
   * 
   * 
   * This means, you're **NOT** expecting a flat array, but an object that can be consumed in a **for loop**, or with the **spread operator**.
   * ***
   * For Example,
   * 
   * ```js
   * const myApiClient = new TRANZAK(...blablabla)
   * const transactions = await myApiClient.payment.collection.split.history()
   * for await (const item of transactions){
   *      console.log(`A transaction `, item.data)
   *  }
   * 
   * ```
   * ***
   * 
   * To better familiarize yourself with the concept of the AsyncGenerator, you can lookup the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).
   * 
   */
  async history() {
    return await this[_section.transport].paginatedRequest({
      path: `platform/history`,
      /**
       * 
       * @param {tranzak_node.payment.collection.split.Transaction} data 
       */
      transform: data => new _transaction.default(data, this[_section.transport])
    });
  }

  /**
   * This method retrieves a single transaction
   * @param {tranzak_node.payment.collection.simple.TransactionSearch} search 
   * @returns {Promise<SplitCollectionTransaction>}
   */
  async find(search) {
    const transaction = new _transaction.default(search, this[_section.transport]);
    await transaction.refresh();
    return transaction;
  }
}
exports.default = SplitCollectionAPI;