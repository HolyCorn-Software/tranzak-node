/**
 * Copyright 2024 HolyCorn Software
 * The tranzak-node library
 * This module provides features for areas of the API that deal with SMS messaging
 */

import APISection, { transport } from "../../lib/section.mjs";


export default class SMSMessagingSection extends APISection {

    /**
     * This method sends an SMS
     * @param {tranzak_node.sms.InputParams} data 
     * @returns {Promise<tranzak_node.sms.APIResponse>}
     */
    async send(data) {
        return await this[transport].request({
            path: '/dn088/v1/sms/api/send',
            body: {
                phones: data.phones.join(','),
                msg: data.msg,
                senderId: data.senderId
            }
        })
    }

}