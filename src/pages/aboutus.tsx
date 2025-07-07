import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <section className="min-h-screen bg-black text-white flex items-center px-6 md:px-24 py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Big Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[16vw] md:text-[10vw] font-extrabold leading-none tracking-tight uppercase text-white"
                >
                    About Us
                </motion.h1>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-gray-300 text-base md:text-lg leading-relaxed"
                >
                    <p className="mb-4">
                        Tododigitals is a creative  powerhouse specializing in branding, digital design, print media, and innovative visual storytelling. Our mission is to elevate your brand identity through striking visuals and intentional design.
                    </p>
                    <p>
                        We believe in clean execution, smart communication, and designs that actually work. Whether you're a startup or a seasoned company, we deliver real results that leave lasting impressions.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
