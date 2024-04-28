/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module contains type definitions for the aspects of the library that deal with webhooks.
 */

import EventEmitter from 'node:events'
import SimpleCollectionTransaction from '../payment/collection/simple/transaction.mjs'
import SimpleTransferTransaction from '../payment/transfer/simple/transaction.mjs'

declare global {
    namespace tranzak_node.webhook {

        type WebhookCallbackData = {
            /** Unique notification ID */
            tpnId: string
            /** An optional parameter, representing the parent ID of the notification (if applicable) */
            parentId?: string
            /** An optional parameter, representing the app ID */
            appId?: string
            /** the corresponding webhook ID */
            webhookId: string
            /** The webhook authentication key */
            authKey: string
            /** whether/not the notification response was success or failure */
            isSuccess: boolean
            /** The url (as configured in webhook) */
            url: string
            /** The HTTP status code */
            responseStatusCode: string
            /** Error message or SUCCESS in case the response was successful */
            errorDiagnosis: string
            /** The time the notification was sent out */
            dispatchTime: string
        } &
            (
                {

                    /** The matching webhook event type */
                    eventType: "REQUEST.COMPLETED" | "REQUEST.CANCELED"
                    resource: tranzak_node.payment.collection.simple.Transaction | tranzak_node.payment.collection.split.Transaction
                } |
                {
                    /** The matching webhook event type */
                    eventType: "TRANSFER.COMPLETED"
                    resource: tranzak_node.payment.transfer.simple.Transaction
                }
            )

        type EventTypes = "COLLECTION.COMPLETED" | "COLLECTION.CANCELED" | "TRANSFER.COMPLETED"

        interface EventMap {
            "COLLECTION.COMPLETED": SimpleCollectionTransaction
            "COLLECTION.CANCELED": SimpleCollectionTransaction
            "TRANSFER.COMPLETED": SimpleTransferTransaction
        }

        type RemoveSpecial<T> = {
            [K in keyof T]: K extends ('addListener' | 'on' | 'off' | 'removeListener' | 'removeAllListeners') ? never : T[K]
        }
        type WebhooksEventEmitter = (
            {
                [K in keyof EventMap as 'addListener' | 'on']: (event: `payment.${Lowercase<K>}`, callback: (data: EventMap[K]) => void) => void
            } & {
                [K in keyof EventMap as  'off' | 'removeListener']: (event: `payment.${Lowercase<K>}`, callback: void | (() => void)) => void

            } & {
                [K in keyof EventMap as 'removeAllListeners']: (event: `payment.${Lowercase<K>}`) => void

            }
        ) & EventEmitter
    }

}