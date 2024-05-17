import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/prismadb";

export async function POST(request: NextRequest) {
    const { userId } = await request.json(); // Now expecting `userId` to be the wallet address
    console.log('POST request received', { userId });

    if (!userId) {
        throw new Error('No user is signed in');
    }

    try {
        const NewStory = await prisma.story.create({
            data: {
                authorId: userId
            }
        });
        console.log('New story created', NewStory);

        return NextResponse.json(NewStory);
    } catch (error) {
        console.error('Error creating new story', error);
        return NextResponse.error();
    }
}

export async function PATCH(request: NextRequest) {
    const { userId, storyId, content } = await request.json(); // Expecting `userId` to be the wallet address
    console.log('PATCH request received', { userId, storyId, content });

    if (!userId) {
        throw new Error('No user is signed in');
    }

    if (!storyId || !content) {
        throw new Error('Missing fields');
    }

    const Story = await prisma.story.findUnique({
        where: {
            id: storyId
        }
    });
    console.log('Story found', Story);

    if (!Story) {
        throw new Error('No story was found');
    }

    try {
        const updatedStory = await prisma.story.update({
            where: {
                id: Story.id,
            },
            data: {
                content
            }
        });
        console.log('Story updated', updatedStory);

        return NextResponse.json('Successfully saved the story');
    } catch (error) {
        console.error('Error saving story', error);
        return NextResponse.error();
    }
}
