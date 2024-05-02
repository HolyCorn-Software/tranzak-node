/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module contains type definitions for the sections of the library that have to do with account management
 */

import ''


export declare global {
    namespace tranzak_node.account {
        interface Account {
            accountId: string
            name: string
            description: string
            currencyCode: keyof tranzak_node.Currencies
            balance: number
            isActive: boolean
            type: "payout account" | "Primary collection account" | "Merchant account"
        }

        type AccountDetails = Omit<Account, "balance"> & {
            totalBalance: number
            availableBalance: number
        }

        type ACCOUNT_TYPE = "merchant collection account" | "payout account" | "Primary collection account"
    }
}