'use client'

import { cookieStorage, createStorage } from 'wagmi';
import { getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
  sepolia,
} from 'wagmi/chains';

// Ensure the project ID is a string
export const projectId = '8858363ef9c0a7419bc2570702a5efc9'

const avalanche: Chain = {
  id: 43114,
  name: 'Avalanche Mainnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://api.avax.network/ext/bc/C/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io/' },
  },
  testnet: false,
};

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "App",
  chains: [avalanche, mainnet, goerli, polygon, optimism, arbitrum, base, zora, sepolia],
  ssr: false,
  projectId,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export default config;