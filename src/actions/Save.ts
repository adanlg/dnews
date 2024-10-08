"use server"
import prisma from "@/app/prismadb"
import { getCurrentUserId } from "./User"

export const CheckSaved = async (storyId:string) => {
    const userId = await getCurrentUserId()
    if(!userId) return {Status: false};
    try {
        const saved = await prisma.save.findFirst({
            where:{
                storyId,
                userId
            }
        })
        
        return {Status: !!saved}
    } catch (error) {
        return {Status: false}
    }
}