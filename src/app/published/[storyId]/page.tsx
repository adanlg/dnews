import { getUser } from "@/actions/User";
import { getPublishedStoryById } from "@/actions/getStories";
import Navbar from "@/components/Navbar";
import RenderStory from "../RenderStory";
import AuthorSpecific from "../AuthorSpecific";
import { CheckSaved } from "@/actions/Save";
import DefaultUserImage from '/public/default-user.png';

const Page = async ({ params }: { params: { storyId: string } }) => {
    const PublishedStory = await getPublishedStoryById(params.storyId);

    if (!PublishedStory.response) {
        return (
            <div>
                No Stories were found
            </div>
        );
    }

    const Author = await getUser(PublishedStory.response?.authorId);

    return (
        <div>
            <Navbar />
            <div className='px-4 md:px-0'>

                <RenderStory
                    AuthorFirstName={Author?.firstName || 'Unknown'}
                    AuthorImage={Author?.imageUrl || DefaultUserImage}
                    AuthorLastName={Author?.lastName || 'Author'}
                    PublishedStory={PublishedStory.response}
                />
                <AuthorSpecific
                    AuthorFirstName={Author?.firstName || 'Unknown'}
                    AuthorImage={Author?.imageUrl || DefaultUserImage}
                    AuthorLastName={Author?.lastName || 'Author'}
                    PublishedStory={PublishedStory.response}
                    AuthorEmail={Author?.web3Wallets?.[0]?.web3Wallet || 'N/A'}
                />
            </div>
        </div>
    );
};

export default Page;
