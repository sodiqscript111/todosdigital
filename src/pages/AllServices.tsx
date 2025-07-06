import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
    {
        image: "https://i.ibb.co/n8swZkrg/socialmedia.jpg",
        title: "Social Media Design",
        description: "Branded content for Instagram, LinkedIn, and beyond.",
        link: "/social-media-design",
    },
    {
        image: "https://i.ibb.co/Ng0X5rjw/graphis.jpg",
        title: "Graphic Design",
        description: "Posters, flyers, ads, logos, and creative compositions.",
        link: "/graphic-design",
    },
    {
        image: "https://i.ibb.co/kgCs62Yn/printing.png",
        title: "Printing",
        description: "Business cards, banners, and high-quality printed media.",
        link: "/printing",
    },
    {
        image: "https://i.ibb.co/ymQdvrbd/branding.jpg",
        title: "Branding",
        description: "Build a distinct voice and visual identity for your brand.",
        link: "/branding",
    },
    {
        image: "https://i.ibb.co/B2Y0Bd8S/webdevlopment.jpg",
        title: "Website Design",
        description: "Custom websites that reflect your brand’s value.",
        link: "/website-design",
    },
    {
        image: "https://i.ibb.co/gMbYrRdM/video.png",
        title: "Video Editing",
        description: "Motion graphics, edits, and promotional video content.",
        link: "/video-editing",
    },
];

export default function AllServices() {
    return (
        <motion.section
            className="min-h-screen bg-black text-white px-6 py-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Heading */}
            <motion.div
                className="text-center mb-14 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    Explore Our Wide Range of Services
                </h1>
                <p className="text-lg text-gray-400 mt-4">
                    A curated set of design, branding, and tech services to help your business grow visually and digitally.
                </p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[250px] w-full max-w-7xl"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {services.map((svc, index) => {
                    const bentoClass =
                        index === 0
                            ? "lg:col-span-3 lg:row-span-2"
                            : index === 4
                                ? "lg:col-span-3"
                                : "lg:col-span-2";

                    return (
                        <motion.div
                            key={index}
                            className={`relative overflow-hidden rounded-xl shadow-xl ${bentoClass}`}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={svc.image}
                                alt={svc.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-end space-y-2">
                                <h3 className="text-xl font-bold">{svc.title}</h3>
                                <p className="text-sm text-gray-300">{svc.description}</p>
                                <Link
                                    to={svc.link}
                                    className="inline-flex w-fit items-center text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition mt-2"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.section>
    );
}
