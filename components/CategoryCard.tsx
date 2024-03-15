import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCategoryStore } from '@/store/create-cat-modal';

interface Props {
    id: number;
    name: string;
};

export const CategoryCard = ({ id, name }: Props) => {

    const { deleteCategory } = useCategoryStore();

    const categoryId = id.toString();

    return (
        <div className="group flex items-center justify-between p-6 text-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-color transition-shadow duration-200 ease-in-out">
            <Link href={`/dashboard/category/${id}`}>
                <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{name}</h5>
            </Link>
            <button onClick={() => deleteCategory(categoryId)} className="transition duration-200 ease-in-out transform hover:scale-110 hover:text-red-600">
                <Trash2 />
            </button>
        </div>
    )
};