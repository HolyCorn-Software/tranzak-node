/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This section of the library covers API function that deal with account management.
 */

import LiveObject from "../../lib/live-object.mjs";
import { transport } from "../../lib/section.mjs";


/**
 * @extends LiveObject<tranzak_node.account.Account>
 */
export default class Account extends LiveObject {


    /**
     * This method returns details of the account
     * @returns {Promise<tranzak_node.account.AccountDetails>}
     */
    async details() {
        return await this[transport].request(
            {
                path: `account/details?id=${this.data.id}`
            }
        )
    }

    /**
     * This method generates an authentication code, which can be used to directly authorize transactions from this account.
     * ## Think Again
     * > #### This code gives direct, unquestionned access to the account to authorize transactions of any amount.
     * @returns {Promise<string>}
     */
    async generateAuthCode() {

        const response = await this[transport].request(
            {
                path: 'account/generate-auth-code',
                method: 'POST'
            }
        );

        // console.log(`Response `, response)

    }

}