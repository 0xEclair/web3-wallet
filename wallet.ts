import * as ethers from 'ethers'

export class Wallet {
  private w: ethers.Wallet
  private constructor() {}

  static fromMnemonic(mnemonic: string): Wallet {
    const wallet = new Wallet()
    wallet.w = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0")

    return wallet
  }

  static fromPrivateKey(privateKey: string): Wallet {
    const wallet = new Wallet()
    wallet.w = new ethers.Wallet(privateKey)

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
