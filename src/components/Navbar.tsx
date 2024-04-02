'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ScrollText } from "lucide-react"
import axios from "axios"
import { useRouter } from 'next/navigation' // Corrected from 'next/navigation'
import { MenuIcon } from '@heroicons/react/outline'

type Props = {}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()

    const MakeNewStory = async () => {
        try {
            const response = await axios.post('/api/new-story')
            router.push(`/story/${response.data.id}`)
        } catch (error) {   
            console.error("Error creating new story", error)
        }
    }

    return (
        // <div className='dark:bg-white dark:text-black px-8 py-2 border-b-[1px]'>

        <div className='px-8 py-2 border-b-[1px]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    {/* Hamburger Menu Button */}
                    <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <Link href='/'>
                        <Image src='/medium-icon.svg' width={40} height={40} alt='Medium Logo'/>
                    </Link>
                </div>
                {/* Conditional rendering for the mobile menu based on isMenuOpen */}
                {isMenuOpen && (
                    <div className='absolute top-0 left-0 h-screen w-full bg-white flex flex-col md:hidden z-10 p-5'>
                        {/* Mobile menu links */}
                        <Link href='/me/drafts'>Drafts</Link>
                        <span onClick={MakeNewStory} className='mt-2'>Write</span>
                        <Link href='/me/drafts' className='mt-2'>Me</Link>
                        {/* Additional mobile menu links as needed */}
                    </div>
                )}
                {/* Desktop Menu Items */}
                <div className='hidden md:flex items-center space-x-7'>
                    <span onClick={MakeNewStory} className='flex items-center space-x-2 opacity-70 hover:opacity-100 duration-100 ease-in cursor-pointer'>
                        <p className='font-light text-sm'>Write</p>
                    </span>
                    <Link href='/me/drafts'>
                        <ScrollText size={20} className='mr-1' /> Me
                    </Link>
                    <UserButton signInUrl='/' className='hidden md:block'/>
                </div>
                {/* Show UserButton on smaller screens at the right corner */}
                <div className='md:hidden'>
                    <UserButton signInUrl='/' />
                </div>
            </div>
        </div>
        // </div>

    );
};

export default Navbar;