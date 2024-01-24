'use client'

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from '@/lib/constants';
import axios from 'axios';
import { useRouter } from "next/navigation";

import { useState } from 'react';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const DashboardPage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: ''
        },
    });

    type Category = {
        id: number;
        name: string;
        userId: number;
    };

    const [categories, setCategories] = useState<Category[]>([]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/category", {
                category: values.category
            });

            setCategories(response.data);

            form.reset();
        } catch (error) {
            console.error(error);
        } finally {
            router.refresh();
        }
    }
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." disabled={isLoading} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Category to be public.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>Submit</Button>
                </form>
            </Form>
            <div>
                {categories.map((category) => (
                    <h1 key={category.id}>{category.name}</h1>
                ))}
            </div>
        </>
    )
};

export default DashboardPage;