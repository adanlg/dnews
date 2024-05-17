import prisma from "@/app/prismadb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    // Extracting the wallet address and the 'like' status from the request payload
    const { userId, storyId, like } = await request.json(); // `userId` is now expected to be the wallet address
    if (!userId) return NextResponse.next(); // Ensure a wallet address is provided

    try {
        // Check if the story exists
        const storyExist = await prisma.story.findUnique({
            where: {
                id: storyId
            }
        });

        if (!storyExist) {
            throw new Error('No Stories were found');
        }

        // Check if there's an existing like/dislike record for the given user and story
        const likeStatus = await prisma.like.findFirst({
            where: {
                storyId,
                userId  // This is now the wallet address
            }
        });

        // If the user has already marked "like" or "dislike", update the existing record
        if (likeStatus) {
            await prisma.like.update({
                where: {
                    id: likeStatus.id
                },
                data: {
                    liked: like // Update the 'liked' state
                }
            });

            return NextResponse.json({message: 'Like status updated!'});
        } else {
            // If no existing record, create a new one
            await prisma.like.create({
                data: {
                    userId,  // Use the wallet address as the user identifier
                    storyId: storyExist.id,
                    liked: like
                }
            });
            return NextResponse.json({message: 'Like status created'});
        }
    } catch (error) {
        console.log("Error updating like/dislike status", error);
        return NextResponse.error();
    }
}
