import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    try {

        const { userId } = await auth();

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

        const deletedCategory = await prismadb.category.deleteMany({
            where: {
                id: categoryId,
                userId: user.id
            }
        });

        if (deletedCategory.count === 0) {
            return new NextResponse("Category not found or unauthorized access", { status: 403 });
        };

        return NextResponse.json({ message: "succesfully deleted category" }, { status: 200 });

    } catch (error) {

        console.log("code error", error);
        return new NextResponse("internal error", { status: 500 });
    }
};