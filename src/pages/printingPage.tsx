import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PrintingHero() {
    return (
        <section
            className="h-[80vh] sm:h-[90vh] md:h-screen w-full bg-cover bg-center text-white flex flex-col justify-end relative font-sans"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co/kgCs62Yn/printing.png')", // Replace with your preferred background
            }}
        >
            {/* Bottom-left gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

            {/* Text Content */}
            <motion.div
                className="relative z-10 px-6 md:px-20 pb-20 space-y-6 max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Print, Merchandise and Packaging Design Services
                </h1>
                <p className="text-xl md:text-2xl text-gray-200">
                    From custom t-shirts and branded stationery to premium product packaging, we help you bring your brand to life in the real world with high-impact print and merchandise designs.
                </p>
                <Link
                    to="/book-call"
                    className="inline-block bg-white text-black px-10 py-4 shadow-lg hover:bg-gray-200 transition duration-300 text-lg md:text-xl "
                >
                    Book A Call
                </Link>
            </motion.div>
        </section>
    );
}
