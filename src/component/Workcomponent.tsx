import { useEffect, useRef } from 'react';

import gsap from 'gsap';

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

export default function OurWorkShow() {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth;

            gsap.to(track, {
                x: `-${totalWidth / 2}px`,
                duration: 40,
                ease: 'linear',
                repeat: -1,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-[#3e5fa2] py-20 px-6 h-[90vh]">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h3 className="text-lg md:text-[30px] text-[#c0cbe1] mb-2 font-medium">
                    Wherever your brand is on the journey, we’re here to elevate it.
                </h3>
                <p className="text-2xl md:text-[40px] font-normal w-[100%]  text-[#fff] leading-snug">
                    From Lagos to the World we leverage strategic thinking, creative designs,
                    quality prints and technology to give brands sustainable competitive advantage.
                </p>
                <h1 className="text-3xl pt-[32px] md:text-[40px] font-normal w-[100%]  text-[#fff] leading-snug">See Our Works</h1>
            </div>

            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-6 w-max"
                    style={{ willChange: 'transform' }}
                >
                    {[...workImages, ...workImages].map((src, i) => (
                        <div
                            key={i}
                            className="min-w-[250px] md:min-w-[400px] h-[280px] md:h-[220px] bg-white border border-neutral-200 rounded-xl overflow-hidden shadow hover:scale-105 transition duration-300"
                        >
                            <img
                                src={src}
                                alt={`Work ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
