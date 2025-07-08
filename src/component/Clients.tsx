import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const clientLogos = [
    "https://i.ibb.co/5hyMm3P9/image-removebg-preview-8.png",
    "https://i.ibb.co/FLzJskyM/image-removebg-preview-7.png",
    "https://i.ibb.co/cKrXmG23/image-removebg-preview-6.png",
    "https://i.ibb.co/n4sRXVk/image-removebg-preview-5.png",
    "https://i.ibb.co/rK20Mcc9/image-removebg-preview-4.png",
    "https://i.ibb.co/4ZBShSV8/image-removebg-preview-3.png",
    "https://i.ibb.co/9kdfMzHw/logo1-removebg-preview.png",
    "https://i.ibb.co/35z7j8jM/logo9-removebg-preview.png",
];

export default function ClientSlider() {
    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <section className="py-10 bg-white">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-black">
                Our Clients
            </h2>
            <h3 className="text-3xl md:text-3xl font text-center mb-12 text-black"> We are trusted by brands across the globe</h3>
            <div className="px-4">
                <Slider {...settings}>
                    {clientLogos.map((logo, index) => (
                        <div key={index} className="px-4">
                            <img
                                src={logo}
                                alt={`Client ${index + 1}`}
                                className="mx-auto h-26 object-contain"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
