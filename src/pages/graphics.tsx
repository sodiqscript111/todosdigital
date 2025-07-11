import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

// Work Images
const workImages = [
    "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
    "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
    "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
    "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
    "https://i.ibb.co/n4sRXVk/image-removebg-preview-5.png",
    "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
    "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
];

export default function GraphicDesignHero() {
    // Slick slider settings
    const settings = {
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

    // Remove scrollbar globally from slick
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .slick-slider {
        overflow: hidden !important;
      }
      .slick-slider::-webkit-scrollbar {
        display: none !important;
      }
    `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section
                className="h-[80vh] sm:h-[90vh] md:h-[70vh] w-full bg-cover bg-center text-white flex flex-col justify-end relative font-sans"
                style={{
                    backgroundImage: "url('https://i.ibb.co/Ng0X5rjw/graphis.jpg')",
                }}
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
                        Bold, beautiful visuals — from logos to layouts. We craft compelling
                        graphic assets for digital, print, and everything in between to
                        elevate your brand story.
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
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            How our design and print service works
                        </h2>
                        <p className="text-lg text-gray-700">
                            We make it easy for you to benefit from premium design and
                            printing. Collaborate with our expert design team to bring your
                            ideas to life, fast.
                        </p>
                        <Link
                            to="/get-quote"
                            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition text-base font-semibold"
                        >
                            Get a Quote
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-1">Step 1. Describe</h3>
                            <p className="text-gray-600">
                                Fill out our design brief – we’ll use the details you provide to
                                estimate your timeline and pricing.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Step 2. Review</h3>
                            <p className="text-gray-600">
                                Receive a first draft and work with our designers until it’s
                                perfect — unlimited revisions included.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Step 3. Finalize</h3>
                            <p className="text-gray-600">
                                Choose your paper type, finish, and quantity. We'll handle the
                                rest.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Step 4. Print & Ship</h3>
                            <p className="text-gray-600">
                                We print, pack, and ship your materials to your doorstep —
                                beautifully done and on time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Some of Our Work - Slider */}
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

                <section className="bg-white h-full text-black px-6 md:px-20 py-20 font-sans">
                    <div className="max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2  gap-12 items-start">
                        {/* Left Image */}
                        <div className="w-full h-full">
                            <img
                                src="https://i.ibb.co/chYZY5qt/ennnnq.png"
                                alt="Project Inquiry"
                                className="w-full h-full object-cover rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Right Form */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Have a project? <br /> We would love to help.
                            </h2>

                            <form className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">What type of service are you looking for?</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Logo design, brochure, etc."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Your Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Your Email</label>
                                        <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Phone Number</label>
                                        <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Project Name</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Product Type</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">How Many Pages?</label>
                                        <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Width (inches)</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Height (inches)</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">How Soon Do You Need Your Design?</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">Tell Us About Your Project</label>
                                    <textarea
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
                                    ></textarea>
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

            {/* Project Inquiry Section */}


        </>
    );
}
