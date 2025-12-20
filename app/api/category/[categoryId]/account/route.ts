import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, { params }: { params: { categoryId: string } }) {
    try {

        const { userId } = await auth();
        const body = await req.json();
        const { accountName, instagramUrl, xUrl } = body;

        if (!userId) {
            return new NextResponse("unauthorized user", { status: 401 });
        };

        if (!accountName) {
            return new NextResponse("account name needed", { status: 400 });
        };

        if (!instagramUrl) {
            return new NextResponse("please enter correct instagram url", { status: 400 });
        };

        if (!xUrl) {
            return new NextResponse("please enter correct x/twitter url", { status: 400 });
        };

        const categoriesId = parseInt(params.categoryId, 10);

        const user = await prismadb.user.findUnique({
            where: {
                clerkId: userId
            },
        });

        const category = await prismadb.category.findFirst({
            where: {
                id: categoriesId,
                userId: user?.id
            },
        });

        if (!category) {
            return new NextResponse("category doesn't exist", { status: 404 });
        };

        const newAccount = await prismadb.account.create({
            data: {
                name: accountName,
                categoryId: categoriesId,
                links: {
                    create: [
                        { platform: 'Instagram', url: instagramUrl },
                        { platform: 'Twitter', url: xUrl },
                    ],
                },
            },
        });

        return NextResponse.json(newAccount);

    } catch (error) {
        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    }
};