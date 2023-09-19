/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the payment aspects of the library.
 */



/**
 * 
 * @param {import("../index.mjs").default} client 
 * @param {import('node:test')} test
 */
export default async function (client, test) {
    await (await import('./collection/test.mjs')).default(client, test)
    await (await import('./transfer/test.mjs')).default(client, test)
}