'use client'
import { getStoryByTag } from '@/actions/getStories'
import StoryItem from '@/components/StoryItem'
import { Story } from '@prisma/client'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

type Props = {
    initialLikeStatus?: boolean | null; 
}


const SearchList = (props: Props) => {
    const [filteredStories, setFilteredStories] = useState<Story[]>([])
    const searchparams = useSearchParams()
    const searchValue = searchparams.get('for')
    const [initialLikeStatus, setInitialLikeStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await getStoryByTag(searchValue || 'All')
                setFilteredStories(response.stories)
            } catch (error) {
                console.log("Error in fetching teh data")
            }
        }

        const fetchLikesDislikes = async () => {

            setInitialLikeStatus(initialLikeStatus);
        };

        fetchLikesDislikes();

        fetchStory()
    },[searchparams])
  return (
    <div>
        {filteredStories.map((story) => (
            <StoryItem key={story.id} story={story} initialLikeStatus={initialLikeStatus}             />
        ))}
    </div>
  )
}

export default SearchList