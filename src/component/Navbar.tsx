import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
    <Link to="/services" className="hover:text-gray-700 text-base font-medium">
        Our Services
    </Link>
    <Link to="/about" className="hover:text-gray-700 text-base font-medium">
        About Us
    </Link>
    <Link to="/products" className="hover:text-gray-700 text-base font-medium">
        All Products
    </Link>
    <Link
    to="/contact"
    className="ml-4 bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
        >
        Contact Us
    </Link>
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
        <Link to="/services" className="block text-base font-medium text-black">
        Our Services
    </Link>
    <Link to="/about" className="block text-base font-medium text-black">
        About Us
    </Link>
    <Link to="/products" className="block text-base font-medium text-black">
        All Products
    </Link>
    <Link
        to="/contact"
        className="block w-full text-center bg-black text-white py-2 rounded-full font-semibold"
            >
            Contact Us
    </Link>
    </div>
    )}
    </nav>
);
}
