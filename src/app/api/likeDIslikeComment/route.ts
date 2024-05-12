import prisma from "@/app/prismadb"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const { userId, storyId, commentId, like } = await request.json(); // Now expecting `userId` to be the wallet address

    if(!userId) return NextResponse.json({message: "Wallet address is required."});

    try {
        // Check if the specified comment exists
        const commentExist = await prisma.comment.findUnique({
            where:{
                id:commentId
            }
        });

        if(!commentExist){
            throw new Error ('No Comment was found for like/dislike');
        }

        // Check if there's an existing like/dislike record for the given user and comment
        const likeStatus = await prisma.like.findFirst({
            where:{
                storyId,
                userId, // This is now assumed to be the wallet address
                commentId
            }
        });

        // If the user has already marked "like" or "dislike" on the comment, update the existing record
        if(likeStatus){
            await prisma.like.update({
                where:{
                    id:likeStatus.id
                },
                data:{
                    liked: like // Update the 'liked' state
                }
            });

            return NextResponse.json({message: 'Like status for comment updated!'});
        }
        else{
            // If there is no existing record, create a new like/dislike record
            await prisma.like.create({
                data:{
                    userId, // Use the wallet address as the user identifier
                    storyId,
                    commentId,
                    liked: like
                }
            });
            return NextResponse.json({message: 'Like status for comment created'});
        }
    } catch (error) {
        console.log("Error updating like/dislike status for comment", error);
        return NextResponse.error();
    }
}
