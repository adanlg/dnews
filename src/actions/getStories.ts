"use server"
import prisma from "@/app/prismadb"
import { getCurrentUserId } from "./User"
import { Story } from "@prisma/client";
import { likeCount, dislikeCount } from "@/actions/LikeDislike"; 

export const getStoryById = async (storyId:string) => {
    if(!storyId){
        throw new Error('Do not have storyId')
    }

    try {
        const StoryById = await prisma.story.findUnique({
            where:{
                id:storyId,
                publish:false
            }
        })

        return {response : StoryById}
    } catch (error) {
        return {error: 'Error on getting the story by Id'}
    }
}

export const getPublishedStoryById = async (storyId:string) => {
    if(!storyId){
        throw new Error('Do not have storyId')
    }

    try {
        const StoryById = await prisma.story.findUnique({
            where:{
                id:storyId,
                publish:true
            }
        })

        return {response : StoryById}
    } catch (error) {
        return {error: 'Error on getting the story by Id'}
    }
}

export const getStoriesByAuthor = async (storyId:string, authorId:string) => {
    try {
        const AuthorStories = await prisma.story.findMany({
            where:{
                authorId,
                NOT:{
                    id:storyId
                },
                publish:true
            }
        })

        return {response: AuthorStories}
    } catch (error) {
        return {error: "Error on getting stories by author"}
    }
}

export const getUniqueTopics = async () =>{
    try {
        const AllStoryTopics = await prisma.story.findMany({
            select:{
                topics:true
            }
        })

        const uniqueTopics = Array.from(new Set(AllStoryTopics.flatMap((item)=> item.topics)))

        const formattedData = uniqueTopics.map(topic => ({
            value:topic,
            label:topic
        }))

        return {response : formattedData}
    } catch (error) {
        return {response: []}
    }
}

export const getStoryByTag = async (tag: string, page: number = 1, limit: number = 7) => {
    try {
        let stories: Story[] = [];
        
        if (tag === 'All') {
            stories = await prisma.story.findMany({
                where: { publish: true }
            });
        } else {
            stories = await prisma.story.findMany({
                where: {
                    topics: {
                        has: tag
                    },
                    publish: true
                }
            });
        }

        // Fetch likes and dislikes for each story
        const storiesWithNetLikes = await Promise.all(stories.map(async (story) => {
            const likes = await likeCount(story.id);
            const dislikes = await dislikeCount(story.id);
            const netLikes = likes - dislikes;
            return { ...story, netLikes };
        }));

        // Sort stories by net likes
        storiesWithNetLikes.sort((a, b) => b.netLikes - a.netLikes);

        // Paginate the sorted stories
        const paginatedStories = storiesWithNetLikes.slice((page - 1) * limit, page * limit);
        console.log("Paginated Stories: ", paginatedStories); // Debug log

        return { stories: paginatedStories };
    } catch (error) {
        return { stories: [] };
    }
};