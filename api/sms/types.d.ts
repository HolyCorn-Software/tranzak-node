/**
 * Copyright 2024 HolyCorn Software
 * The tranzak-node library
 * This module contains type definitions for the areas of the API, that deal with SMS messaging.
 */

import ''

global {
    namespace tranzak_node.sms {
        interface InputParams extends ParamsCommon {
            /** 
             * An array of phone numbers, in **international format**
             */
            phones: string[]
        }
        interface APIParams extends ParamsCommon {
            phones: string
        }
        interface ParamsCommon {
            /**
             * The content of the SMS
             */
            msg: string
            /**
             * The name to display as sender for each SMS. The name should be 11 characters Max, including white space. Contact support to register a new senderId support@tranzak.net. Unregistered senderId won't work.
             */
            senderId: string
        }
        interface APIResponse {
            msg: string
            total: number
            results: SMSResult[]
        }
        interface SMSResult {
            msisdn: string
            smscount: number
            code: number
            reason: "ACCEPTED"
            ticket: string
        }
    }
}