import EmailSignup from "./EmailSignup";

export const Home = () => {
    return (
        <>
            <div className="bg-black flex-container text-white">
                <div className="content">
                    <div className="mb-8">
                        <h1>Collagen Lab</h1>
                        <h2>COMING SOON</h2>
                    </div>
                    <EmailSignup />
                </div>
            </div>
        </>
    );
}