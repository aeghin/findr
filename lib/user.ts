import { useSession } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const createUser = async () => {
    const { session } = useSession();
    const userId = session?.user.id;


    if (!userId) {
        throw new Error('No authenticated user found.');
    };

    try {
        const user = await prismadb.user.create({
            data: { clerkId: userId }
        });

        return user;

    } catch (error) {
        console.error("Error creating user:", error);
    }
};