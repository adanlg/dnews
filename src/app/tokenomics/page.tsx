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
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-6 p-6"><strong>TSN token</strong></h1> {/* Added padding here */}
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <Image src="/coin.gif" alt="Tokenomics" layout='fill' objectFit='contain' />
          </div>
        <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white my-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6"><strong>Utility</strong></h1>
          <div style={{ position: 'relative', width: '100%', height: '350px' }}>
            <Image src="/tokenomics.png" alt="Tokenomics" layout='fill' objectFit='contain' />
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-center">
            <li><strong>For the writers:</strong> To publish a news, you will need to lock &quot;x&quot; amount of the token in the smart contract as long as the season lasts, e.g., 1 month. Depending on the rating of the news, the writer will either lose the amount locked or earn more tokens.</li>
            <li><strong>For the readers with tokens:</strong> They will earn tokens for giving thumbs up or down, contributing to the ranking of the news.</li>
            <li><strong>For the readers without tokens:</strong> They can read the news as a simple newspaper without the need to have a wallet or login.</li>
            <li><strong>For all holders:</strong> The token will confer decision power as in a DAO. There will be questions to vote on, such as the correct amount &quot;x&quot;, the percentage that readers and writers would win, whether to include ads, and more!</li>
          </ul>
        </div>
        <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white my-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6"><strong>Benefits</strong></h1>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image src="/reading.jpg" alt="Tokenomics" layout='fill' objectFit='contain' />
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-center">
            <li><strong>For the writers:</strong> Earns visbility, reputation and tokens (If the content is good)</li>
            <li><strong>For the readers with tokens:</strong> Earn tokens and get informed</li>
            <li><strong>For the readers without tokens:</strong> Get informed by quality news, not clikckbait or time wasting content</li>
            <li><strong>For all holders:</strong> Better news -> more readers -> increase value of the token that runs the newspaper -> Better news ... and the clicle keeps going</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsPage;
