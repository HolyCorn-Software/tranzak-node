/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This section of the libray, deals with API functions, that have to do with transferring money out of the account.
 */

import Transport from "../../../lib/transport.mjs";
import SimpleTransferSection from "./simple/index.mjs";


export default class TransferAPI {
    /**
     * 
     * @param {Transport} transport 
     */
    constructor(transport) {
        this.simple = new SimpleTransferSection(transport)
    }
}