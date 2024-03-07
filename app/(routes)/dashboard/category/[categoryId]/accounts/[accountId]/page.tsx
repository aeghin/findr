'use client'

import { useEffect } from "react";
import { useAccountStore } from "@/store/create-cat-modal";

import { SocialIcon } from 'react-social-icons';

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

    const details = accountDetails[accountId];
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Account Details for Account #{accountId}</h2>
            <div className="space-y-2">
                {details?.map(({ id, url, platform }) => (
                    <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded shadow hover:bg-gray-50 transition duration-300 ease-in-out">
                        <SocialIcon network={`${platform.toLowerCase()}`} as="div" />
                        <div className="font-medium text-lg">{platform}</div>
                        <div className="text-gray-600">Visit on {platform}</div>
                    </a>
                ))}
            </div>
        </div>
    )
};

export default AccountsPage;

