import { XCircle } from "lucide-react";
import { useCategoryStore } from "@/store/create-cat-modal";
import * as z from 'zod';
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    id: number;
    categoryName: string | undefined;
    onClose: () => void;
};


export const EditCatModal = ({ id, categoryName, onClose }: Props) => {

    const { renameCategory } = useCategoryStore();
    const [category, setCategory] = useState(categoryName);
    const [errorMessage, setErrorMessage] = useState('');

    const schema = z.object({
        categoryName: z.string().min(2, {
            message: "category name must be at least 2 characters long"
        }).max(12, {
            message: "category name is too long. 12 characters max."
        }),
    });

    const handleEdit = () => {
        try {
            const { categoryName } = schema.parse({ categoryName: category });
            renameCategory(id, categoryName);
            toast.success("category renamed!");
            onClose();
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrorMessage(err.errors[0].message);
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
                        type="text"
                        placeholder="Enter category..."
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
                    />
                    {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition duration-200"
                    >
                        Close Modal
                    </button>
                    <button
                        onClick={handleEdit}
                        className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
};