import WorkShowcase from "../component/workshowcase";
import { motion } from "framer-motion";

export default function OurWorkPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header Section */}
            <section className="w-full px-6 md:px-20 py-20 flex flex-col md:flex-row gap-10 items-start md:items-center">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-[6rem] md:text-[10rem] leading-none font-bold uppercase tracking-tight text-white"
                    style={{ lineHeight: "1" }}
                >
                    Work
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-2xl text-gray-300 text-lg leading-relaxed"
                >
                    Discover a selection of our finest design and print projects. From flyers and cards to premium packaging — everything crafted to elevate your brand's presence.
                </motion.div>
            </section>

            {/* Showcase Section */}
            <WorkShowcase />
        </div>
    );
}
