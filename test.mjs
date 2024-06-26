/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module tests the library
 */

import TRANZAK from "./index.mjs";
import test from 'node:test'

const { appKey, appId, mode } = process.env
if (!appKey) {
    throw new Error(`Passs the 'appKey' environment variable, in order to run this test.`)
}
if (!appId) {
    throw new Error(`Pass the 'appId' environment variable to be used for running the tests.`)
}

const client = new TRANZAK(
    {
        appKey: appKey,
        appId: appId,
        mode: mode
    }
)


await test('TRANZAK', async () => {
    await (await import('./api/account/test.mjs')).default(client, test)
    await (await import('./api/payment/test.mjs')).default(client, test)
    if (mode == 'sandbox') {
        // Ignore tests for SMS for now, as sandbox lacks virtualized SMS capabilities
        await (await import('./api/sms/test.mjs')).default(client, test)
    }
    await (await import('./api/webhooks/test.mjs')).default(client, test)
    await new Promise(x => setTimeout(x, 2000))
    process.exit()
})
