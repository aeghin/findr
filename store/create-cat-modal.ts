import { create } from 'zustand';
import axios from 'axios';
import { Accounts, AccountState } from './types';



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

interface CreateAccount {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};


interface CategoryState {
    categories: Category[];
    isLoading: boolean;
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

export const useCreateAccount = create<CreateAccount>((set) => ({
    isOpen: false,
    onOpen: () => set({
        isOpen: true
    }),
    onClose: () => set({
        isOpen: false
    }),
}));

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get<Category[]>('/api/category/categories');
            set({ categories: response.data });
        } catch (error) {
            console.error('failed to fetch categories:', error);
        } finally {
            set({ isLoading: false });
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

export const useAccountStore = create<AccountState>((set) => ({
    accounts: [],
    categoryName: '',
    getAccounts: async (categoryId) => {
        try {
            const response = await axios.get<Accounts[]>(`/api/category/${categoryId}/accounts`);
        
            set({ accounts: response.data, categoryName: response.data[0]?.category.name });

        } catch (error) {
            
            console.error('failed to get accounts:', error);
        };
    },
    addAccounts: async (categoryId, accountName, instagramUrl, xUrl) => {
        try {
            const response = await axios.post<Accounts>(`/api/category/${categoryId}/account`, { accountName, instagramUrl, xUrl });
            // console.log(name);
            set((state) => ({ accounts: [...state.accounts, response.data] }));
        } catch (error) {
            console.error('failed to add account(s):', error);
        };
    },
}));