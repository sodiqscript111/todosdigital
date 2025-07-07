// src/components/CreativeWorkGrid.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workImages = [
    "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
    "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
    "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
    "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
    "https://i.ibb.co/TDzYgSY0/Whats-App-Image-2025-07-06-at-14-24-47-9af0bf2b.jpg",
    "https://i.ibb.co/WNLvbtMX/Whats-App-Image-2025-07-06-at-14-24-46-b93a99f2.jpg",
    "https://i.ibb.co/S7Q7p95T/Whats-App-Image-2025-07-06-at-14-24-35-23a2f923.jpg",
    "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
    "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
];

export default function CreativeWorkGrid() {
    const imageRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        imageRefs.current.forEach((el, i) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <section className="bg-black py-16 px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-black">
                Some of Our Works
            </h2>
            <div className="columns-2 md:columns-3 gap-4 space-y-4 max-w-6xl mx-auto">
                {workImages.map((url, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el) imageRefs.current[index] = el;
                        }}
                        className="break-inside-avoid overflow-hidden rounded-xl shadow-md border border-neutral-200 bg-white hover:scale-[1.03] transition duration-300"
                    >
                        <img
                            src={url}
                            alt={`Work ${index + 1}`}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
