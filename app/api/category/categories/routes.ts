import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PUT() {

try {

const { userId } = auth();

if (!userId) {
 return new NextResponse("unathorized user", { status: 401 });
};

const user = await prismadb.user.find({
where: {
 clerkId: userId
  }
});

} catch (err) {
 return new NextResponse.json()
};


};



