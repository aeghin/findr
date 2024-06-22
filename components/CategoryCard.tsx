import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useCategoryStore } from '@/store/create-cat-modal';
import { toast } from 'sonner';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from "react";
import { EditCatModal } from './EditCatModal';



interface Props {
    id: number;
};

export const CategoryCard = ({ id }: Props) => {

    const { deleteCategory, confirmDelete, isDelete, closeModal } = useCategoryStore();
    const categoryId = id.toString();

    const categoryName = useCategoryStore(state => state.categories.find(cat => cat.id === id));

    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        deleteCategory(categoryId);
        toast.success(`${categoryName?.name} category deleted`);
        closeModal();
    };

    return (
        <>
            <div className="group flex items-center justify-between p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-color transition-shadow duration-200 ease-in-out">
                <Link href={`/dashboard/category/${id}`} className='flex-grow'>
                    <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{categoryName?.name}</h5>
                </Link>
                <div className='flex space-x-2'>
                    <button onClick={() => setIsOpen(true)} className='transition duration-200 ease-in-out transform hover:scale-110 hover:text-blue-700'>
                        <Pencil />
                    </button>
                    <button onClick={confirmDelete} className="transition duration-200 ease-in-out transform hover:scale-110 hover:text-red-600">
                        <Trash2 />
                    </button>
                </div>
            </div>
            {isDelete && <ConfirmDeleteModal handleDelete={handleDelete}  closeModal={closeModal} />}
            {isOpen && <EditCatModal id={id} categoryName={categoryName?.name} onClose={() => setIsOpen(false)} />}
        </>
    )
};