"use client";

import React, { ReactNode, useState, useEffect } from 'react';
import config from '../ configuration'
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

// Setup queryClient
const queryClient = new QueryClient()

export function ContextProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);  // This will set `ready` once the component mounts on the client-side.
  }, []);

  return ready ? (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  ) : null;
}