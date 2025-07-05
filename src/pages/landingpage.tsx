import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#3e60a2]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-slate-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-20 gap-16 min-h-screen">
                {/* Left Content */}
                <motion.div
                    className="lg:w-1/2 w-full text-center lg:text-left space-y-8"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                        <span className="text-[#3e60a2]">Todos</span> Digitals
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                        Build your identity with intelligent NFC profiles — secure, elegant, and instantly accessible.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            to="/setup"
                            className="px-6 py-3 bg-[#3e60a2] text-white text-base font-medium rounded-lg hover:bg-[#324e88] transition-all duration-300"
                        >
                            Get Started
                        </Link>

                        <button className="px-6 py-3 border border-gray-500 text-gray-300 text-base font-medium rounded-lg hover:border-white hover:text-white transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                    className="lg:w-1/2 w-full flex justify-center items-center relative"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-md">
                        {/* Floating Card Stack */}
                        <motion.div
                            className="relative"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-80 h-48 bg-gray-900 rounded-xl border border-slate-700/40"
                                    style={{
                                        transform: `rotate(${-4 + i * 2}deg) translateY(${i * 6}px) translateX(${i * 3}px)`,
                                        zIndex: 3 - i,
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 0.2 + i * 0.2, scale: 1 }}
                                    transition={{ duration: 1, delay: i * 0.15 }}
                                />
                            ))}

                            <motion.div
                                className="relative w-80 h-48 bg-gradient-to-br from-slate-800 via-gray-900 to-black rounded-xl border border-gray-700 overflow-hidden"
                                style={{ zIndex: 4 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            >
                                {/* Card content */}
                                <div className="p-6 h-full flex flex-col justify-between">
                                    <motion.div
                                        className="w-14 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-md flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                    >
                                        <div className="grid grid-cols-3 gap-1">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
                                            ))}
                                        </div>
                                    </motion.div>

                                    <div className="space-y-2">
                                        <motion.div
                                            className="flex space-x-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 1.2 }}
                                        >
                                            <div className="w-8 h-2 bg-slate-600 rounded-full"></div>
                                            <div className="w-12 h-2 bg-slate-600 rounded-full"></div>
                                        </motion.div>
                                        <motion.div
                                            className="w-24 h-2 bg-slate-600 rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 1.4 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
