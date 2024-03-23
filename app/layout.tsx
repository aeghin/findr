import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });
const bebas = Bebas_Neue({ weight: "400", subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
