import * as ethers from 'ethers'

export class Wallet {
  private w: ethers.Wallet
  private constructor() {}

  static fromMnemonic(mnemonic: string): Wallet {
    const wallet = new Wallet()
    const provider = new ethers.providers.JsonRpcProvider("http://192.168.31.69:7545")
    wallet.w = new ethers.Wallet(ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0"), provider)

    return wallet
  }

  static fromPrivateKey(privateKey: string): Wallet {
    const wallet = new Wallet()
    const provider = new ethers.providers.JsonRpcProvider("http://192.168.31.69:7545")
    wallet.w = new ethers.Wallet(privateKey, provider)

    return wallet
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
