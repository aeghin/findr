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
// fix query 

        await prismadb.category.delete({
            where: {
                id: categoryId
            },
            include: {
                accounts: {
                    where: {
                        id: accountId
                    }
                }
            }
        });


    } catch (err) {
        console.log("code error", err);
        return new NextResponse("internal error", { status: 500 });
    };

};
