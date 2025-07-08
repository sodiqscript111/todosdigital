import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [slug, setSlug] = useState<string | null>(null);
    const navigate = useNavigate();

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

    const renderButton = () => {
        if (userName && slug) {
            return (
                <button
                    onClick={() => navigate(`/u/${slug}`)}
                    className="ml-4 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm hover:bg-gray-800 transition"
                    title="Go to Profile"
                >
                    {userName.charAt(0).toUpperCase()}
                </button>
            );
        } else {
            return (
                <Link
                    to="/register"
                    className="ml-4 bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
                >
                    Sign Up for Business Card
                </Link>
            );
        }
    };

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
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/all-services" className="hover:text-gray-700 text-base font-medium">
                            Our Services
                        </Link>
                        <Link to="/about" className="hover:text-gray-700 text-base font-medium">
                            About Us
                        </Link>
                        <Link to="/products" className="hover:text-gray-700 text-base font-medium">
                            All Products
                        </Link>
                        <Link to="/ourwork" className="hover:text-gray-700 text-base font-medium">
                            Our Work
                        </Link>
                        <Link
                            to="/contact"
                            className="ml-4 bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
                        >
                            Contact Us
                        </Link>
                        {renderButton()}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-4 pb-6 space-y-3">
                    <Link to="/all-services" className="block text-base font-medium text-black">
                        Our Services
                    </Link>
                    <Link to="/about" className="block text-base font-medium text-black">
                        About Us
                    </Link>
                    <Link to="/products" className="block text-base font-medium text-black">
                        All Products
                    </Link>
                    <Link to="/ourwork" className="block text-base font-medium text-black">
                        Our Work
                    </Link>
                    <Link
                        to="/contact"
                        className="block w-full text-center bg-black text-white py-2 rounded-full font-semibold"
                    >
                        Contact Us
                    </Link>
                    {userName && slug ? (
                        <Link
                            to={`/u/${slug}`}
                            className="block w-full text-center bg-black text-white py-2 rounded-full font-semibold"
                        >
                            My Profile
                        </Link>
                    ) : (
                        <Link
                            to="/register"
                            className="block w-full text-center bg-black text-white py-2 rounded-full font-semibold"
                        >
                            Sign Up for Business Card
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
