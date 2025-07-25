import { Link } from "react-router-dom";

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
        name: "Business Card (PVC)",
        price: "18,000 per 100",
        image: "https://i.ibb.co/MxQDNvN7/Image-fx-80.png",
    },
    {
        name: "Business Card (Metal)",
        price: "25,000 per 100",
        image: "https://i.ibb.co/N66JFDNY/Image-fx-79.png",
    },
    {
        name: "Business Card (Paper)",
        price: "12,000 per 100",
        image: "https://i.ibb.co/20yxp5Nh/Image-fx-78.png",
    },
    {
        name: "Business Card (Wood)",
        price: "20,000 per 100",
        image: "https://i.ibb.co/xtX9sdws/Image-fx-77.png",
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


export default function AllProductsPage() {
    return (
        <div className="min-h-screen w-full bg-white py-12 px-6 md:px-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-black">All Products</h1>
                <p className="text-gray-600 text-lg mt-2">
                    Discover all our quality printing products
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="overflow-hidden bg-neutral-100 hover:shadow-xl transition duration-300 cursor-pointer"
                    >
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
                                Get Quote
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-16">
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
