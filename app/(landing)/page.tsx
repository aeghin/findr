import { SignInButton, SignUpButton } from "@clerk/nextjs";


const LandingPage = () => {
    return (
        <main>
            <header className="bg-blue-300 p-10 h-3/4">
                <h1>Landing Page (Public)</h1>
                <div className="flex space-x-4">
                    <SignInButton />
                    <SignUpButton />
                </div>
            </header>
            <section className="bg-green-300 p-10 min-h-screen">
                <h2>Main Section</h2>
            </section>
            <section className="bg-red-300 p-10 min-h-screen">
                <h2>Secondary Section</h2>
            </section>
            <footer className="bg-gray-300 p-10 min-h-40">
                <h2>Footer Section</h2>
            </footer>
        </main>
    )
};

export default LandingPage;