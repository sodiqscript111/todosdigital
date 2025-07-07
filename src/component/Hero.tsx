"use client";
import { useEffect, useState } from "react";

const services = [
    "Social Media Design",
    "Graphic Design",
    "Printing",
    "Branding",
    "Website Design",
    "Video Editing",
    "Digital Marketing",
    "Animation",
];

export default function HeroSection() {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="h-[80vh] sm:h-[60vh] md:h-screen w-full bg-cover bg-center bg-no-repeat text-white flex flex-col justify-between relative font-sans"
            style={{
                backgroundImage: "url('https://i.ibb.co/67VSLPhB/Chat-GPT-Image-Jul-7-2025-11-03-10-AM.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 "></div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col justify-center items-start text-left px-8 z-10 pt-10 space-y-6 mt-[-300px]">
                <p className="text-[27px]">Your Utimate creative partner
                </p>
                <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
                    All Your Brand needs to Grow and Stand Out
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl">
                    What service would you need today {" "}
                    <span className="text-[yellow] font-semibold">
                        {services[currentServiceIndex]} ?
                    </span>
                </p>
                <a
                    href="#contact"
                    className="inline-block bg-[#3e60a2] text-white px-10 py-4 shadow-lg hover:bg-black transition duration-300 text-lg md:text-xl"
                >
                    Contact Us
                </a>
            </div>
        </section>
    );
}
