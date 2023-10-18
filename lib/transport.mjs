/**
 * Copyright 2023 HolyCorn Software
 * The tranzak-node library
 * This module (transport) is the heart of communication in the library.
 * It is responsible for making requests, and sending responses
 */

import { transport } from "./section.mjs";
import SimpleCache from "./simple-cache.mjs";
let realFetch;

/**
 * 
 * @param  { URL | RequestInfo} url
 * @param {RequestInit}  init
 */
async function fetch(url, init) {
    realFetch ||= (await import('node-fetch')).default
    return await realFetch(...arguments)
}


const credentials = Symbol()
const authCache = Symbol()

export default class Transport {

    /**
     * 
     * @param {tranzak_node.Credentials} _credentials 
     */
    constructor(_credentials) {

        this[credentials] = _credentials


    }
    get apiUrl() {
        return this[credentials].apiUrl || (this[credentials].mode ?? 'live') === 'sandbox' ? `https://sandbox.dsapi.tranzak.me` : `https://dsapi.tranzak.me`
    }

    /**
     * This method authenticates to the server's backend, and returns an authentication token.
     * 
     * This method already incoporates caching.
     */
    async getAuthToken() {

        if (!this[authCache]) {


            this[authCache] = new SimpleCache(
                {
                    get: async () => {

                        const response = await (await fetch(`${this.apiUrl}/auth/token`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    appKey: this[credentials].appKey,
                                    appId: this[credentials].appId
                                }
                            )
                        })).json()

                        if (!response.success) {
                            const error = Error(`Could not authenticate with server: ${response.errorMsg}`)
                            error.fatal = false
                            throw error
                        }

                        /** @type {string} */
                        const token = response.data.token

                        const tokenLife = response.data.expires * 1000

                        // In case the token's lifespan changes without our knowledge
                        if (tokenLife < this[authCache].timeout) {
                            this[authCache].timeout = tokenLife * 0.9;
                        }

                        return token
                    },
                    timeout: (1.8 * 60 * 60 * 1000) // The token is valid for 1 hour and 50 minutes
                }
            );

        }

        return await this[authCache].get()

    }

    /**
     * This method makes an authenticated request to the server.
     * The method will throw an error, if the server responds with an error, even if request went through
     * @param {object} param0 
     * @param {string} param0.path
     * @param {object} param0.body
     * @param {'GET'|"POST"} param0.method
     * @param {object} param0.headers
     * @returns {Promise<object>}
     */
    async request({ path, body, method, headers }) {
        method ??= (typeof body === 'undefined') ? 'GET' : 'POST';
        try {
            const reply = await (
                await fetch(
                    new URL(path, `${this.apiUrl}/xp021/`).href,
                    {
                        method,
                        body: method.toUpperCase() == "POST" ? JSON.stringify(body) : undefined,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer: ${await this.getAuthToken()}`,
                            ...headers
                        }
                    }
                )
            ).json()
            if (!reply.success) {
                const error = new Error(reply.errorMsg)
                error.fatal = false
                error.code = reply.errorCode
                throw error
            }
            return reply.data
        } catch (e) {
            e.fatal = false
            throw e
        }
    }

    /**
     * @template Input
     * @template Output
     * This method makes an authenticated request to the server, in the knowledge that the servers response will be {@link tranzak_node.PaginatedResponse paginated}
     * @param {object} param0 
     * @param {string} param0.path
     * @param {object} param0.body
     * @param {'GET'|"POST"} param0.method
     * @param {(input: Input)=> Output} param0.transform
     * @param {object} param0.headers
     */
    async* paginatedRequest({ path, body, method, headers, transform }) {

        let pageIndex = 1;
        let done;

        const fetchNextBatch = async () => {
            /**
             * @type {tranzak_node.PaginatedResponse<Output>}
             */
            const data = await this.request({ path: `${path}?page=${pageIndex}`, body, method, headers })
            done = !data.hasMore
            return data.list

        }
        while (!done) {
            const set = await fetchNextBatch()
            if (set.length == 0) {
                break;
            }
            for (const item of set) {
                yield transform(item, this[transport])
            }
            pageIndex += 1
        }

    }



}