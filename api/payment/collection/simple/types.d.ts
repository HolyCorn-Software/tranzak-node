/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module (types), contains type definitions for the sections of the library, that deal with single collection-payments
 */


import ''

 declare global {
    namespace tranzak_node.payment.collection.simple {

        /**
         * The parameters for creating a [Mobile Money Charge](https://docs.developer.tranzak.me/#create-mobile-money-charge).
         */
        interface MobileMoneyChargeParams extends ChargeParams {
            /** The phone number of mobile money wallet. For more info, [check the docs](https://docs.developer.tranzak.me/#create-mobile-money-charge). */
            mobileWalletNumber: string
        }

        /**
         * Parameters for creating a web redirect charge.
         */
        interface WebRedirectChargeParams extends ChargeParams {
            /**
             * This attribute informs the payer that the merchant had applied a discretional discount equivalent to this amount as part of the transaction. 
             * 
             * It is for ***informational*** purposes only and ***will not impact the transaction amount***.
             * 
             * [More Information](https://docs.developer.tranzak.me/#common-attributes-that-apply-when-creating-payment-requests)
             */
            serviceDiscountAmount: number
        }

        /**
         * Parameters for creating a QR code charge
         */
        interface QRChargeParams extends ChargeParams {
            /**
             * The authorization code extracted from the payer's QR code via Tranzak mobile app. e.g 318277682072079549470738
             */
            authCode: string
        }

        /**
         * This object defines compulsory fields that have to be provided when initiating simple collection requests
         */
        interface ChargeParams extends tranzak_node.payment.collection.ChargeParams {
            /** 
            * A unique transaction ID to identify the transaction. 
            * 
            * For more info, check the documentation of [Mobile Money Charge](https://docs.developer.tranzak.me/#create-mobile-money-charge).  */
            mchTransactionRef: string
            /** This optional field defines where funds will be moved into after transaction is completed. 
             * 
             * The default is the primary account. Only merchant sub-accounts and primary account are accepted.
             * 
             * [More Info](https://docs.developer.tranzak.me/#common-attributes-that-apply-when-creating-payment-requests)
             */
            receivingAccountId?: string
        }


        type Transaction = TransactionCommon & tranzak_node.payment.collection.Transaction


        interface TransactionCommon extends tranzak_node.payment.collection.TransactionCommon {
            /** A unique ID assigned by TRANZAK, to identify this transaction. */
            requestId: string
            /** Status of the transaction at the time. */
            status: STATUS
            /** An ISO date string of the time the transaction was created, to millisecond precision. */
            creationTime: string
            /** The transaction ID that was earlier passed, when creating this transaction. */
            mchTransactionRef: string
            /** The amount that was charged */
            amount: number
            /** The ID of the TRANZAK app, that is responsible for this transaction. */
            appId: string
        }


        type TransactionSearch = Pick<TransactionCommon, "requestId" | "mchTransactionRef">


    }
}