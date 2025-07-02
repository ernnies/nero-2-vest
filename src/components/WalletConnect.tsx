import React, { useState, useEffect } from 'react';
import { getSigner, getAAWalletAddress } from '../utils/aaUtils';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';

interface WalletConnectProps {
  onWalletConnected: (eoaAddress: string, aaAddress: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eoaAddress, setEoaAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      const web3authInstance = new Web3Auth({
        clientId: 'YOUR_WEB3AUTH_CLIENT_ID', // Replace with your actual clientId
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x2b1', // NERO Chain ID (689)
          rpcTarget: 'https://rpc-testnet.nerochain.io',
          displayName: 'NERO Testnet',
          blockExplorerUrl: 'https://explorer-testnet.nerochain.io',
          ticker: 'NERO',
          tickerName: 'NERO',
        },
        uiConfig: {
          appName: 'Nero-2-vest',
          theme: 'light',
          loginMethodsOrder: ['google', 'facebook', 'twitter'],
        },
      });
      await web3authInstance.init();
      setWeb3auth(web3authInstance);
    };
    initWeb3Auth();

    const checkWalletConnection = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts && accounts.length > 0) {
            await connectWallet();
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setEoaAddress('');
          setError(null);
        } else {
          connectWallet();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const signer = await getSigner();
      const address = await signer.getAddress();
      setEoaAddress(address);
      const aaWalletAddress = await getAAWalletAddress(signer);
      setIsConnected(true);
      onWalletConnected(address, aaWalletAddress);
      toast.success('Wallet connected successfully!');
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
      toast.error('Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const connectWithSocial = async () => {
    if (!web3auth) return;
    try {
      setIsLoading(true);
      setError(null);
      const web3authProvider = await web3auth.connect();
      if (!web3authProvider) {
        throw new Error('Failed to connect with Web3Auth');
      }
      const provider = new ethers.BrowserProvider(web3authProvider as any);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setEoaAddress(address);
      const aaWalletAddress = await getAAWalletAddress(signer);
      setIsConnected(true);
      onWalletConnected(address, aaWalletAddress);
      toast.success('Social login successful!');
    } catch (error: any) {
      console.error('Error with social login:', error);
      setError(error.message || 'Failed to connect with social login');
      toast.error('Failed to connect with social login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={connectWallet}
        disabled={isLoading || isConnected}
        className="px-4 py-2 bg-nero-blue text-white rounded-lg hover:bg-nero-blue/80 disabled:bg-nero-blue/50 transition duration-300"
      >
        {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect MetaMask'}
      </button>
      <button
        onClick={connectWithSocial}
        disabled={isLoading || isConnected}
        className="px-4 py-2 bg-nero-teal text-white rounded-lg hover:bg-nero-teal/80 disabled:bg-nero-teal/50 transition duration-300"
      >
        {isLoading ? 'Connecting...' : 'Social Login'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {isConnected && (
        <p className="text-nero-dark text-sm">
          Connected: {eoaAddress.slice(0, 6)}...{eoaAddress.slice(-4)}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;