# <div style='display:flex;align-items:center;gap:1em'><img src='./assets/icon.png' style='width:2em;height:2em;object-fit:contain;object-position:center;'> <div style='display:inline-flex'>TRANZAK Nodejs API client</div></div>

    This client allows the use of TRANZAK APIs via Nodejs.
The documentation for the REST APIs, can be found [<b style='font-size:1.35em'>here</b>](https://docs.developer.tranzak.me/).

## Payment

#### Just flow with the code-completion.

For example

```js
    import TRANZAK from 'tranzak-node'
    const client = new TRANZAK(
        {
            appId: 'aprb1ozfx10r31',
            appKey: '939AC5BF3348EA37FC24C34209AF71DC',
            mode: 'sandbox', // You can as well use 'live', or leave it blank. Leaving blank, also means, 'live'
        }
    )

    
    const transaction = await client.payment.collection.simple.chargeMobileMoney(
        {
            amount: 27_000,
            currencyCode: 'XAF',
            description: `Payment for shoes`,
            payerNote: `Payment for shoes.`,
            mchTransactionRef: shortUUID.generate(),
            mobileWalletNumber: `237677683958`,
        }
    )
    // Some time later
    await transaction.refresh()


    if (transaction.data.status === 'SUCCESSFUL') {
        console.log(`Our client just confirmed the transaction.\nHow sweet!`)

        // And later

        //Let's send the money to the payout account
        const collectionAccount = (await client.account.list()).find(acc => acc.data.accountId === transaction.data.merchant.accountId)

        await client.payment.transfer.simple.toPayoutAccount(
            {
                amount: 25_200,
                currencyCode: 'XAF',
                customTransactionRef: collectionAccount.data.accountId,
                description: `For payouts`,
                payeeNote: 'For payouts.',
                fundingAccountId: collectionAccount.data.accountId
            }
        )


        await client.payment.transfer.simple.toMobileMoney(
            {
                payeeAccountId: '237677683958',
                amount: 25_100,
                currencyCode: 'XAF',
                customTransactionRef: shortUUID.generate(),
                description: `For procurement of materials.`,
                payeeNote: `Procument of materials`,
            }
        )

        console.log(`Money successfully transferred to the procurement officer.`)

    }

    // Or, for other non-direct payment methods, use web redirect.
    const transaction = await client.payment.collection.simple.chargeByWebRedirect(
        {
            mchTransactionRef: shortUUID.generate()
        }
    )

    console.log(`Dear client, go to `, transaction.links.paymentAuthUrl)

```

Also, you can use the package in commonjs fashion; like so

```js
    const tranzak_node = require('tranzak-node')
    // bla bla bla
```

#### Payment Methods
<blockquote >Mobile Money payments can be handled directly, using <b style='color:#79a'>payment.transfer.simple.toMobileMoney()</b> or <b style='color:#79a'>payment.collection.simple.chargeMobileMoney()</b>.

All other payments such as card, and bank, are handle via <b style='color:#afb'>web redirect</b>.
</blockquote>


<div style='color:transparent;min-height:4em'>
---
</div>

## Webhooks
This library also comes with functionality to help you process webhooks.
Use the ``` client.webhook ``` property, to access those features.

**When data is processed, the processor emits an event** with fully qualified transaction information.

For example:

```js

    import TRANZAK from 'tranzak-node'
    const client = new TRANZAK(
        {
            appId: 'aprb1ozfx10r31',
            appKey: '939AC5BF3348EA37FC24C34209AF71DC',
            mode: 'sandbox',
        }
    );

    // Whenever a transaction is complete, we'll receive the event here
    client.webhook.addListener('payment.collection.completed', (transaction) => { // remember to flow with the auto-complete
        console.log(`Dear user, transaction complete. ID: `, transaction.data.requestId)
    })

    // And whenever a transaction is canceled, we'll know from here
    client.webhook.addListener('payment.collection.canceled', (transaction) => { // remember to flow with the auto-complete
        console.log(`Dear user, the transaction was canceled. ID: `, transaction.data.requestId)
    })

    // Now, go to the developer portal (https://developer.tranzak.me), and configure webhooks.

```
Whenever you receive HTTP data via the server you've configured, parse the body in JSON, and send the object to the webhook processor like so...

```js

    const somedata = JSON.parse(someRequestBody)

    try {
        let status = await client.webhook.process(somedata)

        if (status == false) {
            // Someone tried to lie to you, by using fake webhook data. Ignore it
        }

        if (status == true) {
            // The data was true, and an event has been emited
        }
        
    } catch (error){
        // There was actually a problem with the API, not your webhook message. Perhaps try again later.
    }
```

<div style='color:transparent;min-height:8em'>
---
</div>

## SMS
Sending SMS messages is quite simple.

Just call `client.sms.send()`

For example
```
    const reply = await client.sms.send({
        phones: ['+237677683958', '+237682477786', '+237676318634'], // Array of phone numbers
        msg: "Dear team, let's begin." // ASCII characters of text.
    })
    console.log(`API server said:\n`, reply)
```
### NOTE: 
    The phone numbers should be formatted according to international standards.
    Before you send SMS, top-up your SMS balance from the partner portal.
    An SMS is allowed up to 160 characters. Sending an SMS with more characters, would have you billed accordingly. For example, 320 characters would be two (2) messages. Check the response of the API server to know how you were billed.


#### Proudly created, and maintained by [<b>HolyCorn Software</b>](https://github.com/HolyCorn-Software).