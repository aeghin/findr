// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/api/webhook(.*)",
]);

export default clerkMiddleware((auth, req) => {
    if (!isPublicRoute(req)) {
        auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};
