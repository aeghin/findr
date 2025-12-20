// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/api/(.*)",
]);

const isWebhookRoute = createRouteMatcher([
    "/api/webhook(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

    if (isWebhookRoute(req)) return;

    if (isProtectedRoute(req)) {
        await auth.protect();
    };
});

export const config = {
    matcher: ["/((?!_next|_not-found|.*\\..*).*)"],
};

