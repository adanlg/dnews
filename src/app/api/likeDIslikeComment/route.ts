import prisma from "@/app/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const {userId} = auth()
    if(!userId) throw new Error ('No user found')

    try {
        const { storyId, commentId, like } = await request.json() // 'like' es un booleano

        const commentExist = await prisma.comment.findUnique({
            where:{
                id:commentId
            }
        })

        if(!commentExist){
            throw new Error ('No Comment was found for like/dislike')
        }

        const likeStatus = await prisma.like.findFirst({
            where:{
                storyId,
                userId,
                commentId
            }
        })

        // Si el usuario ya ha marcado "Me gusta" o "No me gusta" en el comentario, actualiza el estado
        if(likeStatus){
            await prisma.like.update({
                where:{
                    id:likeStatus.id
                },
                data:{
                    liked: like
                }
            })

            return NextResponse.json({message: 'Like status for comment updated!'})
        }
        else{
            // Si el usuario aún no ha marcado "Me gusta" o "No me gusta", crea un nuevo registro en Like
            await prisma.like.create({
                data:{
                    userId,
                    storyId,
                    commentId,
                    liked: like
                }
            })
            return NextResponse.json({message: 'Like status for comment created'})
        }
    } catch (error) {
        console.log("Error updating like/dislike status for comment", error)
        return NextResponse.error()
    }
}
