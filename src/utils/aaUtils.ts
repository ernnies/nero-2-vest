import { ethers } from 'ethers';
import { Presets } from 'userop';
import { API_KEY, NERO_CHAIN_CONFIG, AA_PLATFORM_CONFIG, CONTRACT_ADDRESSES } from '../config';

export const getSigner = async () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found. Please install MetaMask.');
  }
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log('Connected wallet address:', address);
    return signer;
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw error;
  }
};

export const getAAWalletAddress = async (accountSigner: ethers.Signer) => {
  try {
    if (!accountSigner || typeof accountSigner.getAddress !== 'function') {
      throw new Error('Invalid signer object: must have a getAddress method');
    }
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      accountSigner,
      NERO_CHAIN_CONFIG.rpcUrl,
      {
        overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
        entryPoint: CONTRACT_ADDRESSES.entryPoint,
        factory: CONTRACT_ADDRESSES.accountFactory,
      }
    );
    const address = await simpleAccount.getSender();
    console.log('AA wallet address:', address);
    return address;
  } catch (error) {
    console.error('Error getting AA wallet address:', error);
    throw error;
  }
};

export const initAABuilder = async (accountSigner: ethers.Signer, apiKey: string = API_KEY) => {
  try {
    const signerAddress = await accountSigner.getAddress();
    console.log('Initializing AA builder for address:', signerAddress);
    const builder = await Presets.Builder.SimpleAccount.init(
      accountSigner,
      NERO_CHAIN_CONFIG.rpcUrl,
      {
        overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
        entryPoint: CONTRACT_ADDRESSES.entryPoint,
        factory: CONTRACT_ADDRESSES.accountFactory,
      }
    );
    builder.setPaymasterOptions({
      apikey: apiKey,
      rpc: AA_PLATFORM_CONFIG.paymasterRpc,
      type: '0', // Default to sponsored gas
    });
    builder.setCallGasLimit(300000);
    builder.setVerificationGasLimit(2000000);
    builder.setPreVerificationGas(100000);
    return builder;
  } catch (error) {
    console.error('Error initializing AA builder:', error);
    throw error;
  }
};