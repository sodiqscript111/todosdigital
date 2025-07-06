import { useState, useEffect } from "react";

interface FeatureCardProps {
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
    return (
        <div
            className="bg-gradient-to-br from-slate-800 via-gray-900 to-black rounded-xl border border-gray-700 p-6 shadow-lg hover:scale-[1.03] transition-transform"
            role="region"
            aria-label={title}
        >
            <h3 className="text-2xl font-bold text-[var(--text)] mb-3">{title}</h3>
            <p className="text-gray-300 text-base leading-relaxed">{description}</p>
        </div>
    );
};

const FeaturesSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        const debounce = (func: () => void, wait: number) => {
            let timeout: NodeJS.Timeout;
            return () => {
                clearTimeout(timeout);
                timeout = setTimeout(func, wait);
            };
        };
        checkMobile();
        const debouncedCheckMobile = debounce(checkMobile, 200);
        window.addEventListener("resize", debouncedCheckMobile);
        return () => window.removeEventListener("resize", debouncedCheckMobile);
    }, []);

    const features: FeatureCardProps[] = [
        {
            title: "Just Tap",
            description:
                "Share your contact details instantly with a single tap using NFC technology. No apps or extra steps needed—just a quick, effortless connection.",
        },
        {
            title: "Unique Profile",
            description:
                "Create a fully customizable digital profile that reflects your brand. Stand out with a sleek, professional design tailored to your identity.",
        },
        {
            title: "Seamless",
            description:
                "Enjoy compatibility across Android and iOS devices. Our solution ensures smooth, reliable sharing for every user, every time.",
        },
    ];

    return (
        <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
            <style>{`
                :root {
                    --primary: #3e60a2;
                    --primary-dark: #324e88;
                    --background: #000000;
                    --text: #ffffff;
                }
            `}</style>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
                    Why Choose <span className="text-[var(--primary)]">Todos Digitals</span>?
                </h2>

                {/* TEMPORARY USAGE OF isMobile TO AVOID WARNING */}
                {isMobile && <div className="sr-only">Mobile view</div>}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
