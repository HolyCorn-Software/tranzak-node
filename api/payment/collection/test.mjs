/**
 * Copright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests areas of the library that have to do with collecting payments.
 */



/**
 * 
 * @param {import('../../index.mjs').default} client 
 * @param {import('node:test')} test
 */
export default async function (client, test) {
    await (await import('./simple/test.mjs')).default(client, test);
    await (await import('./split/test.mjs')).default(client, test)
}