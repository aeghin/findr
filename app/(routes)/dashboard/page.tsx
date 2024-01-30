'use client'


import axios from 'axios';
import { useCreateCategory } from '@/store/create-cat-modal';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Montserrat } from 'next/font/google';
import CategoryModal from '@/components/CategoryModal';

const mont = Montserrat({ weight: '600', subsets: ['latin'] });

const DashboardPage = () => {

    const isOpen = useCreateCategory((state) => state.isOpen);
    const openModal = useCreateCategory((state) => state.onOpen);

    type Category = {
        id: number;
        name: string;
        userId: number;
    };

    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {

        const response = await axios.get("/api/category/categories");
        console.log(response.data);
        setCategories(response.data);

    }

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <>
            {categories.length === 0 ?
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
                <div>
                    {categories.map((category) => (
                        <div key={category.id}>
                            {category.name}
                        </div>
                    ))}
                </div>
            }
            {
                isOpen && <CategoryModal />
            }
        </>
    )
};

export default DashboardPage;