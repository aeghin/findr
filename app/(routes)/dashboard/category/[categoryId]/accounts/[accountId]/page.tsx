'use client'

import { useEffect } from "react";
import { useAccountStore } from "@/store/create-cat-modal";
import { Skeleton } from "@/components/ui/skeleton";

import { SocialIcon } from 'react-social-icons';
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';

type AccountsParams = {
    params: {
        categoryId: string;
        accountId: string;
    }
};

const AccountsPage = ({ params }: AccountsParams) => {

    const { categoryId, accountId } = params;
    const { getAccountDetails, accountDetails, isFetching } = useAccountStore();

    useEffect(() => {
        getAccountDetails(accountId, categoryId);
    }, [accountId, categoryId]);

    // const details = accountDetails[accountId];
    const accountIdInt = parseInt(accountId);
    const details = accountDetails[accountIdInt];
    

    return (
        <>
            {isFetching ?
                <>
                    <Skeleton className="p-4 md:pd-8 lg:p-12">
                        <Skeleton className="mb-4" />
                        <Skeleton className="space-y-2 lg:space-y-4">
                            <Skeleton className="flex justify-center items-center lg:block lg:w-full p-4 md:p-6 lg:p-8 lg:shadow-lg bg-white rounded" />
                        </Skeleton>
                    </Skeleton>
                    <Skeleton className="p-4 md:pd-8 lg:p-12">
                        <Skeleton className="mb-4" />
                        <Skeleton className="space-y-2 lg:space-y-4">
                            <Skeleton className="flex justify-center items-center lg:block lg:w-full p-4 md:p-6 lg:p-8 lg:shadow-lg bg-white rounded" />
                        </Skeleton>
                    </Skeleton>
                </>
                :
                <div className="p-4 md:pd-8 lg:p-12">
                    <div className="flex justify-between">
                        <Link href={`/dashboard/category/${categoryId}`}>
                            <ChevronLeft className="hover:text-purple-400 w-8 h-8" />
                        </Link>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Social Account(s) for: <span className="text-bold text-4xl text-purple-600">{`${details?.name}`}</span></h2>

                    </div>
                    <div className="space-y-2 lg:space-y-4">
                        {details?.links?.map(({ id, url, platform }) => (
                            <a key={id} href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center lg:block lg:w-full p-4 md:p-6 lg:p-8 lg:shadow-lg bg-white rounded shadow hover:bg-gray-50 transition duration-300 ease-in-out">
                                <SocialIcon className="lg:ml-4" network={`${platform.toLowerCase()}`} as="div" />
                                <div className="font-medium text-lg ml-2 lg:text-xl">{platform}</div>
                            </a>
                        ))}
                    </div>
                </div>
            }
        </>
    )
};

export default AccountsPage;

