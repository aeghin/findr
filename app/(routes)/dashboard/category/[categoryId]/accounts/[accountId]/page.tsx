'use client'

import { useEffect } from "react";
import { useAccountStore } from "@/store/create-cat-modal";

type AccountsParams = {
    params: {
        categoryId: string;
        accountId: string;
    }
};

const AccountsPage = ({ params }: AccountsParams) => {

    const { categoryId, accountId } = params;
    const { getAccountDetails } = useAccountStore();

    useEffect(() => {
        getAccountDetails(accountId, categoryId);
    }, []);

    return (
        <div>
            Account page for account #{accountId}
        </div>
    )

};

export default AccountsPage;

