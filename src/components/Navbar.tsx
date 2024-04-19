'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const MakeNewStory = async () => {
        try {
            const response = await axios.post('/api/new-story');
            router.push(`/story/${response.data.id}`);
        } catch (error) {
            console.error("Error creating new story", error);
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
            <div className='px-8 py-2 dark:bg-zinc-800'>
                <div className='flex items-center justify-between'>
                    {/* Hamburger Menu Button */}
                    <button className= 'md:hidden z-50' onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                    <button onClick={MakeNewStory} className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                        <p className='font-light text-sm'>Write</p>
                    </button>
                    <Link href='/me/drafts' passHref>
                        <span className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                            <p className='font-light text-sm'>Me</p>
                        </span>
                    </Link>
                    </div>
                    <UserButton signInUrl='/'/>
                     {/* className='z-50'  */}
                </div>
                <div className={`fixed top-0 left-0 h-full w-64 bg-black transform ${isMenuOpen ? 'menu-container' : 'menu-hidden'} z-40`}>
                    <div className='text-white p-5'>
                        {/* Close button */}
                        <div className='flex justify-between items-start'>
                            <div className='text-left' style={{marginTop: '15%'}}>
                                <Link href='/me/drafts'><span className='block py-2'>Drafts</span></Link>
                                <span onClick={MakeNewStory} className='block text-left py-2 cursor-pointer'>Write</span>
                                <Link href='/me/drafts'><span className='block py-2'>Me</span></Link>
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
//checkoppoint2