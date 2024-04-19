/*
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/prismadb";

// Handle both creating/updating and publishing a story
async function handler(request: NextRequest) {
    const { userId } : { userId: string | null } = auth();
    const body = await request.json();
    const { storyId, content, topics, publish } = body;

    // Check user authentication
    if (!userId) {
        throw new Error('No user is signed in');
    }

    // Create or update a story
    if (!publish) {
        if (storyId) {
            // Update story content
            try {
                await prisma.story.update({
                    where: { id: storyId },
                    data: { content }
                });
                return NextResponse.json('Story content updated successfully');
            } catch (error) {
                return NextResponse.error();
            }
        } else {
            // Create a new story
            try {
                const NewStory = await prisma.story.create({
                    data: {
                        authorId: userId,
                        content // Assuming you allow content to be sent upon creation
                    }
                });
                return NextResponse.json(NewStory);
            } catch (error) {
                return NextResponse.error();
            }
        }
    } else {
        // Publish a story
        try {
            const updatedStory = await prisma.story.update({
                where: { id: storyId },
                data: {
                    publish: true,
                    topics: topics
                }
            });
            return NextResponse.json(updatedStory);
        } catch (error) {
            console.log(error);
            return NextResponse.error();
        }
    }
}

export default handler;
*/
