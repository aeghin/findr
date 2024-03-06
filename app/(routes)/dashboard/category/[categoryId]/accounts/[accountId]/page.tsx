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
    const { getAccountDetails, accountDetails } = useAccountStore();

    useEffect(() => {
        getAccountDetails(accountId, categoryId);
    }, [accountId, categoryId]);
    // console.log(accountDetails[accountId].map((link) => link.platform));
    return (
        <div>
            Account page for account #{accountId}
            
        </div>
    )

};

export default AccountsPage;

