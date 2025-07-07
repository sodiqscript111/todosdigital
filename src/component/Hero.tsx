"use client";

export default function HeroSection() {
    return (
        <section
            className="h-[80vh] sm:h-[60vh] md:h-screen w-full bg-cover bg-center bg-no-repeat text-white relative font-sans"
            style={{
                backgroundImage:
                    "url('https://i.ibb.co/67VSLPhB/Chat-GPT-Image-Jul-7-2025-11-03-10-AM.png')",
            }}
        >
            {/* Top Content Block */}
            <div className="relative z-10 px-6 sm:px-12 pt-10 flex flex-col items-start space-y-4 max-w-3xl">
                <p className="text-sm sm:text-base text-white/80 uppercase tracking-wide">
                    The ultimate creative partner
                </p>

                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                    All Your Brand Needs To Grow and Standout
                </h1>

                <p className="text-sm sm:text-lg text-white/90">
                    What do you need today
                </p>

                <a
                    href="#contact"
                    className="inline-block bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
                >
                    Get Started
                </a>
            </div>
        </section>
    );
}
