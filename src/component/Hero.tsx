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

const images = [
    "https://i.ibb.co/67VSLPhB/Chat-GPT-Image-Jul-7-2025-11-03-10-AM.png",
    "https://i.imghippo.com/files/aDu3042dEA.jpg",
];

export default function HeroSection() {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const serviceInterval = setInterval(() => {
            setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        }, 2000);

        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(serviceInterval);
            clearInterval(imageInterval);
        };
    }, []);

    return (
        <section
            className="h-[50vh]  sm:h-[90vh] md:h-screen w-full bg-cover bg-center bg-no-repeat text-white relative font-sans transition-all duration-700"
            style={{
                backgroundImage: `url(${images[currentImageIndex]})`,
            }}
        >
            {/* Content */}
            <div className="relative h-full w-full flex items-center ">
                <div className="px-6 sm:px-10 md:px-20 max-w-4xl space-y-5">
                    <p className="text-xl sm:text-2xl font-medium">Your Ultimate Creative Partner</p>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                        All Your Brand Needs to Grow and Stand Out
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl max-w-xl">
                        What service would you need today{" "}
                        <span className="text-yellow-400 font-semibold">
                            {services[currentServiceIndex]}?
                        </span>
                    </p>
                    <a
                        href="#contact"
                        className="inline-block bg-[#3e60a2] text-white px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg md:text-xl rounded shadow hover:bg-black transition duration-300"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
