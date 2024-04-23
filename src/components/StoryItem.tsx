import React, { useState, useEffect } from 'react';
import { Story } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import ClapComponent from '@/app/published/ClapComponent'; // Asegúrate de que este es el camino correcto
import LikeDislikeComponent from '@/app/published/LikeDislikeComponent'; // Suponiendo que has creado este componente
import { CheckSaved } from '@/actions/Save';
import { ClapCount, ClapCountByUser } from '@/actions/Clap';
import { likeCount, dislikeCount, userLikeStatus } from '@/actions/LikeDislike';
import { AuthorDetail } from '@/app/me/StoryPage'


type Props = {
    //key: string,
    story:Story;
    initialLikeStatus: boolean | null; // Ajusta aquí

}

const StoryItem = ({story}: Props) => {
    const [userClaps, setUserclaps] = useState<number>(0)
    const [totalClaps, setTotalClaps] = useState<number>(0)
    const [SavedStatus, setSavedStatus] = useState<boolean>(false)
    const [initialLikeStatus, setInitialLikeStatus] = useState<boolean | null>(null);
    const [totalDislikes, setTotalDislikes] =useState<number>(0)
    const [totalLikes, setTotalLikes] =useState<number>(0)


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



 
    useEffect(() => {
        // Asunciones similares para obtener claps
        const fetchLikesDislikes = async () => {
            const totalLikes = await likeCount(story.id);
            const totalDislikes = await dislikeCount(story.id);
            const initialStatus = await userLikeStatus(story.id);
            setTotalLikes(totalLikes);
            setTotalDislikes(totalDislikes);
            setInitialLikeStatus(initialStatus);
        };

        fetchLikesDislikes();
    }, [story.id]);

    return (
        <div className="max-w-4xl mx-auto p-2 md:rounded-lg md:my-5 shadow-md shadow-white/5 hover:scale-105 transition-transform duration-300 bg-zinc-300 md:shadow-white/10">
            <Link href={`/published/${story.id}`}>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
                    <div className='w-full flex justify-center mb-0'>  {/* Eliminamos el margen inferior mb-4 */}
                        <div className="w-11/12 md:w-full rounded-lg overflow-hidden shadow-lg md:shadow-none relative" style={{ paddingBottom: '56.25%' }}>
                            <Image 
                                src={imgSrc || "/no-image.jpg"} 
                                alt='Story Image' 
                                layout='fill'
                                objectFit='cover'
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='w-full text-center pl-4 pr-4'>
                        <h1 className='text-gray-800 font-serif text-xl font-bold py-3'>{H1Element}</h1>
                        <div className='text-gray-800 flex space-x-4 justify-center md:justify-start'>
                            <AuthorDetail story={story} />
                            <LikeDislikeComponent 
                                storyId={story.id} 
                                initialLikeStatus={initialLikeStatus} 
                                totalLikes={totalLikes}
                                totalDislikes={totalDislikes}
                            />
                        </div>
                    </div>
                </div>
            </Link>
            {/* Añadimos una línea delimitadora entre cada elemento de la lista */}
            <hr className="border-t border-gray-600 md:hidden" />
        </div>
    );
    };
    
    export default StoryItem;