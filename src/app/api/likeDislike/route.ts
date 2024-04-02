import prisma from "@/app/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse, NextRequest } from "next/server"

export async function POST(request: NextRequest){
    const {userId} = auth()
    if(!userId) throw new Error ('No user found')

    try {
        const { storyId, like } = await request.json() // 'like' es un booleano que indica si el usuario marcó "Me gusta" o "No me gusta"

        const storyExist = await prisma.story.findUnique({
            where:{
                id:storyId
            }
        })

        if(!storyExist){
            throw new Error ('No Stories were found')
        }

        const likeStatus = await prisma.like.findFirst({
            where:{
                storyId,
                userId
            }
        })

        // Si el usuario ya ha marcado "Me gusta" o "No me gusta", actualiza el estado
        if(likeStatus){
            await prisma.like.update({
                where:{
                    id:likeStatus.id
                },
                data:{
                    liked: like // Actualiza el estado de "Me gusta" o "No me gusta"
                }
            })

            return NextResponse.json({message: 'Like status updated!'})
        }
        else{
            // Si el usuario aún no ha marcado "Me gusta" o "No me gusta", crea un nuevo registro
            await prisma.like.create({
                data:{
                    userId,
                    storyId: storyExist.id,
                    liked: like
                }
            })
            return NextResponse.json({message: 'Like status created'})
        }
    } catch (error) {
        console.log("Error updating like/dislike status", error)
        return NextResponse.error()
    }
}
