'use client'
import { CheckFollowing, NumberFollowers } from '@/actions/Following'
import { getCurrentUserId } from '@/actions/User'
import { getStoriesByAuthor } from '@/actions/getStories'
import { Story } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ClapComponent from './ClapComponent'
import SaveComponent from './SaveComponent'
import AuthorStories from './AuthorStories'

type Props = {
    AuthorImage: string
    PublishedStory: Story
    AuthorEmail: string
    AuthorFirstName:string | null
    AuthorLastName:string | null

}

const AuthorSpecific = ({  AuthorImage,AuthorLastName, PublishedStory, AuthorEmail }: Props) => {
    const [Stories, setStories] = useState<Story[]>([])
    const [NoOfFollowings, setFollowing] = useState<number>()
    const [isfollowed, setisfollowed] = useState<boolean>(false)
    const [currentUserId, setCurrentUserId] = useState<string>()

    useEffect(() => {
        const fetchAuthorStories = async () => {
            try {
                const stories = await getStoriesByAuthor(PublishedStory.id, PublishedStory.authorId)
                if (stories.response)
                    setStories(stories.response)
            } catch (error) {
                console.log("Error fetching data", error)
            }
        }

        fetchAuthorStories()
    }, [PublishedStory])

    useEffect(() => {
        const fetchFollowingStatus = async () => {
            try {
                const response = await CheckFollowing(PublishedStory.authorId)
                if (response?.ifFollowing)
                    setisfollowed(response?.ifFollowing)
            } catch (error) {
                console.log("Error while fetching the following status", error)
            }
        }

        const fetchCurrentUserId = async () => {
            try {
                const UserId = await getCurrentUserId()
                if (UserId)
                    setCurrentUserId(UserId)
            } catch (error) {
                console.log('No user found')
            }
        }

        const fetchFollowing = async () => {
            try {
                const NoOfFollowing = await NumberFollowers(PublishedStory.authorId)
                setFollowing(NoOfFollowing.followers)
            } catch (error) {
                console.log("Error getting no of followers")
            }
        }

        fetchFollowingStatus()
        fetchCurrentUserId()
        fetchFollowing()
    }, [PublishedStory.authorId])

    const FollowAuthor = async () => {
        setisfollowed(!isfollowed)
        try {
            await axios.post('/api/following', {
                AuthorId: PublishedStory.authorId
            })
            console.log('Success following')
        } catch (error) {
            console.log("Error in following the author")
            setisfollowed(!isfollowed)
        }
    }

    return (
        <div className=' py-10'>
            <div className='max-w-[700px] mx-auto'>
                <Image src={AuthorImage} width={72} height={72} className='rounded-full' alt='Author' />
                <div className='flex items-center justify-between border-b-[1px] pb-4'>
                    <div>
                        <p className='text-xl font-medium mt-5'>Written By {PublishedStory.authorId}</p>
                        <p className='text-sm opacity-60 mt-1 '>{NoOfFollowings} followers</p>
                    </div>
                    {/* <div className='flex items-center space-x-4'>
                        <button onClick={FollowAuthor} className={`py-2 px-4 p-2 rounded-full text-sm text-white ${currentUserId === PublishedStory.authorId ? "hidden" : ""} ${isfollowed ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}`}>
                            {`${isfollowed ? "Followed" : "Follow"}`}
                        </button>
                    </div> */}
                </div>
                <p className='text-sm py-5 font-medium'>More from {PublishedStory.authorId}</p>
                <div className='grid grid-cols-1 gap-10'>
                    {Stories.map((story, index) => (
                        <AuthorStories key={story.id} AuthorFirstName={null} AuthorLastName={null} AuthorImage={AuthorImage} story={story} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AuthorSpecific
