'use client'

import { Story } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getUser } from '@/actions/User'  // Asegúrate de tener una función `getUser` implementada en `@/actions/User`

type Props = {
    stories: Story[]
    TotalDrafts?: number
    TotalPublished?: number
    TotalSaved?: number
}

const StoryPage = ({ stories, TotalDrafts, TotalPublished, TotalSaved }: Props) => {
    const pathname = usePathname()
    const path = pathname.split('/')[2]
    const router = useRouter()

    const EditStory = async (storyId: string) => {
        try {
            const response = await axios.patch('/api/editstory', {
                storyId
            })
            router.push(`/story/${response.data.id}`)
        } catch (error) {
            console.log("Error editing data")
        }
    }

    const MakeNewStory = async () => {
        try {
            const response = await axios.post('/api/new-story')
            router.push(`/story/${response.data.id}`)
            console.log(response)
        } catch (error) {
            console.log("Error creating new story", error)
        }
    }

    return (
        <div className='w-full mx-auto mt-12'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[42px] font-semibold'>Your Stories</h1>
                <button onClick={MakeNewStory} className='bg-green-600 hover:bg-green-700 px-4 py-[6px] rounded-full text-white text-sm'>New Story+</button>
            </div>
            <div className='flex items-center space-x-6 border-b-[1px] mt-2'>
                <Link href='/me/drafts' className={`${path === 'drafts' ? "border-b-[1px] border-neutral-800 opacity-100" : "opacity-60"} text-sm pb-4`}>drafts {TotalDrafts}</Link>
                <Link href='/me/published' className={`${path === 'published' ? "border-b-[1px] border-neutral-800 opacity-100" : "opacity-60"} text-sm pb-4`}>published {TotalPublished}</Link>
                <Link href='/me/saved' className={`${path === 'saved' ? "border-b-[1px] border-neutral-800 opacity-100" : "opacity-60"} text-sm pb-4`}>saved {TotalSaved}</Link>
            </div>
            {path === 'drafts' && (
                <div className='mt-5'>
                    {stories.map((story) => {
                        const match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
                        const stripHtmlTags = (htmlString: string) => {
                            return htmlString.replace(/<[^>]*>/g, '');
                        };

                        const h1Element = match ? match[1] : '';
                        const H1Element = stripHtmlTags(h1Element)
                        return (
                            <Link key={story.id} href={`/story/${story.id}`}>
                                <div className='py-5'>
                                    <div className='text-xl font-semibold mb-5'>
                                        {H1Element}
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <span className='text-sm opacity-60'>{new Date(story.updatedAt).toDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
            {path === 'published' && (
                <div className='mt-5'>
                    {stories.map((story) => {
                        const match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
                        const stripHtmlTags = (htmlString: string) => {
                            return htmlString.replace(/<[^>]*>/g, '');
                        };

                        const h1Element = match ? match[1] : '';
                        const H1Element = stripHtmlTags(h1Element)
                        return (
                            <Link key={story.id} href={`/published/${story.id}`}>
                                <div className='py-5'>
                                    <div className='text-xl font-semibold mb-5'>
                                        {H1Element}
                                    </div>
                                    <div className='flex items-center space-x-5'>
                                        <span className='text-sm opacity-60'>{new Date(story.updatedAt).toDateString()}</span>
                                        <button onClick={() => EditStory(story.id)} className='px-5 py-1 text-sm rounded-full'>Edit</button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}

            {path === 'saved' && (
                <div className='mt-5'>
                    {stories.map((story) => {
                        const stripHtmlTags = (htmlString: string) => {
                            return htmlString.replace(/<[^>]*>/g, '');
                        };
                        const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
                        const imgSrc = match ? match[1] : '';
                        const h1match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

                        const h1Element = h1match ? h1match[1] : '';
                        const H1Element = stripHtmlTags(h1Element)
                        // Remove <h1> tags from the content
                        const contentWithoutH1 = story.content!.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '');

                        // Use stripHtmlTags to remove HTML tags from the entire content
                        const textWithoutHtml = stripHtmlTags(contentWithoutH1);

                        // Split the text into words and select the first 10
                        const first30Words = textWithoutHtml.split(/\s+/).slice(0, 30).join(' ');
                        return (
                            <Link key={story.id} href={`/published/${story.id}`} className='my-8 border-b-[1px] pb-10 border-neutral-100'>
                                <AuthorDetail story={story} />
                                <div className='grid md:grid-cols-4 gap-10 grid-cols-2'>
                                    <div className='md:col-span-3'>
                                        <h1 className='text-xl font-bold py-3'>{H1Element}</h1>
                                        <p className='max-md:hidden text-neutral-600 font-serif'>{first30Words} ...
                                        </p>
                                        <div className='flex items-center justify-between mt-6'>
                                            {story.topics && (
                                                <span className='bg-neutral-50 px-2 py-1 rounded-full text-[13px]'>{story.topics}</span>
                                            )}
                                        </div>
                                    </div>
                                    <Image width={200} height={200} src={imgSrc ? imgSrc : "/no-image.jpg"} alt='Story Image' />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default StoryPage


export const AuthorDetail = ({ story }: { story: Story }) => {
    const [user, setUser] = useState<any>()  // Cambia `User` por `any` o crea tu propia interfaz

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(story.authorId)
                setUser(user)
            } catch (error) {
                console.log("Error getting user", error)
            }
        }

        fetchUser()
    }, [story])
    return (
        <div className='flex items-center space-x-2'>
          {user?.imageUrl ? (
            <Image
              className='rounded-full'
              src={user.imageUrl}
              width={24}
              height={24}
              alt='User Image'
            />
          ) : (
            <div style={{ width: 24, height: 24 }} />
          )}
          
          <p className='text-sm'>
            {user?.firstName ? user.firstName : ''} {user?.lastName ? user.lastName : ''}
          </p>
          
          <p className='text-sm opacity-60'>
            {story?.updatedAt ? new Date(story.updatedAt).toDateString().split(' ').slice(1, 4).join(' ') : ''}
          </p>
        </div>
      )
      
}
