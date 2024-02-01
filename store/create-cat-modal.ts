import { create } from 'zustand';
import axios from 'axios';


interface Category {
    id: number;
    name: string;
    userId: number;
};

interface NewCategoryData {
    category: string;
};


interface CreateCategory {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
};

interface CategoryState {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    addCategory: (newCategory: NewCategoryData) => Promise<void>;
};


export const useCreateCategory = create<CreateCategory>((set) => ({
    isOpen: false,
    onClose: () => set({
        isOpen: false
    }),
    onOpen: () => set({
        isOpen: true
    }),
}));

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    fetchCategories: async () => {
        try {
            const response = await axios.get<Category[]>('/api/category/categories');
            set({ categories: response.data });
        } catch (error) {
            console.error('failed to fetch categories:', error);
        };
    },

    addCategory: async (newCategory: NewCategoryData) => {
        try {
            const response = await axios.post<Category>("/api/category", newCategory);
            const category = response.data;
            set(state => ({ categories: [...state.categories, category] }));
        } catch (error) {
            console.error('failed to create category:', error);
        };
    },
}));