
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
    name: string;
    price: string;
    image: string;
}

const products: Product[] = [
    {
        name: "Flyer",
        price: "15,000 per 100",
        image: "https://i.ibb.co/WN08nCCh/Whats-App-Image-2025-07-06-at-14-24-34-27421a02.jpg",
    },
    {
        name: "Business Card",
        price: "12,000 per 100",
        image: "https://i.ibb.co/9H3mhC2v/business-cards-791facf7936befec4c7b.png",
    },
    {
        name: "Book Cover",
        price: "20,000 per 100",
        image: "https://i.ibb.co/S4pjXMzr/Whats-App-Image-2025-07-06-at-14-24-50-d6f8c1ef.jpg",
    },
    {
        name: "Poster",
        price: "18,000 per 100",
        image: "https://i.ibb.co/TxwVhTjt/Whats-App-Image-2025-07-06-at-14-24-37-161ad57c.jpg",
    },
    {
        name: "Custom Brochure",
        price: "22,000 per 100",
        image: "https://i.ibb.co/S7Q7p95T/Whats-App-Image-2025-07-06-at-14-24-35-23a2f923.jpg",
    },
    {
        name: "Sticker Label",
        price: "10,000 per 100",
        image: "https://i.ibb.co/xKPZVtGT/Whats-App-Image-2025-07-06-at-14-24-34-8fe47a0f.jpg",
    },
    {
        name: "Custom Notebook",
        price: "25,000 per 100",
        image: "https://i.ibb.co/WNLvbtMX/Whats-App-Image-2025-07-06-at-14-24-46-b93a99f2.jpg",
    },
    {
        name: "Envelope Design",
        price: "13,000 per 100",
        image: "https://i.ibb.co/TDzYgSY0/Whats-App-Image-2025-07-06-at-14-24-47-9af0bf2b.jpg",
    },
    {
        name: "Roll-up Banner",
        price: "30,000 each",
        image: "https://i.ibb.co/WSmLdfF/Latest-Work-010-31b6aac22e58ea04e9d5.png",
    },
];

export default function PrintingProducts() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="w-full bg-white py-12 px-6 md:px-24">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-black">Print Products</h2>
                <p className="text-gray-600 text-lg mt-2">Order quality prints for your brand or business</p>
            </div>

            <Slider {...settings}>
                {products.map((product, index) => (
                    <div key={index} className="px-4">
                        <div className=" overflow-hidden bg-neutral-100 hover:shadow-xl transition duration-300 cursor-pointer">
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4 text-black flex flex-col justify-between h-40">
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-700 mt-1">{product.price}</p>
                                </div>
                                <a
                                    href={`https://wa.me/2349166027379?text=I want to order for *${encodeURIComponent(
                                        product.name
                                    )}*`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition"
                                >
                                    Order Now
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
