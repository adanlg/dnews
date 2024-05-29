'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import { useAccount } from 'wagmi';
import Image from 'next/image'; // Importing the Image component from next/image

const TokenomicsPage = () => {
  const { isConnected, address } = useAccount();

    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-6 p-6"><strong>TSN token</strong></h1>
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Image src="/coin.gif" alt="Tokenomics" layout='fill' objectFit='contain' />
          </div>
          <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white my-8" style={{ boxShadow: '0 -4px 8px -6px rgba(0,0,0,0.3)' }}>
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6"><strong>Utility</strong></h1>
            <div style={{ position: 'relative', width: '100%', height: '350px' }}>
              <Image src="/tokenomics.png" alt="Tokenomics" layout='fill' objectFit='contain' />
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-center">
              <li><strong>For the writers:</strong> To publish news, you will need to lock a certain amount of the token in the smart contract for the duration of the season, e.g., 1 month. Depending on the rating of the news, the writer will either lose the locked amount or earn additional tokens.</li>
              <li><strong>For the readers with tokens:</strong> They will earn tokens for contributing to the ranking of the news through thumbs up or down.</li>
              <li><strong>For the readers without tokens:</strong> They can access the news just like reading a regular newspaper, without the need for a wallet or login.</li>
              <li><strong>For all holders:</strong> The token grants decision-making power within a DAO. Decisions to vote on may include setting the correct locking amount &quot;x&quot;, determining the percentage of earnings for readers and writers, deciding on advertising inclusion, and more.</li>
            </ul>
          </div>
          <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white my-8" style={{ boxShadow: '0 -4px 8px -6px rgba(0,0,0,0.3)' }}>
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6"><strong>Benefits</strong></h1>
            <div style={{ position: 'relative', width: '100%', height: '500px' }}>
              <Image src="/reading.jpg" alt="Tokenomics" layout='fill' objectFit='contain' />
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-center">
              <li><strong>For the writers:</strong> Earn visibility, reputation, and tokens—if the content is well-received.</li>
              <li><strong>For the readers with tokens:</strong> Earn tokens while staying informed.</li>
              <li><strong>For the readers without tokens:</strong> Access quality news that focuses on substance rather than clickbait.</li>
              <li><strong>For all holders:</strong> Better news - More readers - Increase value of the token that runs the newspaper - Better news... and the cycle keeps going</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default TokenomicsPage;
  
