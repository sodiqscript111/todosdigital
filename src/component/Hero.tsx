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
            className="h-[80vh] sm:h-[90vh] md:h-screen w-full bg-cover bg-center text-white flex flex-col justify-between relative font-sans"
            style={{
                backgroundImage: "url('https://i.imghippo.com/files/MtMo9266IE.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>

            {/* Content */}
            <div className="relative flex-1 flex flex-col justify-center items-start text-left px-8 z-10 pt-20 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
                    The Business Solution You Need
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl">
                    We offer services like{" "}
                    <span className="text-[#3e60a2] font-semibold">
                        {services[currentServiceIndex]}
                    </span>
                </p>
                <a
                    href="#contact"
                    className="inline-block bg-[#3e60a2] text-white px-10 py-4 shadow-lg hover:bg-black-200 transition duration-300 text-lg md:text-xl"
                >
                    Contact Us
                </a>
            </div>
        </section>
    );
}
