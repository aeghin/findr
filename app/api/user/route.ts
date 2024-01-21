import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST() {

    const { userId } = auth();

    
}