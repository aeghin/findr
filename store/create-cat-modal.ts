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
    isDelete: boolean;
    fetchCategories: () => Promise<void>;
    addCategory: (newCategory: NewCategoryData) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
    renameCategory: (categoryId: any, categoryName: any) => Promise<void>;
    confirmDelete: () => void;
    closeModal: () => void;
};

export interface Link {
    id: number;
    platform: string;
    url: string;
    accountId: number;
};


export interface AccountDetails {
    id: number;
    name: string;
    categoryId: number;
    links: {
        id: number;
        platform: string;
        url: string;
        accountId: number;
    }[];
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
    isDelete: false,
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
    deleteCategory: async (categoryId) => {
        try {

            await axios.delete(`api/category/${categoryId}/deleteCategory`);

            const categoryIdNum = Number(categoryId);

            set(state => ({
                categories: state.categories.filter(category => category.id !== categoryIdNum)
            }));


        } catch (error) {
            console.error(`failed to delete category: ${categoryId}`, error);
        };
    },
    renameCategory: async (categoryId: any, categoryName: any) => {
        try {

            const renamedCategory = await axios.put(`api/category/${categoryId}/editCategory`, { categoryName });
            set(state => ({
                categories: state.categories.map(category => {
                    if (category.id === categoryId) {
                        return { ...category, name: renamedCategory.data.name };
                    } else {
                        return category;
                    };
                })
            }));
        } catch (err) {
            return console.log("error in renaming category");
        };
    },
    confirmDelete: async () => {
        set({ isDelete: true });
    },
    closeModal: async () => {
        set({ isDelete: false });
    },
}));

export const useAccountStore = create<AccountState>((set) => ({
    accounts: [],
    categoryName: '',
    accountDetails: {},
    isLoading: false,
    isFetching: false,
    getAccounts: async (categoryId) => {
        try {
            set({ isLoading: true });
            const response = await axios.get<Accounts[]>(`/api/category/${categoryId}/accounts`);

            set({ accounts: response.data, categoryName: response.data[0]?.category.name });

        } catch (error) {
            console.error('failed to get accounts:', error);
        } finally {
            set({ isLoading: false });
        }
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
    getAccountDetails: async (accountId, categoryId) => {
        try {
            set({ isFetching: true });
            const response = await axios.get<AccountDetails>(`/api/category/${categoryId}/${accountId}/details`);
            set((state) => ({ accountDetails: { ...state.accountDetails, [accountId]: response.data } }));
        } catch (error) {
            console.error('failed to get account detail(s)', error);
        } finally {
            set({ isFetching: false });
        }
    }
}));