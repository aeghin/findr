import { AccountDetails, Link } from "./create-cat-modal";


export interface Accounts {
    id: number;
    name: string;
    categoryId: number;
    category: {
        name: string;
    }
};

type AccountDetailsType = { [key: string]: Link[] };

export interface AccountState {
    accounts: Accounts[];
    categoryName: string;
    accountDetails: AccountDetailsType;
    isLoading: boolean;
    getAccounts: (categoryId: string) => Promise<void>;
    addAccounts: (categoryId: string, accountName: string, instaUrl: string, xUrl: string) => Promise<void>;
    getAccountDetails: (categoryId: string, accountId: string) => Promise<void>;
};
