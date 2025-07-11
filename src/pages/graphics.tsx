import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider, {type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

/* -------------------------------------------------------------------------- */
/*                               Static Assets                                */
/* -------------------------------------------------------------------------- */

const workImages = [
    "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
    "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
    "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
    "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
    "https://i.ibb.co/n4sRXVk/image-removebg-preview-5.png",
    "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
    "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
];

/* -------------------------------------------------------------------------- */
/*                                   View                                     */
/* -------------------------------------------------------------------------- */

export default function GraphicDesignHero() {
    /* --------------------------- Slick configuration ------------------------ */
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20px",
                },
            },
        ],
    };

    /* ------------------- Global scrollbar‑hiding side‑effect --------------- */
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .slick-slider{overflow:hidden!important}
      .slick-slider::-webkit-scrollbar{display:none!important}
    `;
        document.head.appendChild(style);

        // ⬇︎ Cleanup must return void
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    /* -------------------------------- Render ------------------------------- */
    return (
        <>
            {/* Hero Section */}
            <section
                className="h-[80vh] sm:h-[90vh] md:h-[70vh] w-full bg-cover bg-center text-white flex flex-col justify-end relative font-sans"
                style={{ backgroundImage: "url('https://i.ibb.co/Ng0X5rjw/graphis.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
                <motion.div
                    className="relative z-10 px-6 md:px-20 pb-20 space-y-6 max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Graphic Design Services
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200">
                        Bold, beautiful visuals — from logos to layouts. We craft compelling graphic
                        assets for digital, print, and everything in between to elevate your brand
                        story.
                    </p>
                    <Link
                        to="/book-call"
                        className="inline-block bg-white text-black px-10 py-4 shadow-lg hover:bg-gray-200 transition duration-300 text-lg md:text-xl"
                    >
                        Book A Call
                    </Link>
                </motion.div>
            </section>

            {/* How it Works Section */}
            <section className="bg-white text-black px-6 md:px-20 py-20 font-sans">
                {/* …unchanged… */}
            </section>

            {/* Some of Our Work – Slider */}
            <section className="bg-white py-16 px-6 md:px-20 font-sans overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
                    Some of Our Work
                </h2>

                <Slider {...settings} className="no-scrollbar">
                    {workImages.map((img, idx) => (
                        <div key={idx} className="px-4">
                            <div className="h-[55vh] rounded-xl overflow-hidden shadow-lg relative">
                                <img
                                    src={img}
                                    alt={`Work ${idx + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Project Inquiry Section */}
                <section className="bg-white h-full text-black px-6 md:px-20 py-20 font-sans">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Left Image */}
                        {/* …unchanged… */}

                        {/* Right Form */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Have a project? <br /> We would love to help.
                            </h2>

                            <form className="space-y-5">
                                {/* …all inputs unchanged… */}

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Tell Us About Your Project
                                    </label>
                                    {/* rows -> number, not string */}
                                    <textarea
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
                                >
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
