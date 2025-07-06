import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

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

    const navLinks = [
        { to: "/setup", label: "Get Started" },
        { to: "/learn-more", label: "Learn More" },
        { to: "/faq", label: "FAQ" },
        { to: "/contact", label: "Contact" },
    ];

    const socialLinks = [
        { href: "https://twitter.com", label: "Twitter", icon: "fab fa-twitter" },
        { href: "https://linkedin.com", label: "LinkedIn", icon: "fab fa-linkedin" },
        { href: "https://instagram.com", label: "Instagram", icon: "fab fa-instagram" },
    ];

    return (
        <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800 relative">
            <style>{`
        :root {
          --primary: #3e60a2;
          --primary-dark: #324e88;
          --background: #000000;
          --text: #ffffff;
        }
      `}</style>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
                    {/* Brand and Description */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold">
                            <span className="text-[var(--primary)]">Todos</span> Digitals
                        </h2>
                        <p className="text-gray-300 text-base leading-relaxed mt-2 max-w-md">
                            Transform your networking with sleek, contactless digital business cards powered by NFC technology.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Quick Links</h3>
                        <ul className="space-y-2">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-[var(--primary)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                                        aria-label={link.label}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact and Social Media */}
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Contact Us</h3>
                            <p className="text-gray-300 text-base">
                                Email:{" "}
                                <a
                                    href="mailto:support@todosdigitals.com"
                                    className="hover:text-[var(--primary)] transition-colors duration-300"
                                    aria-label="Email support"
                                >
                                    support@todosdigitals.com
                                </a>
                            </p>
                            <p className="text-gray-300 text-base">Phone: +1 (800) 123-4567</p>
                        </div>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-[var(--primary)] text-2xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                                    aria-label={social.label}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile-only note or adjustment (use isMobile if needed) */}
                {isMobile && (
                    <div className="text-center text-sm text-gray-400 mt-4">
                        You’re viewing the mobile version.
                    </div>
                )}

                {/* Copyright */}
                <div className="mt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Todos Digitals. All rights  reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
