
"use client";

import { UserButton } from "@clerk/nextjs";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";

const bebas = Bebas_Neue({ weight: "400", subsets: ['latin'] });

const Navbar = () => {

    return <nav className="bg-gradient-to-b from-gray-200 to-white text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/dashboard" className={`text-black text-2xl md:text-3xl lg:text-5xl ${bebas.className}`}>
                        Findr
                    </Link>
                </div>
                <div>
                    <div>
                        <UserButton />
                    </div>
                </div>
            </div>
        </div>
    </nav>
};

export default Navbar;