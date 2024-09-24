
'use client'

// import { UserButton, SignInWithMetamaskButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import WalletConnectButton from './WalletConnect'; // Ensure the path is correct
import {ConnectButton} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
// import { useWalletAccessControl } from '@/actions/checks';

import { checkWalletAccess } from '@/actions/checks';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    // const { isSignedIn } = useUser();
    const { isConnected, address } = useAccount();
    const [isActive, setIsActive] = useState(false); // Add this state for managing active link state


    const MakeNewStory = async () => {
      if (!isConnected || !address) {
          alert("Before writting you have to connect your wallet and have at least 1 TSN token");
          return;
      }

      try {
          const { hasAccess, message } = await checkWalletAccess(address);
          if (!hasAccess) {
              alert(`Access Denied: ${message}`);
              router.push('/token'); // Redirect to buy token page if access is not granted
              return;
          }

          const response = await axios.post('/api/new-story', { userId: address });
          router.push(`/story/${response.data.id}?address=${address}`);
        } catch (error) {
          console.error("Error creating new story", error);
          if (error instanceof Error) {
          } else {
          }
      }
  };
    const showAddressOrMessage = () => {
        if (isConnected && address) {
        } else {
        }
    };
    const handleLinkClick = (path: string) => {
        setIsActive(true); // Activate the link
        setTimeout(() => {
            router.push(path);
            setIsActive(false); // Deactivate after navigation
        }, 150); // Adjust timing as needed
    };
    

    // const handleAccessCheck = async () => {
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
        <>
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-100%);
                    }
                }
                .menu-container {
                    transform: translateX(-100%);
                    animation: ${isMenuOpen ? 'slideIn' : 'slideOut'} 0.5s forwards;
                    width: 100%;
                }
                .menu-hidden {
                    display: none;
                }
                .interactive-link {
                    transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
                    display: block;
                    padding: 8px; /* More padding for better touch target */
                }
                @media (max-width: 768px) {
                    .interactive-link:active {
                        transform: scale(1.05); /* More subtle scale */
                        background-color: rgba(255, 255, 255, 0.3); /* Light background effect */
                    }
                }   
                .nav-link {
                    color: white; /* Set text color to white */
                    transition: color 1s ease-in-out; /* Smooth transition for hover effects */
                }
                .nav-link:hover {
                    color: #ccc; /* Lighter color on hover for better interaction feedback */
                }
            `}</style>
<div className='px-8 py-2 bg-gradient-to-b from-zinc-600 from-10% via-zinc-500 via-90% to-stone-100 to-110% '>
                <div className='flex items-center justify-between'>
                {isMenuOpen ? (
                        <div className='md:hidden z-50' onClick={() => setIsMenuOpen(false)}>
                            <XIcon className="h-6 w-6 text-white" />
                        </div>
                    ) : (
                        <button className='md:hidden z-50' onClick={() => setIsMenuOpen(true)}>
                            <MenuIcon className="h-6 w-6 text-white" />
                        </button>
                    )}

                    <div className='flex-grow'>
                        <Link href='/' passHref>
                            <div className='flex justify-center md:justify-between w-full'>
                                <Image src='/TheSimpleNewspaper.gif' width={90} height={40} alt='Medium Logo'/>
                            </div>
                        </Link>
                    </div>
                    <div className='hidden md:flex items-center space-x-9 pr-8'>
                    <Link href='/' passHref>
                            <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer font-bold'>
                                <p className='nav-link'>Home</p>
                            </span>
                        </Link>
                        <Link href='/tokenomics' passHref>
                            <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer font-bold'>
                                <p className='nav-link'>Tokenomics</p>
                            </span>
                        </Link>
                        <Link href='/token' passHref>
                            <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer font-bold'>
                                <p className='nav-link'>Buy token</p>
                            </span>
                        </Link>
                        <button onClick={MakeNewStory} className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer font-bold'>
                            <p className='nav-link'>Write</p>
                        </button>
                    </div>
                    {/* <UserButton signInUrl='/'/> */}
                    { (
                        <div onClick={showAddressOrMessage} className=" wallet-connect-btn ">
<ConnectButton.Custom>
  {({
    account,
    chain,
    openAccountModal,
    openChainModal,
    openConnectModal,
    authenticationStatus,
    mounted,
  }) => {
    const ready = mounted && authenticationStatus !== 'loading';
    const connected = ready && account && chain;

    return (
      <div
        {...(!ready && {
          'aria-hidden': true,
          style: {
            opacity: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          },
        })}
      >
        {(() => {
          if (!connected) {
            return (
              <button
                onClick={openConnectModal}
                type="button"
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                Connect Wallet
              </button>
            );
          }

          if (chain.unsupported) {
            return (
              <button
                onClick={openChainModal}
                type="button"
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
              >
                Wrong network
              </button>
            );
          }

          return (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={openAccountModal}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 flex items-center space-x-2"
                type="button"
              >
                <span className="block bg-blue-500 rounded-full p-1">
                  {/* {account.hasIcon && (
                    <img
                      alt={account.displayName ?? 'Account icon'}
                      src={account.iconUrl}
                      className="h-6 w-6 rounded-full"
                    />
                  )} */}
                </span>
                <span>{account.displayName}</span>
                {/* {account.displayBalance && (
                  <span> ({account.displayBalance})</span>
                )} */}
              </button>
            </div>
          );
        })()}
      </div>
    );
  }}
</ConnectButton.Custom>
            </div>
                    )}
                </div>
                {/* <div>
                <button onClick={handleAccessCheck} className='text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
                        Check Access
                    </button>
                </div> */}
                <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-500 transform ${isMenuOpen ? 'menu-container' : 'menu-hidden'} z-40`}>
                    <div className='text-white p-5'>
                    <div className='flex justify-between items-start'>
                    <div className='text-left' style={{marginTop: '15%'}}>
                    <a onClick={(e) => handleLinkClick('/')} className='interactive-link'>Home</a>

    <a onClick={(e) => handleLinkClick('/tokenomics')} className='interactive-link'>Tokenomics</a>
    <a onClick={(e) => handleLinkClick('/token')} className='interactive-link'>Buy token</a>
    <span onClick={() => { setIsMenuOpen(false); MakeNewStory(); }} className='interactive-link'>
        Write
    </span>
</div>

                    </div>


                    </div>
                </div>
            </div>
        </>
    );
    
};

export default Navbar;





//cekkekekkek c d  sa  d a