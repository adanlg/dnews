import { Story } from '@prisma/client'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ClapComponent from './ClapComponent'
import CommentComponent from './CommentComponent'
import ShareComponent from './ShareComponent'
import SaveComponent from './SaveComponent'
import { ClapCount, ClapCountByUser } from '@/actions/Clap'
import { likeCount, dislikeCount, userLikeStatus } from '@/actions/LikeDislike'

import { getCurrentUser } from '@/actions/User'
import { NumberOfComments } from '@/actions/Comments'
import { CheckSaved } from '@/actions/Save'
import FollowComponent from './FollowComponent'
import "highlight.js/styles/github.css"
import LikeDislikeComponent from './LikeDislikeComponent'
import styles from './RenderStory.module.css';  // Adjust the path if necessary

type Props = {
    AuthorFirstName: string | null
    AuthorLastName: string | null
    AuthorImage: string
    PublishedStory: Story
}

const RenderStory = async ({ AuthorFirstName, AuthorImage, AuthorLastName, PublishedStory }: Props) => {

    const stripHtmlTags = (htmlString: string) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    const h1match = PublishedStory.content!.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

    const h1Element = h1match ? h1match[1] : '';

    const h1elemntwithouttag = stripHtmlTags(h1Element)

    const clapCounts = await ClapCount(PublishedStory.id)
    const likeCounts = await likeCount(PublishedStory.id)
    const dislikeCounts = await dislikeCount(PublishedStory.id)
    const likeStatus = await userLikeStatus(PublishedStory.id)

    const UserClaps = await ClapCountByUser(PublishedStory.id)

    const CurrentUser = await getCurrentUser()

    const NumberCommnets = await NumberOfComments(PublishedStory.id)


    const SavedStatus = await CheckSaved(PublishedStory.id)
    console.log(SavedStatus)


    const content = PublishedStory.content!;

    const firstH1Match = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/);

    const sanitizedContent = firstH1Match
        ? content.replace(firstH1Match[0], '')
        : content;

    const finalSanitizedContent = sanitizedContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>|<select[^>]*>[\s\S]*?<\/select>|<textarea[^>]*>[\s\S]*?<\/textarea>/gi, '');

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    return (

        <div className='px-4 md:px-0 flex items-center justify-center mt-6 max-w-[800px] mx-auto'>
            <div>
                <h1 className='text-4xl font-bold my-8'>{h1elemntwithouttag}</h1>
                <div className='flex items-center space-x-5'>
                    <Image src={AuthorImage} className='rounded-full ' width={44} height={44} alt='User' />
                    <div className='text-sm'>
                        <p>{shortenAddress(PublishedStory.authorId)}  <FollowComponent AuthorId={PublishedStory.authorId} /></p>
                        <p className='opacity-60'>Published on {new Date(PublishedStory.updatedAt).toDateString().split(' ').slice(1, 4).join(' ')}</p>
                    </div>
                </div>
                <div className='border-y-[1px] border-neutral-200 py-3 mt-6 flex items-center justify-between px-3'>
                    <div className='flex items-center space-x-4'>
                        {/* <ClapComponent storyId={PublishedStory.id} ClapCount={clapCounts} UserClaps={UserClaps} /> */}
                        <LikeDislikeComponent storyId={PublishedStory.id} totalLikes={likeCounts} totalDislikes={dislikeCounts} initialLikeStatus={likeStatus} />

                        <CommentComponent
                            NumberCommnets={NumberCommnets.reponse ? NumberCommnets.reponse : 0}
                            AuthorFirstName={CurrentUser?.firstName || 'Jonh'} // Usar encadenamiento opcional con un valor predeterminado
                            AuthorImage={CurrentUser?.imageUrl || '/random-user.png'} // Proporciona una imagen predeterminada si imageUrl no está disponible
                            AuthorLastName={CurrentUser?.lastName || 'Doe'} // Valor predeterminado para lastName
                        />
                    </div>
                    <div className='flex items-center space-x-4'>
                        {/* <SaveComponent storyId={PublishedStory.id} SavedStatus={SavedStatus.Status} /> */}
                        <ShareComponent />
                        {/* <button>
                            <MoreHorizontal size={24} className='opacity-80 text-green-800' />
                        </button> */}
                    </div>
                </div>
                <div className={`prose my-5 font-mono ${styles.roundedImage}`} dangerouslySetInnerHTML={{ __html: finalSanitizedContent }}></div>
            </div>
        </div>

    )
}
export default RenderStory
