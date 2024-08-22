import EmailSignup from "./EmailSignup";

export const Home = () => {
    return (
        <>
            <div className="bg-dark-green flex-container text-beige">
                <div className="content">
                    <div className="mb-8 text-md">
                        <h1>Collagen Lab</h1>
                        <h2 className="text-serif text-sm">COMING SOON</h2>
                    </div>
                    <EmailSignup />
                </div>
            </div>
        </>
    );
}