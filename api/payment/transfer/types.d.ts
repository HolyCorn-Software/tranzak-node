/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module contains type definitions forAPIfunctions, that have to do with making transfers
 */



import './simple/types'


 export declare global {
    namespace tranzak_node.payment.transfer {

        type STATUS = tranzak_node.payment.STATUS | "PROCESSING"

    }
}