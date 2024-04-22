'use server'
// Utiliza el módulo de Clerk y sus funciones para manejar autenticación y obtención de datos de usuario.

import { auth, clerkClient } from "@clerk/nextjs";

// Devuelve el ID del usuario autenticado o null si no está autenticado.
export const getCurrentUserId = async () => {
    try {
        const { userId } = auth();
        return userId || null;  // Devuelve null si no hay usuario autenticado.
    } catch (error) {
        console.error("Authentication error: ", error);
        return null;  // Maneja los errores y devuelve null si la autenticación falla.
    }
}

// Devuelve el objeto del usuario autenticado o null si no hay un usuario autenticado.
export const getCurrentUser = async () => {
    try {
        const { userId } = auth();
        if (!userId) return null;  // Retorna null si no hay usuario autenticado.
        
        const user = await clerkClient.users.getUser(userId);
        return JSON.parse(JSON.stringify(user));  // Devuelve el usuario autenticado.
    } catch (error) {
        console.error("Error fetching user: ", error);
        return null;  // Devuelve null si la obtención del usuario falla.
    }
}

// Devuelve el objeto del usuario dado un userId, o null si el userId no es válido.
export const getUser = async (userId: string) => {
    if (!userId) return null;  // Retorna null si no se proporciona userId.
    
    try {
        const user = await clerkClient.users.getUser(userId);
        return JSON.parse(JSON.stringify(user));  // Devuelve el usuario correspondiente al userId.
    } catch (error) {
        console.error("Error fetching user: ", error);
        return null;  // Devuelve null si la obtención del usuario falla.
    }
}
