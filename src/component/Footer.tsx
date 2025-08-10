import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
        <footer className="bg-black text-white py-10 px-4 border-t border-neutral-800">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Brand */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">
                        <span className="text-[#3e60a2]">Todos</span> Digitals
                    </h2>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed max-w-sm mx-auto">
                        Transform your networking with sleek, contactless digital business cards powered by NFC technology.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
                    {/* Navigation */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-[#3e60a2] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Social */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                        <p className="text-gray-300 text-sm">
                            Email:{" "}
                            <a
                                href="mailto:support@todosdigitals.com"
                                className="hover:text-[#3e60a2] transition-colors"
                            >
                                support@todosdigitals.com
                            </a>
                        </p>
                        <p className="text-gray-300 text-sm">Phone: 09166027379</p>

                        <div className="flex justify-center sm:justify-start gap-4 mt-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-[#3e60a2] text-xl"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile note */}
                {isMobile && (
                    <p className="text-center text-xs text-gray-500">
                        You’re viewing the mobile version.
                    </p>
                )}

                {/* Copyright */}
                <div className="text-center text-gray-400 text-xs mt-6 border-t border-neutral-800 pt-4">
                    &copy; {new Date().getFullYear()} Todos Digitals. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
