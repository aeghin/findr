import { SignOutButton, currentUser } from "@clerk/nextjs";

const DashboardPage = async () => {

    const user = await currentUser();
        console.log(user);

    return (
        <>
            <div>dashboard page (protected)</div> 
            <SignOutButton />
        </>
    )
};

export default DashboardPage;