import * as bip39 from 'bip39';

export const generateMnemonic = (): string => {
  return bip39.generateMnemonic();
};

export const mnemonicToSeed = (mnemonic: string): string => {
  return bip39.mnemonicToSeedSync(mnemonic).toString('hex');
};

const mnemonicToEntropy = (mnemonic: string): string => {
  return bip39.mnemonicToEntropy(mnemonic);
};

export const validateMnemonic = (mnemonic: string): boolean => {
  return bip39.validateMnemonic(mnemonic);
};
