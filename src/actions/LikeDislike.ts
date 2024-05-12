"use server"
import prisma from "@/app/prismadb"
import { getCurrentUserId } from "./User"
import { checkWalletAccess } from "./checks";


// Función para contar los "Me gusta" de una historia o comentario
export const likeCount = async (storyId: string, commentId?: string) => {
    try {
        const filter = {
            storyId,
            commentId: commentId || null,
            liked: true, // Considera solo los registros donde liked es true
        };

        const count = await prisma.like.count({
            where: filter,
        });

        return count;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

// Función para contar los "No me gusta" de una historia o comentario
export const dislikeCount = async (storyId: string, commentId?: string) => {
    try {
        const filter = {
            storyId,
            commentId: commentId || null,
            liked: false, // Considera solo los registros donde liked es false
        };

        const count = await prisma.like.count({
            where: filter,
        });

        return count;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

// Función para verificar si el usuario actual ha marcado "Me gusta" o "No me gusta" en una historia o comentario
export const userLikeStatus = async (storyId: string, commentId?: string) => {
    const userId = await getCurrentUserId();
    // const userId = await checkWalletAccess();

    if (!userId) return null;

    try {
        const like = await prisma.like.findFirst({
            where: {
                storyId,
                userId,
                commentId: commentId || null,
            },
            select: {
                liked: true, // Solo necesitamos el estado de 'liked'
            },
        });

        return like ? like.liked : null; // Devuelve true, false, o null si no se encontró registro
    } catch (error) {
        console.error(error);
        return null;
    }
};
