import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight } from "lucide-react";

const services = [
    {
        image: "https://i.ibb.co/n8swZkrg/socialmedia.jpg",
        title: "Social Media Design",
        description:
            "Engaging branded graphics for Facebook, Instagram, LinkedIn, Twitter, and more.",
        link: "/social-media-design",
    },
    {
        image: "https://i.ibb.co/Ng0X5rjw/graphis.jpg",
        title: "Graphic Design",
        description:
            "Stunning visuals for digital and print: logos, banners, ads, and more.",
        link: "/graphic-design",
    },
    {
        image: "https://i.ibb.co/kgCs62Yn/printing.png",
        title: "Printing",
        description:
            "Flyers, posters, banners, business cards—high-quality offline branding.",
        link: "/printing",
    },
    {
        image: "https://i.ibb.co/ymQdvrbd/branding.jpg",
        title: "Branding",
        description:
            "Complete identity systems to build and maintain a strong brand voice.",
        link: "/branding",
    },
    {
        image: "https://i.ibb.co/B2Y0Bd8S/webdevlopment.jpg",
        title: "Website Design",
        description:
            "Responsive, modern web design tailored to your audience and goals.",
        link: "/website-design",
    },
    {
        image: "https://i.ibb.co/gMbYrRdM/video.png",
        title: "Video Editing",
        description:
            "Creative video cuts and motion graphics for ads, promos, and social content.",
        link: "/video-editing",
    },
];

export default function OffersCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
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
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "25px",
                },
            },
        ],
    };

    return (
        <section className="h-screen bg-white px-6 md:px-28 pt-6 md:pt-10 pb-10 flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mt-[40px]">
                <h2 className="text-4xl md:text-5xl font-extrabold text-black">What We Offer</h2>
                <p className="text-xl md:text-2xl text-black-300 mt-4">
                    Explore our range of services tailored to elevate your brand.
                </p>
            </div>

            {/* Carousel */}
            <div className="flex-1 pt-10">
                <Slider {...settings}>
                    {services.map((svc, index) => (
                        <div key={index} className="px-4">
                            <div className="h-[55vh] rounded-xl overflow-hidden shadow-lg relative">
                                <img
                                    src={svc.image}
                                    alt={svc.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/90 to-transparent text-white flex items-end p-6">
                                    <div className="max-w-md">
                                        <h3 className="text-2xl font-bold mb-2">{svc.title}</h3>
                                        <p className="text-base mb-4 leading-relaxed">{svc.description}</p>
                                        <Link
                                            to={svc.link}
                                            className="inline-block px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* All Services Button */}
            <div className="text-center mt-6">
                <Link
                    to="/all-services"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-black text-white text-base font-semibold rounded-full hover:bg-gray-200 transition"
                >
                    All Services <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
