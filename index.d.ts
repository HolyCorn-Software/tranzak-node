/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 */

import TRANZAK from './api/index.mjs'

// Now, we have to massively import everything, if not VS code's auto-complete would not work

import './types.js'
import './index.mjs'

// Under accounts
import './api/account/types'
import './api/account/index.mjs'

// Under payment
import './api/payment/types'
import './api/payment/index.mjs'
// payment -> collection
import './api/payment/collection/types.js'
import './api/payment/collection/index.mjs'
import './api/payment/collection/simple/types'
import './api/payment/collection/simple/index.mjs'
import './api/payment/collection/split/types'
import './api/payment/collection/split/index.mjs'
// payment -> transfer
import './api/payment/transfer/types'
import './api/payment/transfer/index.mjs'
import './api/payment/transfer/simple/types'
import './api/payment/transfer/simple/index.mjs'

// under SMS
import './api/sms/types'
import './api/sms/index.mjs'



// All good, we export
export default TRANZAK