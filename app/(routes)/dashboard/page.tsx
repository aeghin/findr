'use client'

import { useCreateCategory } from '@/store/create-cat-modal';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { CategoryCard } from '@/components/CategoryCard';

import { Montserrat } from 'next/font/google';
import { CategoryModal } from '@/components/CategoryModal';
import { useCategoryStore } from '@/store/create-cat-modal';
import { Input } from '@/components/ui/input';



const mont = Montserrat({ weight: '600', subsets: ['latin'] });

const DashboardPage = () => {

    const { fetchCategories, categories, isLoading } = useCategoryStore();
    const isOpen = useCreateCategory((state) => state.isOpen);
    const openModal = useCreateCategory((state) => state.onOpen);



    useEffect(() => {
        fetchCategories();
    }, []);
    // console.log(categories);

    return (
        <>
            {isLoading ? (
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                        <Skeleton className="h-28 w-full rounded-lg" />
                    </div>
                </div>
            ) : categories.length === 0 ?
                <div className='flex flex-col justify-center items-center min-h-screen'>
                    <Card className='w-1/2 h-96 bg-gray-100 mb-36'>
                        <CardHeader>
                            <CardTitle className={`text-center ${mont.className}`}>Let's add your first category!</CardTitle>
                            <CardDescription className={`text-center ${mont.className}`}>finance, crypto, sports..</CardDescription>
                        </CardHeader>
                        <div className='flex justify-center mt-12'>
                            <Button className='w-1/3' onClick={openModal}>
                                Create Category
                            </Button>
                        </div>
                    </Card>
                </div>
                :
                <div className="p-4">
                    <div className='flex justify-end'>
                        <Button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                            Create Category
                        </Button>
                    </div>
                    <div className='flex justify-center mb-4'>
                        <Input type='text' placeholder='Search for categories...' className='w-1/3' />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map(({ id }) => (
                            <CategoryCard key={id} id={id} />
                        ))}
                    </div>
                </div>
            }
            {
                isOpen && <CategoryModal />
            }
        </>
    )
};

export default DashboardPage;