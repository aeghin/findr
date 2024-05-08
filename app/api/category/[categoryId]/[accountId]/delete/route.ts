import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(req: Request, { params }: { params: { categoryId: string, accountId: string } }) {

    try {

        const { userId } = auth();

        const categoryId = parseInt(params.categoryId, 10);
        const accountId = parseInt(params.accountId, 10);

        if (!userId) {
            return new NextResponse("unauthorized user", { status: 401 });
        };

        const user = await prismadb.user.findUnique({
            where: {
                clerkId: userId
            }
        });

        const category = await prismadb.category.findFirst({
            where: {
                id: categoryId,
                userId: user?.id
            }
        });

        if (!category) {
            return new NextResponse("Category not found or unauthorized access", { status: 403 });
        }


        const deletedAccount = await prismadb.account.deleteMany({
            where: {
                id: accountId,
                categoryId: categoryId
            }
        });

        if (!deletedAccount) {
            return new NextResponse('error trying to delete account', { status: 404 });
        };

        return NextResponse.json({ message: "Successfully deleted account" }, { status: 200 });

    } catch (err) {
        console.log("code error", err);
        return new NextResponse("internal error", { status: 500 });
    };

};
