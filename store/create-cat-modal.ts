import { create } from 'zustand';

interface CreateCategory {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
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