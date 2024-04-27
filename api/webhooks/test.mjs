/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 */

import http from 'node:http'
import child_process from 'node:child_process'
import readline from 'node:readline/promises'


/**
 * 
 * @param {import("../index.mjs").default} client 
 * @param {import('node:test')} test
 */
export default async function (client, test) {
    await test("Webhooks", async () => {
        // Use Microsoft's devtunnel, to create a globally reachable URL 

        const throwError = (data) => {
            throw new Error(`Failed to create tunnel with which to test webhooks`.red, { cause: data })
        }

        console.log(`Creating URL tunnel to use for receiving the test callback`)
        const data = (() => {
            try {
                return child_process.execSync('devtunnel create -a').toString()
            } catch (e) {
                throwError(e.message.split("\n").slice(1,).join("\n"))
            }
        })()
        const tunnelIdRegExp = /Tunnel ID.*: *(.+)/i
        if (!tunnelIdRegExp.test(data)) {
            throwError(data)
        }


        const tunnelId = tunnelIdRegExp.exec(data)[1]

        let httpServer;
        try {
            // Setup an HTTP server
            const port = 8910
            // Now, forward the http port

            let promiseResolve;
            let promiseReject; // Call this method to interrupt the entire process of waiting for the webhooks to call back

            let promise = new Promise((resolve, reject) => {
                promiseResolve = resolve
                promiseReject = reject
            })

            httpServer = http.createServer((request, response) => {
                // Whenever HTTP data comes in, let's parse it
                let total = Buffer.alloc(0)
                request.addListener('data', (chunk) => {
                    total = Buffer.concat([total, chunk])
                })

                request.addListener('end', () => {

                    try {
                        response.end('Thank you!')
                        response.destroy()
                        if (total.byteLength == 0) {
                            return
                        }
                        client.webhook.process(
                            JSON.parse(
                                total.toString()
                            )
                        )
                    } catch (e) {
                        const error = new Error(`Could not parse HTTP data, supposedly coming from the webhook server.`, { cause: e })
                        promiseReject(error)
                    }
                })
            })

            httpServer.listen(port)

            child_process.execSync(`devtunnel port create ${tunnelId} -p ${port}`)

            const startTunnel = () => {
                const handle = child_process.exec(`devtunnel host ${tunnelId} -a`, (error, out) => {
                    if (error) {
                        promiseReject(new Error(`Tunnel failed\n`, error))
                    }
                })
                promise.finally(() => {
                    handle.kill('SIGKILL')
                });

            }

            startTunnel()

            // Listen for webhooks
            client.webhook.events.on('payment.collection.completed', (data) => {
                promiseResolve()
            })


            const globalURL = `https://${tunnelId.replace('.', `-${port}.`)}.devtunnels.ms/` //E.g https://9030mqwn-30.euw.devtunnels.ms/

            console.log(`Use this URL to create a webhook on TRANZAK `, globalURL)

            const io = readline.createInterface({ input: process.stdin, output: process.stdout })

            await io.question('Press Enter when you\'re done.')



            setTimeout(() => {
                promiseReject(new Error(`Timeout waiting for webhook to be called. Check that the correct URL was entered on TRANZAK's dashboard`))
            }, 15000)

            try {
                // Now, let's make a transaction, and see if we get the transaction completed callback
                await client.payment.collection.simple.chargeMobileMoney({
                    amount: 25_000,
                    currencyCode: 'XAF',
                    description: `Testing webhooks`,
                    mobileWalletNumber: '237677683958'
                });


                // Wait for the webhooks to be called, and processed
                await promise
            } finally {
                io.close()
            }
        } finally {
            try {
                httpServer?.close()
                child_process.execSync(`devtunnel delete -f ${tunnelId}`)
            } catch { }
        }
    })
}