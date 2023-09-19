/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the areas of the library dealing with transfer payments.
 */



/**
 * 
 * @param {import('../../../index.mjs').default} client 
 * @param {import('node:test')} test 
 */
export default async function (client, test) {
    await test('Transfers', async () => {
        await (await import('./simple/test.mjs')).default(client, test)
    })
}