import { Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
    id: number;
    name: string;
};

export const CategoryCard = ({ id, name }: Props) => {

    return (
        <div className="group flex flex-col items-center justify-center p-6 text-center bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-color transition-shadow duration-200 ease-in-out">
            <Link href={`/dashboard/category/${id}`}>
                <h5 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{name}</h5>
            </Link>
        </div>
    )
};