import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params }: { params: { categoryId: string, accountId: string } }) {

    try {
        // console.log("this is erroring out:", params);
        const { userId } = await auth();

        const categoryId = parseInt(params.categoryId, 10);
        const accountId = parseInt(params.accountId, 10);

        if (!userId) {
            return new NextResponse("unauthorized user", { status: 401 });
        };

        const user = await prismadb.user.findFirst({
            where: {
                clerkId: userId
            }
        });

        if (!user) {
            return new NextResponse("no user found", { status: 404 });
        };

        const category = await prismadb.category.findFirst({
            where: {
                id: categoryId,
                userId: user?.id
            }
        });


        if (!category) {
            return new NextResponse("category doesn't exist", { status: 404 });
        };

        const accountDetails = await prismadb.account.findFirst({
            where: {
                id: accountId,
                categoryId: categoryId
            },
            include: {
                links: true,
            }
        });

        if (!accountDetails) {
            return new NextResponse("account details don't exist", { status: 404 });
        };

        return NextResponse.json(accountDetails);

    } catch (error) {
        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    }
};

