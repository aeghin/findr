export interface Accounts {
    id: number;
    name: string;
    categoryId: number;
};

export interface NewAccount {
    name: string;
};

export interface AccountState {
    accounts: Accounts[];
    getAccounts: (categoryId: string) => Promise<void>;
};