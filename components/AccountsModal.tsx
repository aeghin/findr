import * as z from 'zod';

import { useState } from 'react';

import { XCircle } from "lucide-react";

import { useCreateAccount, useAccountStore } from '@/store/create-cat-modal';



export const AccountModal: React.FC<{ categoryId: string }> = ({ categoryId }) => {

    const [accountDetails, setAccountDetails] = useState({
        account: '',
        instagram: '',
        x: '',
    });


    const [error, setError] = useState('');

    const { onClose } = useCreateAccount();
    const { addAccounts } = useAccountStore();

    const formSchema = z.object({
        account: z.string().min(2,
            {
                message: "account name must be atleast 2 characters long"
            }).max(12,
                { message: "account name cannot be longer than 12 characters" }
            ),
        instagram: z.string().url(),
        x: z.string().url()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setAccountDetails(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            const { account: name } = formSchema.parse({ accountDetails });
            addAccounts(categoryId, name);
            onClose();
        } catch (e) {
            if (e instanceof z.ZodError) {
                setError(e.errors[0].message);
            }
        };
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
                <div className="flex justify-end mb-4">
                    <button
                        className="text-gray-700 hover:text-red-600"
                        onClick={onClose}
                    >
                        <XCircle />
                    </button>
                </div>
                <div>
                    <input
                        type='text'
                        placeholder="account name"
                        value={accountDetails.account}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
                    />
                    <input
                        type="url"
                        placeholder="instagram url"
                        value={accountDetails.instagram}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
                    />
                    <input
                        type="url"
                        placeholder="x/twitter url"
                        value={accountDetails.x}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition duration-200"
                    >
                        Close Modal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
};