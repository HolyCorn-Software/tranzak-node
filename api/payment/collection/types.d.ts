/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module contains type definitions for the sections of this library, that have to do with collections (debiting users)
 */


import './simple/types'
import './split/types'


 declare global {
    namespace tranzak_node.payment.collection {


        /**
         * This defines the status of transaction.
         * 
         * More info by checking the [docs](https://docs.developer.tranzak.me/#payment-request-status-codes)
         */
        type STATUS = tranzak_node.payment.STATUS | "CANCELLED_BY_PAYER" | "PAYMENT_IN_PROGRESS" | "REFUNDED" | "PAYER_REDIRECT_REQUIRED"


        /**
         * This object defines compulsory fields that have to be provided when initiating collection requests
         */
        interface ChargeParams {
            /** The amount to be charged */
            amount: number
            /** The currency in which the transaction is being made */
            currencyCode: keyof tranzak_node.Currencies
            /** A human-friendly description of the transaction, of up to **255** characters, especially for **accountability** purposes. */
            description: string
            /** This optional field of less than 32 characters, is a note that would be displayed to the user during the USSD prompt */
            payerNote?: string
            /**
             * This optional field contains parameters for customizing the payment page.
             * 
             * That is if, the transaction would not be a direct charge.
             */
            customization?: {
                /** URL location to your logo, which would be displayed on the authorization page. This is optional. */
                logoUrl?: string
                /** This optional piece of text would serve as the title of the payment page. */
                title?: string
            }
        }



        type Transaction = SuccessfulTransaction | OtherTransaction


        interface SuccessfulTransaction extends TransactionCommon {
            status: "SUCCESSFUL"
            /**
             * This field contains information about the user who paid for the transaction.
             */
            payer: {
                /** The payer user identifier, automatically assigned by TRANZAK. */
                userId: string
                /** The name of the payer. */
                name: string
                /** A description of the payment method. */
                paymentMethod: string
                /** The currency in which the payer made the payment. */
                currencyCode: keyof tranzak_node.Currencies
                /** The country code of the payer. */
                countryCode: string
                /** The payer's account ID. For example +237677683958, for Mobile Money. */
                accountId: string
                /** The name account holder's name of the payer. */
                accountName: string
                /** Email address of the payer. */
                email?: string
                /** The paid by the payer, in his own currency. */
                fee: number
                /** The customer ID of the payer, if the payer is non-guest. */
                customerId?: string
            }

            /**
             * This field contains information about how (you), the merchant received the money.
             */
            merchant: {
                /** The currency in which money was received. */
                currencyCode: string
                /** The amount that was supposed to have been received. */
                amount: number
                /** The amount that was actually received. */
                netAmountReceived: number
                /** The fee that (you), the merchant, paid for the money. */
                fee: number
                /** The account into which the money has been placed. */
                accountId: string
            }
        }

        interface OtherTransaction extends TransactionCommon {
            status: Exclude<STATUS, SuccessfulTransaction['status']>
        }


        /**
         * This data structure defines attributes that are common to all transaction data types in the payment collections section.
         */
        interface TransactionCommon {
            /** The currency in which the transaction was made */
            currencyCode: keyof tranzak_node.Currencies
            /** A human-friendly description of the transaction, which was passed during the creation of the transaction */
            description: string
            /** Status of the transaction at the time. */
            status: STATUS
            /** A millisecond-precise ISO date string, representing the time the transaction was **created**. */
            createdAt: string
            /** Useful links for navigating the user throughout the transaction. */
            links: {
                /**
                 * If the user authorized this transaction via the TRANZAK web interface, then this is the url he was **redirected** to, **after**
                 * the transaction was authorized, or declined; consistent with what was passed during the creation of this transaction.
                 *
                 */
                returnUrl?: string
                /**
                 * This is the URL the user visited / is supposed to visit, to authorize the transaction; consistent with what was passed during the creation of this transaction.
                 */
                paymentAuthUrl: string
            }

            /**
             * This field only exists, if the payer is a country other than (you), the merchant.
             */
            forex?: {
                /**
                 * The sell rate.
                 * ******
                 * ### That is, how many HOME equals 1 FRN, where HOME, is the home currency, and FRN, is the foriegn currency.
                 * > Home currency obviously refers to (you), the merchant's currency.
                 */
                rate: number
                /** The amount that was converted. */
                fromAmount: number
                /** The currency in which the money converted was paid. */
                fromCurrencyCode: keyof tranzak_node.Currencies
                /** The amount that was received after the foreign exchange. */
                toAmount: number
                /** The currency the amount was converted to. */
                toCurrencyCode: keyof tranzak_node.Currencies
            }

        }


    }
}