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
    
        <div className="max-w-4xl mx-auto my-5 md:p-4 rounded-lg shadow-md dark:shadow-white/5 md:dark:shadow-white/10 md:dark:bg-zinc-700 md:hover:scale-105 transition-transform duration-300
          ">
    {/* //     <div className="max-w-4xl mx-auto my-5 md:p-4 rounded-lg shadow-md dark:shadow-white/5 md:dark:shadow-white/10" 
    //  style={{ backgroundColor: '#e8eaed', borderColor: '#bdc1c6' }}> */}
            <Link href={`/published/${story.id}`}>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
                    <div className='md:w-full md:flex md:justify-center mb-4 md:mb-0 md:justify-end'>
                        {/* En pantallas menores a md, la imagen ocupará todo el ancho sin redondear las esquinas o aplicar sombras. En md o mayores, se mantienen los estilos originales */}
                        <div className="md:rounded-lg md:overflow-hidden w-full" style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
                            <Image 
                                src={imgSrc || "/no-image.jpg"} 
                                alt='Story Image' 
                                layout='fill'
                                objectFit='cover'
                                className="w-full md:rounded-lg"
                            />
                        </div>
                    </div>
                    <div className='w-full text-center md:text-left'>
                    <h1 className='font-times text-xl font-bold py-3'>{H1Element}</h1>
                        {/* Incluye otros elementos como descripción, autor, botones de acción, etc. */}
                        <div className='flex space-x-4 justify-center md:justify-start'>
                            {/* <ClapComponent storyId={story.id} UserClaps={userClaps} ClapCount={totalClaps}/> */}
                            <AuthorDetail story={story} />

                            <LikeDislikeComponent 
                                storyId={story.id} 
                                initialLikeStatus={initialLikeStatus} 
                                totalLikes={totalLikes}
                                totalDislikes={totalDislikes}
                                // Puedes también pasar totalLikes y totalDislikes si tu componente los necesita
                            />
                            {/* Incluye otros componentes según sea necesario */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>


    );
    };
    
    export default StoryItem;