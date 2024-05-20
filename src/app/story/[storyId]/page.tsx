'use client';

import React, { useEffect, useState } from 'react';
import NewStory from '../New-Story';
import Navbar from '@/components/Navbar';
import { getStoryById } from '@/actions/getStories';
import { useAccount } from 'wagmi'; 
import { Story } from '@prisma/client';
import { usePathname, useSearchParams } from 'next/navigation';
import NavbarStory from '../NavbarStory';


interface PageProps {
  storyId?: string;
  address?: string;
  story?: any;
}

const Page: React.FC<PageProps> = ({ storyId: initialStoryId, address: initialAddress, story }) => {
  const { address: userAddress } = useAccount();
  const [storyContent, setStoryContent] = useState<string>(story?.content || '');
  const [storyData, setStoryData] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const routerStoryId = pathname.split('/').pop();
  const routerAddress = searchParams.get('address');

  const storyId = initialStoryId || routerStoryId || '';
  const address = initialAddress || routerAddress || userAddress || '';

  useEffect(() => {
    const fetchStory = async () => {
      if (!storyId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const result = await getStoryById(storyId);
        if (result.response) {
          setStoryData(result.response);
          setStoryContent(result.response.content || '');
        }
      } catch (error) {
        console.error('Error fetching story', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (loading) return <div>Loading...</div>;
  if (!storyData) return <div>No story found</div>;

  return (
    <div>
      <Navbar />
      <div className='max-w-[1000px] mx-auto' role='textbox' data-length>
        <div className='max-w-[1000px] mx-auto p-4 md:p-0'>
          <NavbarStory            
            userId={address}
            storyId={storyId}/>
          <NewStory
            userId={address}
            storyId={storyId}
            StoryContent={storyContent}
            WalletAddress={address}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
