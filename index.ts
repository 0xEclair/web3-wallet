import { Wallet } from "./wallet"

const wallet = Wallet.fromPrivateKey("5143b1e558b761763d4c8c99ab0a63e704db3bb4bde49c9b21d0946df4baed27")
wallet.setNetwork("http://192.168.31.220:8545")
wallet.transfer("0xA6aB596Ea8D00Ff8317c3De87F7b680269F9F9DB",  "0.5").then((res) => console.log(res))