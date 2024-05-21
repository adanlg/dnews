'use client' 
import React from 'react';
import Navbar from '@/components/Navbar'
import { useAccount } from 'wagmi';
import { checkWalletAccess } from '@/actions/checks';

const TokenomicsPage = () => {
  const { isConnected, address } = useAccount();

//   const handleAccessCheck = async () => {
//     if (isConnected && address) {
//         try {
//             const { hasAccess, message } = await checkWalletAccess(address);
//             alert(`Access status: ${hasAccess ? "Granted" : "Denied"}. ${message}`);
//         } catch (error) {
//             if (error instanceof Error) {  // Type guard for Error
//                 alert(`Error checking access: ${error.message}`);
//             } else {
//                 alert("An unexpected error occurred");
//             }
//         }
//     } else {
//         alert("Please connect your wallet.");
//     }
// };
  return (
    <div>
      <Navbar />
      <h1>Tokenomics</h1>
      <div>
                {/* <button onClick={handleAccessCheck} className='text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
                        Check Access
                    </button> */}
                </div>
      <p>Welcome to the Tokenomics section of our site.</p>
    </div>
  );
};

export default TokenomicsPage;
