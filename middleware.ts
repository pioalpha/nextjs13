/*
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/(.*)",
  "/api/chatgpt/(.*)",
]);

export default clerkMiddleware(
  (auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  },
  { debug: process.env.CLERK_DEBUG === "true" }
);
*/

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhook(.*)", "/api/chatgpt(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
