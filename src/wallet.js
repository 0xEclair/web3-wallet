import * as ethers from "ethers"

const defaultPath = "m/44'/60'/0'/0/"

class Wallet {
  static fromMnemonic(mnemonic, path, index) {
    const wallet = new Wallet()
    if(!path) {
      path = defaultPath
    }
    if(!index) {
      index = 0
    }
    wallet.w = new ethers.Wallet(ethers.Wallet.fromMnemonic(mnemonic, path + index.toString()))

    return wallet
  }

  static fromPrivateKey(privateKey) {
    const wallet = new Wallet()
    wallet.w = new ethers.Wallet(privateKey)

    return wallet
  }

  static fromMetamask() {
    if (window.ethereum === undefined || window.ethereum === null) {
      console.log("Please install metamask")
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const wallet = new Wallet()
    wallet.w = provider
    return wallet
  }

  setNetwork(url) {
    const provider = new ethers.providers.JsonRpcProvider(url)
    this.w = new ethers.Wallet(this.w, provider)
  }

  setMetamask() {

  }

  publicKey() {
    return this.useExt()? "unsupported." : this.w.publicKey
  }

  privateKey() {
    return this.useExt()? "unsupported." : this.w.privateKey
  }

  async address() {
    if(this.useExt()) {
      return await this.signer().getAddress()
    }

    return this.w.address
  }

  mnemonic() {
    return this.useExt()? "unsupported." : this.w.mnemonic?.phrase ?? 'The wallet is imported by private key!'
  }

  async signMessage(data) {
    const signer = this.signer()
    return signer.signMessage(data)
  }

  async transfer(to, amount) {
    const value = ethers.utils.parseEther(amount)
    const tx = {
      to,
      value
    }

    const signer = this.signer()
    const limit = await signer.estimateGas(tx)
    const { hash } = await signer.sendTransaction({
      ...tx,
      gasPrice: await signer.getGasPrice(),
      gasLimit: limit,
      nonce: await signer.getTransactionCount()
    })

    return hash
  }

  contract(address, abi) {
    const signer = this.signer()
    return new ethers.Contract(address, abi, signer)
  }

  signer() {
    const signer = this.w.connection?.url === "metamask"? this.w.getSigner() : this.w
    return signer
  }

  useExt() {
    return this.w.connection?.url === "metamask"
  }
}

const ConnectMetamask = async () => {
  const mm = window.ethereum
  if(mm === undefined) {
    console.log("Please install metamask.")
    return null
  }

  const accounts = await mm.request({
    method: "eth_requestAccounts"
  })
  return ethers.utils.getAddress(accounts[0])
}

const MetamaskSignMessage = async (data) => {
  const mm = window.ethereum
  if(mm === undefined) {
    console.log("Please install metamask.")
    return null
  }

  const provider = new ethers.providers.Web3Provider(mm)
  try {
    return await provider.getSigner().signMessage(data)
  }
  catch (error) { }
}

export { Wallet, ConnectMetamask, MetamaskSignMessage }
