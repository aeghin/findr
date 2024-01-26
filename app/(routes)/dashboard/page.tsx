'use client'


import axios from 'axios';

import { useState, useEffect } from 'react';



const DashboardPage = () => {

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
            <div>
                {categories.map((category) => (
                    <div key={category.id}>
                        {category.name}
                    </div>
                ))}
            </div>
        </>
    )
};

export default DashboardPage;