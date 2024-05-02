/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module contains type definitions specifically for the sections of the api, that have to do with single payment transfers.
 */


import ''

global {
    namespace tranzak_node.payment.transfer.simple {


        /**
         * #### These fields determine the parameters of a transfer.
         * ---
         * More information, by [reading the docs](https://docs.developer.tranzak.me/#common-attributes-that-apply-when-creating-payment-requests34)
         */
       export interface Params {
            /** 
            * This field, is a unique reference of <=32 characters, to prevent duplicate transfers
            * For more info, check the [Transfers](https://docs.developer.tranzak.me/#common-attributes-that-apply-when-creating-payment-requests34) documentation.  */
            customTransactionRef: string
            /** The amount to be transferred */
            amount: number
            /** The currency in which the transfer is being made. */
            currencyCode: keyof tranzak_node.Currencies
            /** A note that would be sent to the receiver of the funds. */
            payeeNote: string
            /** A description of the transaction, of up to **255** characters. */
            description: string
        }


        /**
         * #### Contains parameters to move money from your account to a **TRANZAK** account
         * ---
         * ### Transfers happen from the payout account. 
         * ### Make sure to load the payout account first
         */
        interface InternalTransferParams extends Params {
            /** 
             * The **TRANZAK account** id of the receiver. 
             * For example, **tzuo7s3tbyjszfkf**. 
             * 
             * or
             * 
             * The phone number of the TRANZAK user, e.g **+23767763958**
             * 
            */
            payeeAccountId: string
        }

        /**
         * #### Contains parameters for transferring money out of your payout account to a **Mobile Money** Wallet.
         * ---
         * ### Transfers happen from the payout account. 
         * ### Make sure to load the payout account first
         */
        interface MobileMoneyTransferParams extends Params {
            /** The Mobile Money account receiving the funds, e.g **+23767763958**. */
            payeeAccountId: string
        }

        /**
         * #### Contains parameters for transfer to a **CEMAC Bank** account.
         * ---
         * ### Transfers happen from the payout account. 
         * ### Make sure to load the payout account first
         */
        interface CEMACBankTransferParams extends Params {
            /** 
             * The CEMAC bank account receiving the money, e.g **10005000220449496105178**. 
             * ### The bank account number must be 23-digit CEMAC bank account type in the format : BBBBBCCCCCAAAAAAAKK 
             * ---
             * Where : 
             * > BBBBB is the 5-digit bank code 
             * ---
             * > CCCCC is the 5-digit branch code 
             * ---
             * > AAAAAAAAAAA is the 11-digit account number 
             * ---
             * > KK the RIB
             * */
            payeeAccountId: string
        }

        /**
         * #### Contains parameters from moving money from any of your accounts into your **payout** account.
         * ---
         * ### Transfers happen from the payout account. 
         * ### Make sure to load the payout account first
         */
        interface PayoutAccountTransferParams extends Params {
            /**
             * ### The internal account where the money will come from. By default, this is your primary *collection account*.
             */
            fundingAccountId: string
        }


        /**
         * Details of a transfer transaction.
         * ***
         * Check [**the docs**](https://docs.developer.tranzak.me/#request-details39) for more information
         */
        type Transaction = SuccessfulTransaction | FailedTransaction | OtherTransaction


        interface TransactionCommon {
            /** The unique transferId ID. Used for tracking */
            transferId: string
            /** The status of the transaction */
            status: tranzak_node.payment.transfer.STATUS
            /**
             * The payee account ID. 
             * ***
             * For internal (TRANZAK) users, this may be the TRANZAK ID (e.g tzuo7s3tbyjszfkf) or the mobile phone number (e.g. +237674460261). 
             * 
             * For mobile wallet transfers this value will be the beneficiary mobile phone number. 
             * 
             * For bank transfers, this is the receiver's bank account number.
             */
            payeeAccountId: string
            /** The account name of the receiving party */
            payeeAccountName: string
            /** The name of the institution processing the transfer at the receiving end-point. */
            destinationServiceName: string
            /** A note that the receiver of the funds will see, accompanying the money. */
            payeeNote: string
            /** A description of the transaction seen by you. */
            description: string
            /** The amount that was transferred. */
            amount: number
            /** The currency in which the transfer happened. */
            currencyCode: keyof tranzak_node.Currencies
            /** The fee that was charged by TRANZAK, for this transaction. */
            fee: number
            /** The custom transaction reference you passed in earlier, when creating the transaction yourself. */
            customTransactionRef: string
            /** 
             * This field indicates if the fee for this transaction was paid by the recipient.
             * ...
             * ### true
             * > Fee was paid by the recipient.
             * ---
             * ### false
             * > Fee was paid by you.
             * 
             */
            feeIsPaidByPayee: boolean

            createdByAppId: string
            /** A description of the type of transfer */
            type: "mobile money transfer" | "internal transfer"
            /** The timestamp of the transaction's **creation time**, to millisecond precision, format as an ISO date string. */
            createdAt: string
        }

        interface SuccessfulTransaction extends TransactionCommon {
            status: "SUCCESSFUL"
            /** The resulting transaction ID, issued by TRANZAK. */
            transactionId: string
            /** The ISO-formated timestamp of the time the transaction ***completed***, to millisecond precision. */
            transactionTime: string
        }

        interface FailedTransaction extends TransactionCommon {
            status: "FAILED"
            /**
             * This field is present in circumstances where the transaction failed, and states why it failed.
             */
            errorMessage: string
            /**
             * ID of a refund that can be approved, to send the money back to the source.
             */
            refundId: string
        }

        interface OtherTransaction extends TransactionCommon {
            status: Exclude<STATUS, "SUCCESSFUL" | "FAILED">
        }

        type TransactionSearch = Pick<Transaction, "transferId" | "customTransactionRef">

    }
}