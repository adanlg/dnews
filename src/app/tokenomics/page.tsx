'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import { useAccount } from 'wagmi';

const TokenomicsPage = () => {
  const { isConnected, address } = useAccount();

  return (
    <div>
      <Navbar />
      <div className="flex-grow flex items-center justify-center min-h-screen">  
        <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white mt-2 md:mt-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Utility of TSN Token</h1>
          <img src="/tokenomics.png" alt="Tokenomics" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="text-center text-gray-600 mb-4">This token will be used to be part of the news ecosystem and will have multiple utilities:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-600 text-center">
            <li><strong>For the writers:</strong> To publish a new you will need to lock "x" amount of the token in the smart contract as long as the season lasts, e.g., 1 month. Depending on the rating of the news, the writer will either lose the amount locked or earn more tokens.</li>
            <li><strong>For the readers with tokens:</strong> They will earn tokens for giving thumbs up or down, contributing to the ranking of the news.</li>
            <li><strong>For the readers without tokens:</strong> They can read the news as a simple newspaper without the need to have a wallet or login.</li>
            <li><strong>For all holders:</strong> The token will confer decision power as in a DAO. There will be questions to vote on, such as the correct amount "x", the percentage that readers and writers would win, whether to include ads, and more!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
