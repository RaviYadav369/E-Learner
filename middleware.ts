// import { authMiddleware } from "@clerk/nextjs";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//   publicRoutes: ["/api/courses(.)*",'/api/categories'],
//   ignoredRoutes: ["/api/user(.)*"]

  
// });

// const isPublicRoute =createRouteMatcher(["/courses(.*)","/categories"])
// const ignoredRoutes = createRouteMatcher(["/api/user(.E*)"])

// export default clerkMiddleware(async (auth, request) => {
//   const { userId, redirectToSignIn } = await auth()

//   if (!isPublicRoute(request)) {
//     await auth.protect({unauthorizedUrl:'/sign-in'})
//   } 
 
// })
 
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// Define public routes and ignored routes
// Define public routes and ignored routes
const isPublicRoute = createRouteMatcher(["/api/courses(.*)", "/api/categories","/","/search"]);
const isSignInRoute = createRouteMatcher(["/sign-in"]); // Add sign-in route to ignored routes
const ignoredRoutes = createRouteMatcher(["/api/user(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Check if the request is not for a public route, not an ignored route, and not the sign-in route
  if (!isPublicRoute(request) && !ignoredRoutes(request) && !isSignInRoute(request)) {
    // Protect the route and redirect to sign-in if unauthorized
    if (!userId) {
      // Redirect to sign-in if the user is not authenticated
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Continue processing the request
  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};