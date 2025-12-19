import prismadb from "@/lib/prismadb";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const event = await verifyWebhook(req, {
        signingSecret: process.env.CLERK_WEBHOOK_SECRET!,
    });

    const eventType = event.type;

    if (eventType === 'user.created') {

        await prismadb.user.upsert({
            where: {
                clerkId: event.data.id,
            },
            create: {
                clerkId: event.data.id,
            },
            update: {}
        });
    };

    return new Response('Webhook received', { status: 200 })
}