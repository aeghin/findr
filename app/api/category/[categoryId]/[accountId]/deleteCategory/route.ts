import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    try {

        const { userId } = auth();

        const categoryId = parseInt(params.categoryId, 10);

        if (!userId) {
            return new NextResponse("unauthorized access", { status: 401 });
        };

        const user = await prismadb.user.findUnique({
            where: {
                clerkId: userId
            }
        });

        if (!user) {
            return new NextResponse("user does not exist", { status: 404 });
        };

        await prismadb.category.delete({
            where: {
                id: categoryId
            }
        });

        return NextResponse.json({ message: "succesfully deleted category" }, { status: 200 });

    } catch (error) {

        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    }
};