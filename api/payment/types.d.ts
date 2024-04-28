/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module (types), contains type definitions for sections of the api, that have to do with payment in general
 */


import './collection/types'
import './transfer/types'

 declare global {
    export namespace tranzak_node.payment {
        type STATUS = "PENDING" | "SUCCESSFUL" | "CANCELLED" | "FAILED"

    }
}