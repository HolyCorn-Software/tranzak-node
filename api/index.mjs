/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * 
 */

import Transport from "../lib/transport.mjs";
import AccountManagementSection from "./account/index.mjs";
import PaymentAPI from "./payment/index.mjs";
import WebhooksProcessor from "./webhooks/index.mjs";





export default class TRANZAK {

    /**
     * 
     * @param {tranzak_node.Credentials} credentials 
     */
    constructor(credentials) {
        const transport = new Transport(credentials)
        this.payment = new PaymentAPI(transport)
        this.account = new AccountManagementSection(transport)
        this.webhook = new WebhooksProcessor(this)
    }

}