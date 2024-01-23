import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {

    try {

        const { userId } = auth();
        const body = await req.json();
        const { category } = body;

        if (!userId) {
            return new NextResponse("unauthorized", { status: 401 });
        };

        if (!category) {
            return new NextResponse("a category is required", { status: 400 });
        };

        let user = await prismadb.user.findUnique({
            where: {
                clerkId: userId
            },
        });

        if (!user) {
            user = await prismadb.user.create({
                data: {
                    clerkId: userId
                }
            });
        };

        const newCategory = await prismadb.category.create({
            data: {
                name: category,
                userId: user.id
            },
        });

        return NextResponse.json(newCategory);


    } catch (error) {
        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    };
};