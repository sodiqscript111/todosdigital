import { useRef, useState, useEffect } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
                                             question,
                                             answer,
                                             index,
                                             isOpen,
                                             toggleOpen,
                                         }) => {
    return (
        <div
            className="bg-gradient-to-br from-slate-800 via-gray-900 to-black rounded-xl border border-gray-700 p-6 shadow-lg"
            role="region"
            aria-label={`FAQ: ${question}`}
        >
            <button
                className="w-full text-left flex justify-between items-center text-[var(--text)] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                onClick={toggleOpen}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
            >
                <span>{question}</span>
                <span className="text-[var(--primary)]">{isOpen ? "−" : "+"}</span>
            </button>
            <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
            >
                <p className="text-gray-300 text-base leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How does the 'Just Tap' feature work?",
            answer:
                "With Todos Digitals, you can share your contact details instantly using NFC technology. Simply tap your digital card or enabled device against a compatible smartphone (Android or iOS) to share your profile. No apps or internet connection is required for the recipient.",
        },
        {
            question: "Can I customize my digital profile?",
            answer:
                "Absolutely! Our 'Unique Profile' feature allows you to fully customize your digital business card with your branding, including logos, colors, and contact details. Create a professional, tailored design that reflects your personal or business identity.",
        },
        {
            question: "Is Todos Digitals compatible with all devices?",
            answer:
                "Yes, our 'Seamless' solution works with both Android and iOS devices that support NFC. For non-NFC devices, you can share your profile via a QR code or a link, ensuring accessibility for all users.",
        },
        {
            question: "Is my data secure with Todos Digitals?",
            answer:
                "Your data is protected with industry-standard encryption. You control what information is shared, and our platform ensures secure, contactless exchanges without storing sensitive data on the card itself.",
        },
        {
            question: "Do I need an app to use Todos Digitals?",
            answer:
                "No app is required for recipients to view your digital card. For creators, our web-based platform makes it easy to design and manage your profile, accessible from any browser on desktop or mobile.",
        },
        {
            question: "Can I update my digital card after creating it?",
            answer:
                "Yes, you can update your digital profile anytime through our platform. Changes are reflected instantly, so your contacts always have your latest information without needing a new card.",
        },
    ];

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

    return (
        <section
            ref={sectionRef}
            className={`bg-black text-white py-20 ${
                isMobile ? "px-4" : "px-8"
            } sm:px-6 lg:px-8 border-t border-neutral-800`}
        >
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
                    Frequently Asked{" "}
                    <span className="text-[var(--primary)]">Questions</span>
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            index={index}
                            isOpen={openIndex === index}
                            toggleOpen={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
