'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

const BuyTokenPage = () => {
  const inputTokenAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Replace with your input token address
  const outputTokenAddress = "0x817F1D1F9c249021b70BAEBD0377a3E721298dEB"; // Replace with your output token address
  const chain = "polygon";

  // Adding 'locale' parameter to enforce English
  const uniswapLink = `https://app.uniswap.org/#/swap?inputCurrency=${inputTokenAddress}&outputCurrency=${outputTokenAddress}&chain=${chain}&locale=en`;

  const tokenAddress = "0x817F1D1F9c249021b70BAEBD0377a3E721298dEB"; // Replace with your token address
  
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Hide message after 2 seconds
  };

  return (
    <div>
      <div className="flex-grow flex items-center justify-center">  
        <div className="max-w-4xl w-full p-6 md:rounded-lg shadow-lg bg-white mt-12 md:mt-24">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">Buy NEWS Token</h1>
          <p className="text-center text-gray-600 mb-6">You can now buy NEWS tokens on Uniswap (Polygon network)!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <a 
              href={uniswapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center flex items-center justify-center relative"
            >
              Buy NEWS on Uniswap
            </a>
            <button 
              onClick={handleCopy}
              className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center flex items-center justify-center relative"
            >
              Copy Token Address
              {copySuccess && (
                <span className="absolute inset-0 flex items-center justify-center text-green-400 text-sm font-semibold bg-gray-800 bg-opacity-80 rounded-lg">
                  Copied!
                </span>
              )}
            </button>
          </div>
          <div className="text-center mt-8">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTokenPage;
