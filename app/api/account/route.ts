import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {

    const { userId } = auth();
    const body = await req.json();
    const { account } = body;


    if (!userId) {
        return new NextResponse("unauthorized access", { status: 401 });
    }

    if (!account) {
        return new NextResponse("account name is required", { status: 400 });
    }

    const user = prismadb.user.findUnique({
        where: {
            clerkId: userId
        }
    });

    const newAccount = prismadb.account.create({
        data: {
            name: account,
            
        }
    })




};
