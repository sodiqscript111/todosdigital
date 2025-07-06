import { motion } from "framer-motion";

export default function AboutUsSection() {
    return (
        <section className="bg-white text-black py-20 px-6 md:px-28">
            <motion.div
                className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Left Text Content */}
                <div className="flex-1 text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
                        About Tododigitals
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                        Tododigitals is a creative powerhouse focused on innovative design and smart digital solutions.
                        We specialize in building unique brand experiences—from social content and web presence to motion graphics and print collateral—helping businesses connect and grow.
                    </p>
                </div>

                {/* Right Single Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="https://i.ibb.co/1YYcQ2M4/Image-fx-75.png"
                        alt="About Tododigitals"
                        className="rounded-xl shadow-lg w-full sm:w-auto max-w-sm"
                    />
                </div>
            </motion.div>
        </section>
    );
}
