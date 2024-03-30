import { Story } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorDetail } from '@/app/me/StoryPage'
import ClapComponent from '@/app/published/ClapComponent'
import SaveComponent from '@/app/published/SaveComponent'
import { CheckSaved } from '@/actions/Save'
import { ClapCount, ClapCountByUser } from '@/actions/Clap'
import { useEffect } from 'react'
import { useState } from 'react'

type Props = {
    key: string,
    story:Story
}

const StoryItem = ({key,story}: Props) => {
    const [userClaps, setUserclaps] = useState<number>(0)
    const [totalClaps, setTotalClaps] = useState<number>(0)
    const [SavedStatus, setSavedStatus] = useState<boolean>(false)


    useEffect(() => {
        const fetchClapCountByUser = async () => {
            try {
                const claps = await ClapCountByUser(story.id)
                setUserclaps(claps)
            } catch (error) {
                console.log("Error fetching the user claps")
            }
        }
        
        const fetchTotalClaps = async () => {
            try {
                const claps = await ClapCount(story.id)
                setTotalClaps(claps)
            } catch (error) {
                console.log("Error fetching the  claps")
            }
        }

        const fetchSavedStatus = async () => {
            try {
                const Savedstatus = await CheckSaved(story.id)
                if(Savedstatus.Status)
                setSavedStatus(Savedstatus.Status)
            } catch (error) {
                console.log("Error fetching the saved status")
            }
        }

        fetchSavedStatus()
        fetchTotalClaps()
        fetchClapCountByUser()
    },[story.id])

    const stripHtmlTags = (htmlString:string) => {
        return htmlString.replace(/<[^>]*>/g, '');
      };
      const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
      const imgSrc = match ? match[1] : '';
      const h1match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      const h1Element = h1match ? h1match[1] : '';
      const H1Element = stripHtmlTags(h1Element); 
        // Remove <h1> tags from the content
        const contentWithoutH1 = story.content!.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '');
    
        // Use stripHtmlTags to remove HTML tags from the entire content
        const textWithoutHtml = stripHtmlTags(contentWithoutH1);
    
        // Split the text into words and select the first 10
        const first30Words = textWithoutHtml.split(/\s+/).slice(0, 30).join(' ');



        return (
            <div className='mt-5 mx-auto max-w-4xl'>
                <Link href={`/published/${story.id}`} className='block my-8 border-b-[1px] pb-10 border-neutral-100'>
                    {/* The grid layout changes from single column to two columns at the md breakpoint */}
                    <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
                        {/* Image container */}
                        {/* On small screens, this will be full width. On md screens, it will take up the left half. */}
                        <div className='w-full flex justify-center mb-4 md:mb-0 md:justify-end'>
                            <Image 
                                src={imgSrc || "/no-image.jpg"} 
                                alt='Story Image' 
                                layout='responsive' 
                                width={200} // These are for maintaining aspect ratio
                                height={200} 
                                objectFit='cover' // This will crop the image to fill the container
                            />
                        </div>
                        {/* Title container */}
                        {/* On small screens, the title is below the image. On md screens, it is to the right. */}
                        <div className='w-full text-center md:text-left'>
                            <h1 className='text-xl font-bold py-3'>{H1Element}</h1>
                        </div>
                    </div>
                </Link>
            </div>
        );
    };
    
    export default StoryItem;