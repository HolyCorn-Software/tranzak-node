/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module simplifies routinuous tasks of this api
 */

import Transport from "../lib/transport.mjs";



export default class APISection {

    /**
     * 
     * @param {Transport} _transport 
     */
    constructor(_transport) {
        this[transport] = _transport
    }

}

export const transport = Symbol()