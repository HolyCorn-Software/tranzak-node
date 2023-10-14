"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
async function _default(client, test) {
  await (await Promise.resolve().then(() => _interopRequireWildcard(require("./collection/test.js")))).default(client, test);
  await (await Promise.resolve().then(() => _interopRequireWildcard(require("./transfer/test.js")))).default(client, test);
}