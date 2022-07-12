import { Wallet } from "./wallet"
import { contractAbi, contractAddress } from "./abi";

const wallet = Wallet.fromPrivateKey("5143b1e558b761763d4c8c99ab0a63e704db3bb4bde49c9b21d0946df4baed27")
wallet.setNetwork("https://data-seed-prebsc-2-s2.binance.org:8545")

const erc20Contract  = wallet.contract(contractAddress, contractAbi)

erc20Contract.balanceOf("0xE88a42c47928818E5775fb3cd076792353bE938b").then((res: any) => {
  console.log(res)
})