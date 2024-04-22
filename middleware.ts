import { redirectToSignIn } from "@clerk/nextjs";
import { authMiddleware } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [`/`,`/api/uploadthing`,`/api/uploadthing-multi`,`/api/livekit/`],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }  
    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_next/image|favicon.ico).*)", "/", "/(api|trpc)(.*)",]
};

