"use client";

import { useAccountStore, useCreateAccount } from "@/store/create-cat-modal";
import { AccountModal } from "@/components/AccountsModal";
import { useEffect } from "react";

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
                    <div key={id}>
                        {name}
                    </div>
                ))}
            </div>
            {isOpen && <AccountModal categoryId={categoryId} />}
        </>
    )
};

export default CategoryPage;