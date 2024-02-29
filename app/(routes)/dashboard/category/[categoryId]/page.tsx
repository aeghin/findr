"use client";

import { useAccountStore, useCreateAccount } from "@/store/create-cat-modal";
import { AccountModal } from "@/components/AccountsModal";
import { useEffect } from "react";
import Link from "next/link";

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
};


const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {

    const { categoryId } = params;

    const { accounts, getAccounts, categoryName } = useAccountStore();
    const { isOpen, onOpen } = useCreateAccount();

    useEffect(() => {
        getAccounts(categoryId);
    }, []);


    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-xl font-semibold">{categoryName}</h1>
                <button onClick={onOpen} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                    Add Account
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map(({ id, name }) => (
                    <Link key={id} href={`/dashboard/category/${categoryId}/accounts/${id}`} className="flex items-center justify-between p-4 bg-white shadow rounded hover:shadow-color group transition duration-300 ease-in-out">
                        <span className="font-medium group-hover:text-blue-600">{name}</span>
                        <span className="text-sm text-gray-500 group-hover:text-blue-600">View Details</span>
                    </Link>
                ))}
            </div>
            {isOpen && <AccountModal categoryId={categoryId} />}
        </div>
    )
};

export default CategoryPage;