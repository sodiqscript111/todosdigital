import { Link } from "react-router-dom";
import { useState } from "react";
import FeaturesSection from "../component/Features.tsx";
import FaqSection from "../component/FAQSection.tsx";
import FooterSection from "../component/Footer.tsx";

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = () => setIsLoading(true);

    return (
        <div className="min-h-[300px] bg-black text-white relative overflow-hidden">
            <style>{`
                :root {
                    --primary: #3e60a2;
                    --primary-dark: #324e88;
                    --background: #000000;
                    --text: #ffffff;
                }
            `}</style>

            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-20 gap-16 min-h-screen">
                <div className="lg:w-1/2 w-full text-center lg:text-left space-y-8">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                        <span className="text-[var(--primary)]">Todos</span> Digitals
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                        Build your identity with intelligent NFC profiles — secure, elegant, and instantly accessible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/setup"
                            role="button"
                            onClick={handleLinkClick}
                            className={`px-6 py-3 bg-[var(--primary)] text-[var(--text)] text-base font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-wait" : ""}`}
                            aria-label="Get started with Todos Digitals"
                        >
                            {isLoading ? "Loading..." : "Get Started"}
                        </Link>
                        <Link
                            to="/learn-more"
                            role="button"
                            onClick={handleLinkClick}
                            className={`px-6 py-3 border border-gray-500 text-gray-300 text-base font-medium rounded-lg hover:border-[var(--text)] hover:text-[var(--text)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-wait" : ""}`}
                            aria-label="Learn more about Todos Digitals"
                        >
                            {isLoading ? "Loading..." : "Learn More"}
                        </Link>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full flex justify-center items-center relative">
                    <img
                        src="https://i.ibb.co/Kz2Zx0Ty/Chat-GPT-Image-Jul-5-2025-10-16-30-PM.png"
                        alt="NFC Digital Card"
                        className="w-full max-w-md rounded-xl shadow-xl object-cover"
                    />
                </div>
            </div>

            <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto text-left">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Transform Networking with Todos Digitals!
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 font-light">
                        Say goodbye to outdated paper business cards. Todos Digitals delivers sleek, contactless digital cards to elevate your networking and grow your business.
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 font-light">
                        Share your details effortlessly with a tap using NFC technology. Compatible with Android and iOS, our solution makes connections seamless. Upgrade to smarter networking today!
                    </p>
                    <Link
                        to="/setup"
                        role="button"
                        onClick={handleLinkClick}
                        className={`inline-block bg-[var(--primary)] text-[var(--text)] font-semibold py-3 px-8 rounded-lg hover:bg-[var(--primary-dark)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-wait" : ""}`}
                        aria-label="Create your digital business card"
                    >
                        {isLoading ? "Loading..." : "Create Your Digital Card"}
                    </Link>
                </div>
            </section>

            <FeaturesSection />
            <FaqSection />
            <FooterSection />
        </div>
    );
}
