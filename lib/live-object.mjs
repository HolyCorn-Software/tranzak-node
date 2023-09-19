/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module (live-object), defines a common structure of objects that allow the caller to add functions to an API response
 */

import { transport } from "./section.mjs";
import Transport from "./transport.mjs";


/**
 * @template DataType
 */
export default class LiveObject {
    /**
     * 
     * @param {DataType} data 
     * @param {Transport} _transport 
     */
    constructor(data, _transport) {
        this.data = data
        this[transport] = _transport
    }
}