export interface Accounts {
    id: number;
    name: string;
    categoryId: number;
    category: {
        name: string;
    }
};

export interface AccountState {
    accounts: Accounts[];
    categoryName: string;
    getAccounts: (categoryId: string) => Promise<void>;
    addAccounts: (categoryId: string, accountName: string, instaUrl: string, xUrl: string) => Promise<void>;
};
