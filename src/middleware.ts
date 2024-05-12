import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    '/',               // Home page
    '/published',      // Any published content page
    '/published/(.*)', // Any specific published content
    '/tokenomics',     // Tokenomics information page
    '/api/likeDislike',  // API route for updating like/dislike status
    '/api/likeDislikeComment'  // API route for updating like/dislike status on comments
  ],
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", '/(api|trpc)(.*)'],
};

// /((?!.+\\.[\\w]+$|_next).*)", "/",