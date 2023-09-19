/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module handles parts of the API, that have to do with account management.
 */

import APISection, { transport } from "../../lib/section.mjs";
import Account from "./account.mjs";


export default class AccountManagementSection extends APISection {


    /**
     * This method returns a list of all accounts.
     */
    async list() {
        /** @type {tranzak_node.account.Account[]} */
        const response = await this[transport].request(
            {
                path: 'account/accounts',
            }
        );
        return response.map(data => new Account(data, this[transport]))
    }


}