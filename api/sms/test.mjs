/**
 * Copyright 2024 HolyCorn Software
 * The tranzak-node library
 * This module tests SMS messaging features of the API.
 */



import assert from 'node:assert';


/**
 * 
 * @param {import('../../index.mjs').default} client 
 * @param {import('node:test')} test 
 */
export default async function (client, test) {
    await test('SMS', async () => {

        await test('Multiple recipients', async () => {
            const content = "Hello, here's a test message from HolyCorn Software.";
            const res = await client.sms.send({
                msg: content,
                phones: [
                    "+237677683958",
                    "+237682477786",
                    "+237676318634"
                ]
            });
            assert.strictEqual(res.msg, content)
            assert.strictEqual(res.total, 3)
        })
    })
}