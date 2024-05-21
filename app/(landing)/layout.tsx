const LandingLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <main>
            <div className="min-h-screen">
                {children}
            </div>
        </main>
    )
};

export default LandingLayout;