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
        <div className="p-4 md:pd-8 lg:p-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Account Details for Account #{accountId}</h2>
            <div className="space-y-2 lg:space-y-4">
                {details?.map(({ id, url, platform }) => (
                    <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center lg:block lg:w-full p-4 md:p-6 lg:p-8 lg:shadow-lg bg-white rounded shadow hover:bg-gray-50 transition duration-300 ease-in-out">
                        <SocialIcon className="lg:ml-4" network={`${platform.toLowerCase()}`} as="div" />
                        <div className="font-medium text-lg ml-2 lg:text-xl">{platform}</div>
                    </a>
                ))}
            </div>
        </div>
    )
};

export default AccountsPage;

