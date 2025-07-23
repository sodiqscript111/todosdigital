import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [slug, setSlug] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userId = localStorage.getItem('user_id');

        if (token && userId) {
            axios
                .get(`https://tododigitals.azurewebsites.net/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setUserName(res.data.full_name);
                    setSlug(res.data.slug);
                })
                .catch(() => {
                    setUserName(null);
                    setSlug(null);
                });
        }
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="sticky top-0 z-50 bg-white text-black shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src="https://i.ibb.co/tMhBPjdV/image-removebg-preview.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center text-base font-medium">
                        <Link to="/all-services" className="hover:text-gray-700">
                            Our Services
                        </Link>
                        <Link to="/about" className="hover:text-gray-700">
                            About Us
                        </Link>
                        <Link to="/products" className="hover:text-gray-700">
                            All Products
                        </Link>
                        <Link to="/ourwork" className="hover:text-gray-700">
                            Our Work
                        </Link>
                        <Link to="/contact" className="hover:text-gray-700">
                            Contact Us
                        </Link>
                        {userName && slug ? (
                            <Link to={`/u/${slug}`} className="hover:text-gray-700">
                                {userName}
                            </Link>
                        ) : (
                            <Link to="/register" className="hover:text-gray-700">
                                Sign Up for Business Card
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-3 text-base font-medium">
                    <Link to="/all-services" className="block text-black hover:text-gray-700">
                        Our Services
                    </Link>
                    <Link to="/about" className="block text-black hover:text-gray-700">
                        About Us
                    </Link>
                    <Link to="/products" className="block text-black hover:text-gray-700">
                        All Products
                    </Link>
                    <Link to="/ourwork" className="block text-black hover:text-gray-700">
                        Our Work
                    </Link>
                    <Link to="/contact" className="block text-black hover:text-gray-700">
                        Contact Us
                    </Link>
                    {userName && slug ? (
                        <Link to={`/u/${slug}`} className="block text-black hover:text-gray-700">
                            {userName}
                        </Link>
                    ) : (
                        <Link to="/register" className="block text-black hover:text-gray-700">
                            Sign Up for Business Card
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
