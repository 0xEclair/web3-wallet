import * as bip39 from "./mnemonic"
import { Wallet } from "./wallet";

console.log(bip39.generateMnemonic())

const wallet = Wallet.fromPrivateKey("0395926aa529dcdc0f283c79f38d99bd1474329801c0b2959e88ca154819410c")
wallet.transfer("0xE225d97d4Fb91365310D9d5C1d2C88014ABec650",  "0.5").then((res) => console.log(res))