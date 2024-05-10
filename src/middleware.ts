import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    '/',               // Página de inicio
    '/published',
    '/published/(.*)',
    '/tokenomics'     // Página general de publicaciones
        // Cualquier subruta bajo /published
  ]
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", '/(api|trpc)(.*)'],
};

// /((?!.+\\.[\\w]+$|_next).*)", "/",