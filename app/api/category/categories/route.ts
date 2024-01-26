import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {

    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 });
        };

        const user = await prismadb.user.findUnique({
            where: {
                clerkId: userId
            }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        };

        const categories = await prismadb.category.findMany({
            where: {
                userId: user.id
            }
        });

        return NextResponse.json(categories);

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};