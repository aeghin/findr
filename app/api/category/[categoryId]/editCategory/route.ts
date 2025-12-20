import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PUT(req: Request, { params }: { params: { categoryId: string } }) {

  try {

    const body = await req.json();
    const { categoryName } = body;
    // console.log(categoryName);
    const { userId } = await auth();

    const parsedCategory = parseInt(params.categoryId, 10);

    if (!userId) {
      return new NextResponse("unathorized user", { status: 401 });
    };

    const user = await prismadb.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (!user) {
      return new NextResponse("user doesn't exist", { status: 401 });
    };

    const renamedCategory = await prismadb.category.updateMany({
      where: {
        id: parsedCategory,
        userId: user.id
      },
      data: {
        name: categoryName
      }
    });

    // console.log(renamedCategory);
    return NextResponse.json(renamedCategory, { status: 200 });


  } catch (err) {
    return NextResponse.json("Unsuccesful rename of category");
  };

};



