/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library.
 * This module tests the areas of the library to do with split collection payments.
 */


/**
 * 
 * @param {import("../../../index.mjs").default} client 
 * @param {import('node:test')} test 
 */
export default async function (client, test) {
    await test('Split Collections', async () => {

        await test('History', async () => {
            await client.payment.collection.split.history()
        })
    })
}