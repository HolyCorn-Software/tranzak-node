/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module deals (in a macro way), with the parts of the API, that have to do with collecting money from the user
 */

import Transport from "../../../lib/transport.mjs";
import SimpleCollectionSection from "./simple/index.mjs";
import SplitCollectionAPI from "./split/index.mjs";


export default class CollectionAPI {

    /**
     * 
     * @param {Transport} transport 
     */
    constructor(transport) {
        this.simple = new SimpleCollectionSection(transport)
        this.split = new SplitCollectionAPI(transport)
    }
}