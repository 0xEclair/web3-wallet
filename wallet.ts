import * as ethers from "ethers"

const defaultPath = "m/44'/60'/0'/0/"

export class Wallet {
  private w: ethers.Wallet
  private constructor() {}

  static fromMnemonic(mnemonic: string, path?: string, index?: number): Wallet {
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

  static fromPrivateKey(privateKey: string): Wallet {
    const wallet = new Wallet()
    wallet.w = new ethers.Wallet(privateKey)

    return wallet
  }

  setNetwork(url: string) {
    const provider = new ethers.providers.JsonRpcProvider(url)
    this.w = new ethers.Wallet(this.w, provider)
  }

  publicKey(): string {
    return this.w.publicKey
  }

  privateKey(): string {
    return this.w.privateKey
  }

  address(): string {
    return this.w.address
  }

  mnemonic(): string {
    return this.w.mnemonic?.phrase || 'The wallet is imported by private key!'
  }

  async signMessage(data: string): Promise<string> {
    return this.w.signMessage(data)
  }

  async transfer(to: string, amount: string): Promise<ethers.ethers.providers.TransactionResponse> {
    const value = ethers.utils.parseEther(amount)
    const tx = {
      to,
      value
    }
    const limit = await this.w.estimateGas(tx)
    return this.w.sendTransaction({
      ...tx,
      gasPrice: await this.w.provider.getGasPrice(),
      gasLimit: limit,
      nonce: await this.w.getTransactionCount()
    })
  }

  contract(address: string, abi: string): ethers.Contract {
    return new ethers.Contract(address, abi, this.w)
  }

  log(): string {
    const strings = [
      this.publicKey(),
      this.privateKey(),
      this.address(),
      this.mnemonic(),
      '\n'
    ]
    return strings.join('\n')
  }
}

// bsc path: m/44'/714'/0'/0/0
