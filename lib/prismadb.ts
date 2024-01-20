import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

// this helps prisma run globally. nextjs reloading causes new prisma clients re run. It won't hot reload for running multiple prisma clients. 