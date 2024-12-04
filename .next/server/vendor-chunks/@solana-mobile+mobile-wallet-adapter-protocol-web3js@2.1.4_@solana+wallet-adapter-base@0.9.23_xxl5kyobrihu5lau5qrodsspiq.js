"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@solana-mobile+mobile-wallet-adapter-protocol-web3js@2.1.4_@solana+wallet-adapter-base@0.9.23_xxl5kyobrihu5lau5qrodsspiq";
exports.ids = ["vendor-chunks/@solana-mobile+mobile-wallet-adapter-protocol-web3js@2.1.4_@solana+wallet-adapter-base@0.9.23_xxl5kyobrihu5lau5qrodsspiq"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@solana-mobile+mobile-wallet-adapter-protocol-web3js@2.1.4_@solana+wallet-adapter-base@0.9.23_xxl5kyobrihu5lau5qrodsspiq/node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/lib/esm/index.js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@solana-mobile+mobile-wallet-adapter-protocol-web3js@2.1.4_@solana+wallet-adapter-base@0.9.23_xxl5kyobrihu5lau5qrodsspiq/node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/lib/esm/index.js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   transact: () => (/* binding */ transact),\n/* harmony export */   transactRemote: () => (/* binding */ transactRemote)\n/* harmony export */ });\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @solana/web3.js */ \"(ssr)/./node_modules/.pnpm/@solana+web3.js@1.95.7_bufferutil@4.0.8_utf-8-validate@5.0.10/node_modules/@solana/web3.js/lib/index.esm.js\");\n/* harmony import */ var _solana_mobile_mobile_wallet_adapter_protocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @solana-mobile/mobile-wallet-adapter-protocol */ \"(ssr)/./node_modules/.pnpm/@solana-mobile+mobile-wallet-adapter-protocol@2.1.4_@solana+wallet-adapter-base@0.9.23_@solan_okbunmhfrre3dqqmcjmeidjifa/node_modules/@solana-mobile/mobile-wallet-adapter-protocol/lib/esm/index.js\");\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bs58 */ \"(ssr)/./node_modules/.pnpm/bs58@5.0.0/node_modules/bs58/index.js\");\n\n\n\n\n/******************************************************************************\r\nCopyright (c) Microsoft Corporation.\r\n\r\nPermission to use, copy, modify, and/or distribute this software for any\r\npurpose with or without fee is hereby granted.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r\nPERFORMANCE OF THIS SOFTWARE.\r\n***************************************************************************** */\r\n\r\nfunction __rest(s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r\n            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r\n                t[p[i]] = s[p[i]];\r\n        }\r\n    return t;\r\n}\r\n\r\nfunction __awaiter(thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n}\n\nfunction fromUint8Array(byteArray) {\n    return window.btoa(String.fromCharCode.call(null, ...byteArray));\n}\nfunction toUint8Array(base64EncodedByteArray) {\n    return new Uint8Array(window\n        .atob(base64EncodedByteArray)\n        .split('')\n        .map((c) => c.charCodeAt(0)));\n}\n\nfunction getPayloadFromTransaction(transaction) {\n    const serializedTransaction = 'version' in transaction\n        ? transaction.serialize()\n        : transaction.serialize({\n            requireAllSignatures: false,\n            verifySignatures: false,\n        });\n    const payload = fromUint8Array(serializedTransaction);\n    return payload;\n}\nfunction getTransactionFromWireMessage(byteArray) {\n    const numSignatures = byteArray[0];\n    const messageOffset = numSignatures * _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.SIGNATURE_LENGTH_IN_BYTES + 1;\n    const version = _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.VersionedMessage.deserializeMessageVersion(byteArray.slice(messageOffset, byteArray.length));\n    if (version === 'legacy') {\n        return _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.Transaction.from(byteArray);\n    }\n    else {\n        return _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.VersionedTransaction.deserialize(byteArray);\n    }\n}\nfunction transact(callback, config) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const augmentedCallback = (wallet) => {\n            const augmentedAPI = new Proxy({}, {\n                get(target, p) {\n                    if (target[p] == null) {\n                        switch (p) {\n                            case 'signAndSendTransactions':\n                                target[p] = function (_a) {\n                                    var { minContextSlot, commitment, skipPreflight, maxRetries, waitForCommitmentToSendNextTransaction, transactions } = _a, rest = __rest(_a, [\"minContextSlot\", \"commitment\", \"skipPreflight\", \"maxRetries\", \"waitForCommitmentToSendNextTransaction\", \"transactions\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const payloads = transactions.map(getPayloadFromTransaction);\n                                        const options = {\n                                            min_context_slot: minContextSlot,\n                                            commitment: commitment,\n                                            skip_preflight: skipPreflight,\n                                            max_retries: maxRetries,\n                                            wait_for_commitment_to_send_next_transaction: waitForCommitmentToSendNextTransaction\n                                        };\n                                        const { signatures: base64EncodedSignatures } = yield wallet.signAndSendTransactions(Object.assign(Object.assign(Object.assign({}, rest), (Object.values(options).some(element => element != null)\n                                            ? { options: options }\n                                            : null)), { payloads }));\n                                        const signatures = base64EncodedSignatures.map(toUint8Array).map(bs58__WEBPACK_IMPORTED_MODULE_2__.encode);\n                                        return signatures;\n                                    });\n                                };\n                                break;\n                            case 'signMessages':\n                                target[p] = function (_a) {\n                                    var { payloads } = _a, rest = __rest(_a, [\"payloads\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const base64EncodedPayloads = payloads.map(fromUint8Array);\n                                        const { signed_payloads: base64EncodedSignedMessages } = yield wallet.signMessages(Object.assign(Object.assign({}, rest), { payloads: base64EncodedPayloads }));\n                                        const signedMessages = base64EncodedSignedMessages.map(toUint8Array);\n                                        return signedMessages;\n                                    });\n                                };\n                                break;\n                            case 'signTransactions':\n                                target[p] = function (_a) {\n                                    var { transactions } = _a, rest = __rest(_a, [\"transactions\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const payloads = transactions.map(getPayloadFromTransaction);\n                                        const { signed_payloads: base64EncodedCompiledTransactions } = yield wallet.signTransactions(Object.assign(Object.assign({}, rest), { payloads }));\n                                        const compiledTransactions = base64EncodedCompiledTransactions.map(toUint8Array);\n                                        const signedTransactions = compiledTransactions.map(getTransactionFromWireMessage);\n                                        return signedTransactions;\n                                    });\n                                };\n                                break;\n                            default: {\n                                target[p] = wallet[p];\n                                break;\n                            }\n                        }\n                    }\n                    return target[p];\n                },\n                defineProperty() {\n                    return false;\n                },\n                deleteProperty() {\n                    return false;\n                },\n            });\n            return callback(augmentedAPI);\n        };\n        return yield (0,_solana_mobile_mobile_wallet_adapter_protocol__WEBPACK_IMPORTED_MODULE_1__.transact)(augmentedCallback, config);\n    });\n}\nfunction transactRemote(callback, config) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const augmentedCallback = (wallet) => {\n            const augmentedAPI = new Proxy({}, {\n                get(target, p) {\n                    if (target[p] == null) {\n                        switch (p) {\n                            case 'signAndSendTransactions':\n                                target[p] = function (_a) {\n                                    var { minContextSlot, commitment, skipPreflight, maxRetries, waitForCommitmentToSendNextTransaction, transactions } = _a, rest = __rest(_a, [\"minContextSlot\", \"commitment\", \"skipPreflight\", \"maxRetries\", \"waitForCommitmentToSendNextTransaction\", \"transactions\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const payloads = transactions.map(getPayloadFromTransaction);\n                                        const options = {\n                                            min_context_slot: minContextSlot,\n                                            commitment: commitment,\n                                            skip_preflight: skipPreflight,\n                                            max_retries: maxRetries,\n                                            wait_for_commitment_to_send_next_transaction: waitForCommitmentToSendNextTransaction\n                                        };\n                                        const { signatures: base64EncodedSignatures } = yield wallet.signAndSendTransactions(Object.assign(Object.assign(Object.assign({}, rest), (Object.values(options).some(element => element != null)\n                                            ? { options: options }\n                                            : null)), { payloads }));\n                                        const signatures = base64EncodedSignatures.map(toUint8Array).map(bs58__WEBPACK_IMPORTED_MODULE_2__.encode);\n                                        return signatures;\n                                    });\n                                };\n                                break;\n                            case 'signMessages':\n                                target[p] = function (_a) {\n                                    var { payloads } = _a, rest = __rest(_a, [\"payloads\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const base64EncodedPayloads = payloads.map(fromUint8Array);\n                                        const { signed_payloads: base64EncodedSignedMessages } = yield wallet.signMessages(Object.assign(Object.assign({}, rest), { payloads: base64EncodedPayloads }));\n                                        const signedMessages = base64EncodedSignedMessages.map(toUint8Array);\n                                        return signedMessages;\n                                    });\n                                };\n                                break;\n                            case 'signTransactions':\n                                target[p] = function (_a) {\n                                    var { transactions } = _a, rest = __rest(_a, [\"transactions\"]);\n                                    return __awaiter(this, void 0, void 0, function* () {\n                                        const payloads = transactions.map(getPayloadFromTransaction);\n                                        const { signed_payloads: base64EncodedCompiledTransactions } = yield wallet.signTransactions(Object.assign(Object.assign({}, rest), { payloads }));\n                                        const compiledTransactions = base64EncodedCompiledTransactions.map(toUint8Array);\n                                        const signedTransactions = compiledTransactions.map(getTransactionFromWireMessage);\n                                        return signedTransactions;\n                                    });\n                                };\n                                break;\n                            default: {\n                                target[p] = wallet[p];\n                                break;\n                            }\n                        }\n                    }\n                    return target[p];\n                },\n                defineProperty() {\n                    return false;\n                },\n                deleteProperty() {\n                    return false;\n                },\n            });\n            return callback(augmentedAPI);\n        };\n        return yield (0,_solana_mobile_mobile_wallet_adapter_protocol__WEBPACK_IMPORTED_MODULE_1__.transactRemote)(augmentedCallback, config);\n    });\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNvbGFuYS1tb2JpbGUrbW9iaWxlLXdhbGxldC1hZGFwdGVyLXByb3RvY29sLXdlYjNqc0AyLjEuNF9Ac29sYW5hK3dhbGxldC1hZGFwdGVyLWJhc2VAMC45LjIzX3h4bDVreW9icmlodTVsYXU1cXJvZHNzcGlxL25vZGVfbW9kdWxlcy9Ac29sYW5hLW1vYmlsZS9tb2JpbGUtd2FsbGV0LWFkYXB0ZXItcHJvdG9jb2wtd2ViM2pzL2xpYi9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUg7QUFDVTtBQUNuRzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHNFQUF5QjtBQUNuRSxvQkFBb0IsNkRBQWdCO0FBQ3BDO0FBQ0EsZUFBZSx3REFBVztBQUMxQjtBQUNBO0FBQ0EsZUFBZSxpRUFBb0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhHQUE4RztBQUN4SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsc0NBQXNDLG1GQUFtRjtBQUN6SyxnREFBZ0Q7QUFDaEQsd0RBQXdELFVBQVU7QUFDbEUseUdBQXlHLHdDQUFXO0FBQ3BIO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFdBQVc7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRCwrQ0FBK0MsMERBQTBELFdBQVcsaUNBQWlDO0FBQ3JNO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0EsZ0RBQWdELHFEQUFxRCw4REFBOEQsV0FBVyxVQUFVO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EscUJBQXFCLHVGQUFVO0FBQy9CLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhHQUE4RztBQUN4SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsc0NBQXNDLG1GQUFtRjtBQUN6SyxnREFBZ0Q7QUFDaEQsd0RBQXdELFVBQVU7QUFDbEUseUdBQXlHLHdDQUFXO0FBQ3BIO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFdBQVc7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRCwrQ0FBK0MsMERBQTBELFdBQVcsaUNBQWlDO0FBQ3JNO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0EsZ0RBQWdELHFEQUFxRCw4REFBOEQsV0FBVyxVQUFVO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EscUJBQXFCLDZGQUFnQjtBQUNyQyxLQUFLO0FBQ0w7O0FBRW9DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVtcGxhdGUtbmV4dC10YWlsd2luZC1jb3VudGVyLy4vbm9kZV9tb2R1bGVzLy5wbnBtL0Bzb2xhbmEtbW9iaWxlK21vYmlsZS13YWxsZXQtYWRhcHRlci1wcm90b2NvbC13ZWIzanNAMi4xLjRfQHNvbGFuYSt3YWxsZXQtYWRhcHRlci1iYXNlQDAuOS4yM194eGw1a3lvYnJpaHU1bGF1NXFyb2Rzc3BpcS9ub2RlX21vZHVsZXMvQHNvbGFuYS1tb2JpbGUvbW9iaWxlLXdhbGxldC1hZGFwdGVyLXByb3RvY29sLXdlYjNqcy9saWIvZXNtL2luZGV4LmpzPzA1YWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVyc2lvbmVkTWVzc2FnZSwgVHJhbnNhY3Rpb24sIFZlcnNpb25lZFRyYW5zYWN0aW9uLCBTSUdOQVRVUkVfTEVOR1RIX0lOX0JZVEVTIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IHRyYW5zYWN0IGFzIHRyYW5zYWN0JDEsIHRyYW5zYWN0UmVtb3RlIGFzIHRyYW5zYWN0UmVtb3RlJDEgfSBmcm9tICdAc29sYW5hLW1vYmlsZS9tb2JpbGUtd2FsbGV0LWFkYXB0ZXItcHJvdG9jb2wnO1xuaW1wb3J0IGJzNTggZnJvbSAnYnM1OCc7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XG5cbmZ1bmN0aW9uIGZyb21VaW50OEFycmF5KGJ5dGVBcnJheSkge1xuICAgIHJldHVybiB3aW5kb3cuYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlLmNhbGwobnVsbCwgLi4uYnl0ZUFycmF5KSk7XG59XG5mdW5jdGlvbiB0b1VpbnQ4QXJyYXkoYmFzZTY0RW5jb2RlZEJ5dGVBcnJheSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheSh3aW5kb3dcbiAgICAgICAgLmF0b2IoYmFzZTY0RW5jb2RlZEJ5dGVBcnJheSlcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKChjKSA9PiBjLmNoYXJDb2RlQXQoMCkpKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGF5bG9hZEZyb21UcmFuc2FjdGlvbih0cmFuc2FjdGlvbikge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9ICd2ZXJzaW9uJyBpbiB0cmFuc2FjdGlvblxuICAgICAgICA/IHRyYW5zYWN0aW9uLnNlcmlhbGl6ZSgpXG4gICAgICAgIDogdHJhbnNhY3Rpb24uc2VyaWFsaXplKHtcbiAgICAgICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcmlmeVNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gZnJvbVVpbnQ4QXJyYXkoc2VyaWFsaXplZFRyYW5zYWN0aW9uKTtcbiAgICByZXR1cm4gcGF5bG9hZDtcbn1cbmZ1bmN0aW9uIGdldFRyYW5zYWN0aW9uRnJvbVdpcmVNZXNzYWdlKGJ5dGVBcnJheSkge1xuICAgIGNvbnN0IG51bVNpZ25hdHVyZXMgPSBieXRlQXJyYXlbMF07XG4gICAgY29uc3QgbWVzc2FnZU9mZnNldCA9IG51bVNpZ25hdHVyZXMgKiBTSUdOQVRVUkVfTEVOR1RIX0lOX0JZVEVTICsgMTtcbiAgICBjb25zdCB2ZXJzaW9uID0gVmVyc2lvbmVkTWVzc2FnZS5kZXNlcmlhbGl6ZU1lc3NhZ2VWZXJzaW9uKGJ5dGVBcnJheS5zbGljZShtZXNzYWdlT2Zmc2V0LCBieXRlQXJyYXkubGVuZ3RoKSk7XG4gICAgaWYgKHZlcnNpb24gPT09ICdsZWdhY3knKSB7XG4gICAgICAgIHJldHVybiBUcmFuc2FjdGlvbi5mcm9tKGJ5dGVBcnJheSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gVmVyc2lvbmVkVHJhbnNhY3Rpb24uZGVzZXJpYWxpemUoYnl0ZUFycmF5KTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2FjdChjYWxsYmFjaywgY29uZmlnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgYXVnbWVudGVkQ2FsbGJhY2sgPSAod2FsbGV0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhdWdtZW50ZWRBUEkgPSBuZXcgUHJveHkoe30sIHtcbiAgICAgICAgICAgICAgICBnZXQodGFyZ2V0LCBwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbcF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2lnbkFuZFNlbmRUcmFuc2FjdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcF0gPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB7IG1pbkNvbnRleHRTbG90LCBjb21taXRtZW50LCBza2lwUHJlZmxpZ2h0LCBtYXhSZXRyaWVzLCB3YWl0Rm9yQ29tbWl0bWVudFRvU2VuZE5leHRUcmFuc2FjdGlvbiwgdHJhbnNhY3Rpb25zIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wibWluQ29udGV4dFNsb3RcIiwgXCJjb21taXRtZW50XCIsIFwic2tpcFByZWZsaWdodFwiLCBcIm1heFJldHJpZXNcIiwgXCJ3YWl0Rm9yQ29tbWl0bWVudFRvU2VuZE5leHRUcmFuc2FjdGlvblwiLCBcInRyYW5zYWN0aW9uc1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRzID0gdHJhbnNhY3Rpb25zLm1hcChnZXRQYXlsb2FkRnJvbVRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5fY29udGV4dF9zbG90OiBtaW5Db250ZXh0U2xvdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0bWVudDogY29tbWl0bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpcF9wcmVmbGlnaHQ6IHNraXBQcmVmbGlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heF9yZXRyaWVzOiBtYXhSZXRyaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0X2Zvcl9jb21taXRtZW50X3RvX3NlbmRfbmV4dF90cmFuc2FjdGlvbjogd2FpdEZvckNvbW1pdG1lbnRUb1NlbmROZXh0VHJhbnNhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc2lnbmF0dXJlczogYmFzZTY0RW5jb2RlZFNpZ25hdHVyZXMgfSA9IHlpZWxkIHdhbGxldC5zaWduQW5kU2VuZFRyYW5zYWN0aW9ucyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVzdCksIChPYmplY3QudmFsdWVzKG9wdGlvbnMpLnNvbWUoZWxlbWVudCA9PiBlbGVtZW50ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyBvcHRpb25zOiBvcHRpb25zIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsKSksIHsgcGF5bG9hZHMgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25hdHVyZXMgPSBiYXNlNjRFbmNvZGVkU2lnbmF0dXJlcy5tYXAodG9VaW50OEFycmF5KS5tYXAoYnM1OC5lbmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWduYXR1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NpZ25NZXNzYWdlcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtwXSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgcGF5bG9hZHMgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJwYXlsb2Fkc1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NEVuY29kZWRQYXlsb2FkcyA9IHBheWxvYWRzLm1hcChmcm9tVWludDhBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzaWduZWRfcGF5bG9hZHM6IGJhc2U2NEVuY29kZWRTaWduZWRNZXNzYWdlcyB9ID0geWllbGQgd2FsbGV0LnNpZ25NZXNzYWdlcyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3QpLCB7IHBheWxvYWRzOiBiYXNlNjRFbmNvZGVkUGF5bG9hZHMgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25lZE1lc3NhZ2VzID0gYmFzZTY0RW5jb2RlZFNpZ25lZE1lc3NhZ2VzLm1hcCh0b1VpbnQ4QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWduZWRNZXNzYWdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzaWduVHJhbnNhY3Rpb25zJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3BdID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyB0cmFuc2FjdGlvbnMgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJ0cmFuc2FjdGlvbnNcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkcyA9IHRyYW5zYWN0aW9ucy5tYXAoZ2V0UGF5bG9hZEZyb21UcmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzaWduZWRfcGF5bG9hZHM6IGJhc2U2NEVuY29kZWRDb21waWxlZFRyYW5zYWN0aW9ucyB9ID0geWllbGQgd2FsbGV0LnNpZ25UcmFuc2FjdGlvbnMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN0KSwgeyBwYXlsb2FkcyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcGlsZWRUcmFuc2FjdGlvbnMgPSBiYXNlNjRFbmNvZGVkQ29tcGlsZWRUcmFuc2FjdGlvbnMubWFwKHRvVWludDhBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2lnbmVkVHJhbnNhY3Rpb25zID0gY29tcGlsZWRUcmFuc2FjdGlvbnMubWFwKGdldFRyYW5zYWN0aW9uRnJvbVdpcmVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2lnbmVkVHJhbnNhY3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3BdID0gd2FsbGV0W3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwXTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWxldGVQcm9wZXJ0eSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhhdWdtZW50ZWRBUEkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geWllbGQgdHJhbnNhY3QkMShhdWdtZW50ZWRDYWxsYmFjaywgY29uZmlnKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHRyYW5zYWN0UmVtb3RlKGNhbGxiYWNrLCBjb25maWcpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBhdWdtZW50ZWRDYWxsYmFjayA9ICh3YWxsZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF1Z21lbnRlZEFQSSA9IG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgICAgICAgIGdldCh0YXJnZXQsIHApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldFtwXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzaWduQW5kU2VuZFRyYW5zYWN0aW9ucyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtwXSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHsgbWluQ29udGV4dFNsb3QsIGNvbW1pdG1lbnQsIHNraXBQcmVmbGlnaHQsIG1heFJldHJpZXMsIHdhaXRGb3JDb21taXRtZW50VG9TZW5kTmV4dFRyYW5zYWN0aW9uLCB0cmFuc2FjdGlvbnMgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJtaW5Db250ZXh0U2xvdFwiLCBcImNvbW1pdG1lbnRcIiwgXCJza2lwUHJlZmxpZ2h0XCIsIFwibWF4UmV0cmllc1wiLCBcIndhaXRGb3JDb21taXRtZW50VG9TZW5kTmV4dFRyYW5zYWN0aW9uXCIsIFwidHJhbnNhY3Rpb25zXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZHMgPSB0cmFuc2FjdGlvbnMubWFwKGdldFBheWxvYWRGcm9tVHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbl9jb250ZXh0X3Nsb3Q6IG1pbkNvbnRleHRTbG90LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRtZW50OiBjb21taXRtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwX3ByZWZsaWdodDogc2tpcFByZWZsaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4X3JldHJpZXM6IG1heFJldHJpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRfZm9yX2NvbW1pdG1lbnRfdG9fc2VuZF9uZXh0X3RyYW5zYWN0aW9uOiB3YWl0Rm9yQ29tbWl0bWVudFRvU2VuZE5leHRUcmFuc2FjdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzaWduYXR1cmVzOiBiYXNlNjRFbmNvZGVkU2lnbmF0dXJlcyB9ID0geWllbGQgd2FsbGV0LnNpZ25BbmRTZW5kVHJhbnNhY3Rpb25zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN0KSwgKE9iamVjdC52YWx1ZXMob3B0aW9ucykuc29tZShlbGVtZW50ID0+IGVsZW1lbnQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7IG9wdGlvbnM6IG9wdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwpKSwgeyBwYXlsb2FkcyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2lnbmF0dXJlcyA9IGJhc2U2NEVuY29kZWRTaWduYXR1cmVzLm1hcCh0b1VpbnQ4QXJyYXkpLm1hcChiczU4LmVuY29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpZ25hdHVyZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2lnbk1lc3NhZ2VzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3BdID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeyBwYXlsb2FkcyB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInBheWxvYWRzXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0RW5jb2RlZFBheWxvYWRzID0gcGF5bG9hZHMubWFwKGZyb21VaW50OEFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNpZ25lZF9wYXlsb2FkczogYmFzZTY0RW5jb2RlZFNpZ25lZE1lc3NhZ2VzIH0gPSB5aWVsZCB3YWxsZXQuc2lnbk1lc3NhZ2VzKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVzdCksIHsgcGF5bG9hZHM6IGJhc2U2NEVuY29kZWRQYXlsb2FkcyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2lnbmVkTWVzc2FnZXMgPSBiYXNlNjRFbmNvZGVkU2lnbmVkTWVzc2FnZXMubWFwKHRvVWludDhBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpZ25lZE1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NpZ25UcmFuc2FjdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcF0gPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB7IHRyYW5zYWN0aW9ucyB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInRyYW5zYWN0aW9uc1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRzID0gdHJhbnNhY3Rpb25zLm1hcChnZXRQYXlsb2FkRnJvbVRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNpZ25lZF9wYXlsb2FkczogYmFzZTY0RW5jb2RlZENvbXBpbGVkVHJhbnNhY3Rpb25zIH0gPSB5aWVsZCB3YWxsZXQuc2lnblRyYW5zYWN0aW9ucyhPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3QpLCB7IHBheWxvYWRzIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21waWxlZFRyYW5zYWN0aW9ucyA9IGJhc2U2NEVuY29kZWRDb21waWxlZFRyYW5zYWN0aW9ucy5tYXAodG9VaW50OEFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWduZWRUcmFuc2FjdGlvbnMgPSBjb21waWxlZFRyYW5zYWN0aW9ucy5tYXAoZ2V0VHJhbnNhY3Rpb25Gcm9tV2lyZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWduZWRUcmFuc2FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcF0gPSB3YWxsZXRbcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3BdO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGF1Z21lbnRlZEFQSSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB5aWVsZCB0cmFuc2FjdFJlbW90ZSQxKGF1Z21lbnRlZENhbGxiYWNrLCBjb25maWcpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyB0cmFuc2FjdCwgdHJhbnNhY3RSZW1vdGUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@solana-mobile+mobile-wallet-adapter-protocol-web3js@2.1.4_@solana+wallet-adapter-base@0.9.23_xxl5kyobrihu5lau5qrodsspiq/node_modules/@solana-mobile/mobile-wallet-adapter-protocol-web3js/lib/esm/index.js\n");

/***/ })

};
;