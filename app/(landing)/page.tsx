import { SignInButton, SignUpButton } from "@clerk/nextjs";


const LandingPage = () => {
    return (
        <>
            <div className="h-full">Landing Page (public)</div>
            <div className="flex space-x-4">
                <SignInButton />
                <SignUpButton />

            </div>

        </>
    )
};

export default LandingPage;