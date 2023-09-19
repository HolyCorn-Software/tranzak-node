/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This section of the library deals with API functions related to payment
 */

import Transport from "../../lib/transport.mjs";
import CollectionAPI from "./collection/index.mjs";
import TransferAPI from "./transfer/index.mjs";



export default class PaymentAPI {


    /**
     * 
     * @param {Transport} transport 
     */
    constructor(transport) {
        this.collection = new CollectionAPI(transport)
        this.transfer = new TransferAPI(transport)
    }
}