'use server'
import { NextResponse } from "next/server"
import { checkWalletAccess } from '@/actions/checks';  // Import your check function

// Devuelve el ID del usuario autenticado o null si no está autenticado.
export const getCurrentUserId = async () => {
    try {
        // Aquí debes implementar tu lógica para obtener el userId del usuario autenticado.
        // Esto es solo un ejemplo y deberías reemplazarlo con tu propia lógica.
        const userId = "implement-your-authentication-logic";
        return userId || null;  // Devuelve null si no hay usuario autenticado.
    } catch (error) {
        console.error("Authentication error: ", error);
        return null;  // Maneja los errores y devuelve null si la autenticación falla.
    }
}

// Devuelve el objeto del usuario autenticado o null si no hay un usuario autenticado.
export const getCurrentUser = async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) return null;

        const user = await getUser(userId);
        return user;
    } catch (error) {
        console.error("Error fetching current user: ", error);
        return null;
    }
}

// Devuelve el objeto del usuario dado un userId, o null si el userId no es válido.
export const getUser = async (userId: string) => {
    if (!userId) return null;  // Retorna null si no se proporciona userId.

    try {
        // Aquí debes implementar tu lógica para obtener los datos del usuario dado un userId.
        // Esto es solo un ejemplo y deberías reemplazarlo con tu propia lógica.
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const user = await response.json();
        return user;  // Devuelve el usuario correspondiente al userId.
    } catch (error) {
        console.error("Error fetching user: ", error);
        return null;  // Devuelve null si la obtención del usuario falla.
    }
}
