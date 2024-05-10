
'use client'

import { UserButton, SignInWithMetamaskButton, useUser } from '@clerk/nextjs';
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
    const { isSignedIn } = useUser();
    const { isConnected, address } = useAccount();


    const MakeNewStory = async () => {
        try {
            const response = await axios.post('/api/new-story');
            router.push(`/story/${response.data.id}`);
        } catch (error) {
            console.error("Error creating new story", error);
        }
    };
    const showAddressOrMessage = () => {
        if (isConnected && address) {
            alert(`Connected with address: ${address}`);
        } else {
            alert("No connected address.");
        }
    };

    const handleAccessCheck = async () => {
        if (isConnected && address) {
            try {
                const { hasAccess, message } = await checkWalletAccess(address);
                alert(`Access status: ${hasAccess ? "Granted" : "Denied"}. ${message}`);
            } catch (error) {
                if (error instanceof Error) {  // Type guard for Error
                    alert(`Error checking access: ${error.message}`);
                } else {
                    alert("An unexpected error occurred");
                }
            }
        } else {
            alert("Please connect your wallet.");
        }
    };

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
                    animation: slideIn 0.5s forwards;
                    width: 100%;
                }
                .menu-hidden {
                    animation: slideOut 0.5s forwards;
                }
            `}</style>
            <div className='px-8 py-2 bg-zinc-500'>
                <div className='flex items-center justify-between'>
                    <button className='md:hidden z-50' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <div className='flex-grow'>
                        <Link href='/' passHref>
                            <div className='flex justify-center md:justify-between w-full'>
                                <Image src='/TheSimpleNewspaper.gif' width={90} height={40} alt='Medium Logo'/>
                            </div>
                        </Link>
                    </div>
                    <div className='hidden md:flex items-center space-x-9 pr-8'>
                        <Link href='/tokenomics' passHref>
                            <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                                <p className='font-light text-sm'>Tokenomics</p>
                            </span>
                        </Link>
                        <Link href='/token' passHref>
                            <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                                <p className='font-light text-sm'>Buy token</p>
                            </span>
                        </Link>
                        <button onClick={MakeNewStory} className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                            <p className='font-light text-sm'>Write</p>
                        </button>
                    </div>
                    <UserButton signInUrl='/'/>
                    {!isSignedIn && (
                        <div onClick={showAddressOrMessage} className=" wallet-connect-btn ">
                            <ConnectButton />
                        </div>
                    )}
                </div>
                <div>
                <button onClick={handleAccessCheck} className='text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
                        Check Access
                    </button>
                </div>
                <div className={`fixed top-0 left-0 h-full w-64 bg-zinc-500 transform ${isMenuOpen ? 'menu-container' : 'menu-hidden'} z-40`}>
                    <div className='text-white p-5'>
                        <div className='flex justify-between items-start'>
                            <div className='text-left' style={{marginTop: '15%'}}>
                                <Link href='/tokenomics'><span className='block py-2'>Tokenomics</span></Link>
                                <Link href='/token'><span className='block py-2'>Buy token</span></Link>
                                <span onClick={MakeNewStory} className='block text-left py-2 cursor-pointer'>Write</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)} className="mb-5">
                                <XIcon className="h-8 w-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default Navbar;
