export interface Accounts {
    id: number;
    name: string;
    categoryId: number;
};

export interface AccountState {
    accounts: Accounts[];
    getAccounts: (categoryId: string) => Promise<void>;
    addAccounts: (categoryId: string, accountName: string, instaUrl: string, xUrl: string) => Promise<void>;
};
