/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module contains type definitions for the sections of the API, that have to do with split collections.
 */



import ''


export declare global {
    namespace tranzak_node.payment.collection.split {


        interface ChargeParamsCommon extends tranzak_node.payment.collection.ChargeParams {
            /**
             * Custom transaction reference which is used to prevent duplicate requests for the same resource. 
             * 
             * ### It is mandatory for calls that require direct charge.
             */
            platformTransactionRef?: string

            /**
             * URL that the payer shall be redirected to after payment is completed, if the payment is not a direct one.
             */
            returnUrl?: string

            /**
             * The ID of the account receiving the **commissions*.
             */
            receivingAccountId: string

            /** 
             * The amount the platform will receive as commissions.
             * 
             * > ## That is, the account at {@link receivingAccountId}, would receive this amount {@link platformCommissionAmount}, in the currency of {@link currencyCode}
             */
            platformCommissionAmount: number

            recipients: Recipient[]


        }

        interface Recipient {
            /** 
             * The type of recipient. 
             * ***
             * `tranzak_id`
             * > Then we are transferring to a TRANZAK user.
             * 
             * > Therefore, the {@link recipientId} could be the targets user id, or phone number on the account.
             * 
             * ***
             * `app_id`
             * > Then we are transferring specifically to the default collection account of an app.
             * 
             * > In this case, {@link recipientId} should be the ID of the application. E.g **apabc12345666**
             * 
             */
            recipientType: "tranzak_id" | "app_id"

            /**
             * ID of the recipient.
             * ***
             * This could be the ID of TRANZAK user, or the ID of an application on TRANZAK.
             * 
             * Make sure the input, is consistent with {@link recipientType}.
             */
            recipientId: string

            /** 
             * The Amount this particular beneficiary would receive.
             * 
             * Remember that this amount is measured in terms of {@link ChargeParams#currencyCode}
             * 
             */
            amount: number

            /** A fitting description for the transaction. */
            description: string
            /** An optional field is a unique string to identify the transaction that would send money to this particular beneficiary.  */
            mchTransactionRef?: string
        }

        interface DelayedChargeParams extends ChargeParamsCommon {
            /** 
             * If true, the recipients will paid immediately after payment authorization. 
             * Otherwise, payment will be delayed. Default is true. 
            */
            autoPayout: false
            /**
             * If {@link autoPayout} is `false`, then this optional parameter will be used to specify when to automatically trigger payments to recipients. 
             * If not specified, and {@link autoPayout} is `false`, then payout will be carried out **MANUALLY***. 
             * For example 2023-06-24 11:44:12
             */
            delayPaymentUntilDate: string
        }

        interface ManualChargeParams extends ChargeParamsCommon {
            /** If true, the recipients will paid immediately after payment authorization. Otherwise, payment will be delayed. Default is true. */
            autoPayout: false
        }

        interface ImmediateChargeParams extends ChargeParamsCommon {
            /** If true, the recipients will paid immediately after payment authorization. 
             * Otherwise, payment will be delayed. Default is true. 
            */
            autoPayout?: true

        }


        type ChargeParams = DelayedChargeParams | ImmediateChargeParams | ManualChargeParams

        interface WebRedirectChargeParamsCommon extends ChargeParamsCommon {

        }
        type WebRedirectDelayedChargeParams = DelayedChargeParams & WebRedirectChargeParamsCommon
        type WebRedirectManualChargeParams = ManualChargeParams & WebRedirectChargeParamsCommon
        type WebRedirectImmediateChargeParams = ImmediateChargeParams & WebRedirectChargeParamsCommon

        type WebRedirectChargeParams = WebRedirectDelayedChargeParams | WebRedirectManualChargeParams | WebRedirectImmediateChargeParams


        interface MobileMoneyChargeParamsCommon extends ChargeParamsCommon {
            /** 
             * The phone number of the receiver's Mobile Money account. 
             * 
             * This number must be prefixed with the country code.
             * 
             * For example, `237677683958`
             * 
            */
            mobileWalletNumber: string
            /** A unique transaction ID */
            platformTransactionRef: string
        }
        type MobileMoneyDelayedChargeParams = DelayedChargeParams & MobileMoneyChargeParamsCommon
        type MobileMoneyManualChargeParams = ManualChargeParams & MobileMoneyChargeParamsCommon
        type MobileMoneyImmediateChargeParams = ImmediateChargeParams & MobileMoneyChargeParamsCommon
        type MobileMoneyChargeParams = MobileMoneyDelayedChargeParams | MobileMoneyManualChargeParams | MobileMoneyImmediateChargeParams


        interface QRCodeChargeParamsCommon extends ChargeParamsCommon {
            /** The authorization code extracted from the payer's QR code via Tranzak mobile app. e.g 318277652078079548470738. */
            authCode: string
            /**
             * A unqiue transaction ID assigned by you.
             */
            platformTransactionRef: string
        }
        type QRCodeDelayedChargeParams = DelayedChargeParams & QRCodeChargeParamsCommon
        type QRCodeManualChargeParams = ManualChargeParams & QRCodeChargeParamsCommon
        type QRCodeImmediateChargeParams = ImmediateChargeParams & QRCodeChargeParamsCommon
        type QRCodeChargeParams = QRCodeDelayedChargeParams | QRCodeManualChargeParams | QRCodeImmediateChargeParams

        type STATUS = tranzak_node.payment.collection.STATUS


        type Transaction = tranzak_node.payment.collection.Transaction & (OtherTransaction | SuccessfulTransaction)

        interface TransactionCommon extends tranzak_node.payment.collection.TransactionCommon {
            /**
             * Unique transaction identifier generated by TRANZAK
             */
            platformRequestId: string
            /** The id of the merchant *app** that initiated the transaction, consitent with what you see on the [TRANZAK dashboard](https://developer.tranzak.me). */
            initiatedByMerchantAppId: string
            /** Consistent with the value passed for {@link ChargeParams#receivingAccountId receivingAccountId} during creation of the payment. */
            receivingAccountId: string
            /** Consistent with the value passed for {@link DelayedChargeParams#platformTransactionRef platformTransactionRef} during creation of the payment. */
            platformTransactionRef: string
            /** Consistent with the value passed for {@link ChargeParams#serviceDiscountAmount serviceDiscountAmount} during creation of the payment. */
            serviceDiscountAmount: number
            /** The amount that was moved to the {@link receivingAccountId platform account (receivingAccountId)}.  */
            platformCommissionAmount: number
            /** Consistent with the value passed for {@link ChargeParams#recipients recipients} during creation of the payment. */
            recipients: Recipient[]
            /** Consistent with the value passed for {@link DelayedChargeParams#delayPaymentUntilDate delayPaymentUntilDate} during creation of the payment. */
            delayPaymentUntilDate: string

        }


        interface OtherTransaction extends TransactionCommon {
        }

        type SuccessfulTransaction = TransactionCommon & tranzak_node.payment.collection.SuccessfulTransaction

        type TransactionDetails = Transaction & {
            /** The total amount that was processed during the transaction in the currency of {@link currencyCode} */
            totalAmount: number
            /** The total fee paid by the {@link recipients} of this transaction. */
            totalRecipientFee: number
            /** The total number of recipients that had their share of the money automatically. */
            autoPayout: number
            /** The total number of recipients that received money from this transaction. */
            totalNumberOfRecipients: number
            /** The id of the merchant **organization** that initiated the transaction. */
            initiatedByMerchantOrgId: string
        }

    }
}