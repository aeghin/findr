import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useCategoryStore } from '@/store/create-cat-modal';
import { toast } from 'sonner';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from "react";



interface Props {
    id: number;
    name: string;
};

export const CategoryCard = ({ id, name }: Props) => {

    const { deleteCategory, confirmDelete, isDelete, closeModal, renameCategory } = useCategoryStore();
    const categoryId = id.toString();

    

    const handleDelete = () => {
        deleteCategory(categoryId);
        toast.success(`${name} category deleted`);
        closeModal();
    };

    const handleEdit = () => {
        renameCategory(categoryId, "test");
        toast.success("category renamed");
    };

    return (
        <>
            <div className="group flex items-center justify-between p-6 text-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-color transition-shadow duration-200 ease-in-out">
                <Link href={`/dashboard/category/${id}`}>
                    <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{name}</h5>
                </Link>
                <div className='grid'>
                    <button onClick={handleEdit} className='mb-2 transition duration-200 ease-in-out transform hover:scale-110 hover:text-blue-700'>
                        <Pencil />
                    </button>
                    <button onClick={confirmDelete} className="transition duration-200 ease-in-out transform hover:scale-110 hover:text-red-600">
                        <Trash2 />
                    </button>
                </div>
            </div>
            {isDelete && <ConfirmDeleteModal handleDelete={handleDelete} />}
        </>
    )
};