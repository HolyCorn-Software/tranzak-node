"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeEvents = _interopRequireDefault(require("node:events"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module provides features related to processing webhooks
 */

const client = Symbol();

/**
 * This object accepts raw input that supposedly came from TRANZAK, during a callback to a webhook.
 * 
 * When it accepts a input via the {@link WebhooksProcessor.process process()} method, it emits an event via the {@link WebhooksProcessor.events events} object.
 */
class WebhooksProcessor {
  /**
   * 
   * @param {import('../../index.mjs').default} _client 
   */
  constructor(_client) {
    this[client] = _client;
    /** @type {tranzak_node.webhook.WebhooksEventEmitter} */
    this.events;
    Reflect.defineProperty(this, 'events', {
      value: new _nodeEvents.default(),
      writable: false,
      configurable: true,
      enumerable: true
    });
  }

  /**
   * This method accepts data, that supposedly came from TRANZAK, during a webhook callback.
   * 
   * This method will process the data, and verify, if the claims of the webhook are true, and then emit an event.
   * 
   * If this method returns false, then either the supposed-webhook data is fraudulent, or the webhook doesn't know how to process that kind of request.
   * @param {tranzak_node.webhook.WebhookCallbackData} data 
   * @returns {Promise<boolean>}
   */
  async process(data) {
    if (!/^((REQUEST\.((COMPLETED)|(CANCELED)))|(TRANSFER\.COMPLETED))$/.test(data.eventType)) {
      // some event we don't know how to handle.
      return false;
    }
    const getTransaction = async () => {
      switch (data.eventType) {
        case 'REQUEST.CANCELED':
        case 'REQUEST.COMPLETED':
          return await this[client].payment.collection.simple.find({
            requestId: data.resource.requestId
          });
        case 'TRANSFER.COMPLETED':
          return await this[client].payment.transfer.simple.find({
            transferId: data.resource.transferId
          });
      }
    };
    try {
      const transaction = await getTransaction();

      // Now that we have the data, let's perform the last fraud checks, to see if the status the webhook is claims, is the reality of the transaction itself
      if (/COMPLETED/.test(data.eventType) && transaction.data.status !== 'SUCCESSFUL' || /CANCELED/.test(data.eventType) && transaction.data.status !== 'CANCELLED' && transaction.data.status !== 'CANCELLED_BY_PAYER') {
        return false;
      }

      // Now that all checks have been passed, let's issue the notification
      this.events.emit(`payment.${data.eventType.toLowerCase().replace(/^request/, 'collection')}`, transaction);
      return true;
    } catch (e) {
      if (e !== null && e !== void 0 && e.generated) {
        // Then, we've called the API, to verify the transaction, and the API says something like, "transaction not found"
        // We just know it's a scam, and quietly return
        return false;
      }
      // However, if the error was not API-ly generated, then it's important that the developer knows
      throw e;
    }
  }
}
exports.default = WebhooksProcessor;