import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {

    try {

        const { userId } = auth();

        const categoryId = parseInt(params.categoryId, 10);
        // console.log('This is what paramms.categoryId is coming in as on the api:',params.categoryId);
        if (!userId) {
            return new NextResponse("unauthorized user", { status: 401 });
        };

        const category = await prismadb.category.findFirst({
            where: {
                id: categoryId,
                user: {
                    clerkId: userId
                }
            }
        });

        if (!category) {
            return new NextResponse("unathorized access", { status: 401 });
        };

        const accounts = await prismadb.account.findMany({
            where: {
                categoryId: categoryId
            },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return NextResponse.json(accounts);

    } catch (error) {

        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    }
};