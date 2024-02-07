"use client";

import { useAccountStore } from "@/store/create-cat-modal";
import { useEffect } from "react";

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
    
    const categoryId = params.categoryId;
    const { accounts, getAccounts } = useAccountStore();

    useEffect(() => {
        getAccounts(categoryId);
    }, []);

    return (
        <>
            <div>Category info for {params.categoryId}</div>
            <div>
                {accounts.map(({ id, name }) => (
                    <div key={id}>
                        {name}
                    </div>
                ))}
            </div>
        </>
    )
};

export default CategoryPage;