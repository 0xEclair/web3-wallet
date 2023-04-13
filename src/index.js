import { Wallet, ConnectMetamask, MetamaskSignMessage } from "./wallet.js";

var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
t.Wallet = Wallet
t.ConnectMetamask = ConnectMetamask
t.MetamaskSignMessage = MetamaskSignMessage