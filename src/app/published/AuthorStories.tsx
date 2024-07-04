import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@prisma/client';

type Props = {
    story: Story;
    AuthorFirstName: string | null;
    AuthorLastName: string | null;
    AuthorImage: string;
}

const AuthorStories = ({ story, AuthorFirstName, AuthorLastName, AuthorImage }: Props) => {
    const stripHtmlTags = (htmlString: string) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
    const imgSrc = match ? match[1] : '/no-image.jpg';
    const h1match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1Element = h1match ? stripHtmlTags(h1match[1]) : '';

    return (
        <Link href={`/published/${story.id}`}>
            <div className="max-w-4xl mx-auto p-2 md:rounded-lg md:my-5 shadow-md shadow-black/5 hover:scale-105 transition-transform duration-300 md:shadow-black/10 md:bg-gradient-to-tr from-zinc-300 to-white">
              <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4'>
                    <div className='w-full flex justify-center'>
                        <div className="w-11/12 md:w-full rounded-lg overflow-hidden  md:shadow-none relative" style={{ paddingBottom: '56.25%' }}>
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
                        <h1 className=' py-3'>{h1Element}</h1>
                        <p className=' text-sm'>{AuthorFirstName} {AuthorLastName}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AuthorStories;
