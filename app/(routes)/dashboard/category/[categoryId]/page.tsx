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

    const { accounts, getAccounts } = useAccountStore();
    const { isOpen, onOpen } = useCreateAccount();

    useEffect(() => {
        getAccounts(categoryId);
    }, []);

    return (
        <>
            <div>Category info for {params.categoryId}</div>
            <button onClick={onOpen}>Add Account</button>
            <div>
                {accounts.map(({ id, name }) => (
                    <Link key={id} href={`/dashboard/category/${categoryId}/accounts/${id}`} className="flex">
                        {name}
                    </Link>
                ))}
            </div>
            {isOpen && <AccountModal categoryId={categoryId} />}
        </>
    )
};

export default CategoryPage;