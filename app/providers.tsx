'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            {children}
            <Toaster position="top-center" />
        </ClerkProvider>
    )
};