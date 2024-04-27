import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/prismadb";

export async function PATCH(request: NextRequest) {
    const { storyId, thumbnailUrl } = await request.json();

    if (!storyId || !thumbnailUrl) {
        throw new Error('Missing storyId or thumbnailUrl');
    }

    const story = await prisma.story.findUnique({
        where: {
            id: storyId
        }
    });

    if (!story) {
        throw new Error('No story was found');
    }

    try {
        const updatedStory = await prisma.story.update({
            where: {
                id: story.id
            },
            data: {
                thumbnailUrl: thumbnailUrl
            }
        });
        return NextResponse.json(updatedStory);
    } catch (error) {
        console.error('Failed to update thumbnail', error);
        return NextResponse.error();
    }
}

// Utilización del endpoint en el cliente:
