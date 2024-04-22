import { getUser } from "@/actions/User"
import { getPublishedStoryById } from "@/actions/getStories"
import Navbar from "@/components/Navbar"
import RenderStory from "../RenderStory"
import AuthorSpecific from "../AuthorSpecific"
import { User } from "@clerk/nextjs/server"
import { CheckSaved } from "@/actions/Save"

const page = async ({ params }: { params: { storyId: string } }) => {
    const PublishedStory = await getPublishedStoryById(params.storyId)

    console.log(PublishedStory)
    
    if(!PublishedStory.response){
        return(
            <div>
                No Stories were found
            </div>
        )
    }
    const Author:User = await getUser(PublishedStory.response?.authorId)

    return (
        <div>
            <Navbar/>
            <RenderStory AuthorFirstName={Author.firstName} AuthorImage={Author.imageUrl} AuthorLastName={Author.lastName} PublishedStory={PublishedStory.response} />
            <AuthorSpecific AuthorFirstName={Author.firstName} AuthorImage={Author.imageUrl} AuthorLastName={Author.lastName} PublishedStory={PublishedStory.response} AuthorEmail={Author.web3Wallets[0].web3Wallet} />
        </div>
    )
}


export default page