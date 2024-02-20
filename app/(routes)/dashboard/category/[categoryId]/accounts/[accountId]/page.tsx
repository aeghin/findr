type AccountsParams = {
    params: {
        categoryId: string;
        accountId: string;
    }
};

const AccountsPage = ({ params }: AccountsParams) => {

    const { categoryId, accountId } = params;



return (
    <div>
        Account page for account #{accountId}
    </div>
)

};

export default AccountsPage;

