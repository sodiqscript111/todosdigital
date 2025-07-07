import { Link } from "react-router-dom";

export default function NfcTagSection() {
    return (
        <section
            className="relative h-auto md:h-[65vh] bg-cover bg-center text-white"
            style={{
                backgroundImage: "url('https://i.ibb.co/Pz91TKGs/Handshake.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#29364f]/80"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-10 md:absolute md:bottom-0 md:left-0 md:right-0">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-12">
                    {/* Text Block */}
                    <div className="text-left flex-1 mb-6 md:mb-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            One Tap. Instant Connection.
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 max-w-md">
                            Introducing our NFC Business Tag — a smart, contactless way to share your brand.
                            Just one tap and clients can instantly view your profile, portfolio, or contact details.
                            No apps, no friction.
                        </p>
                        <Link
                            to="/nfc-card"
                            className="inline-block px-5 py-2 bg-white text-black text-sm sm:text-base font-semibold rounded-full hover:bg-gray-200 transition"
                        >
                            Create Account
                        </Link>
                    </div>

                    {/* Image Block */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <img
                            src="https://i.ibb.co/XfH8zQF6/Creative-Credentials-Website.png"
                            alt="NFC Business Tag Illustration"
                            className="w-[200px] sm:w-[240px] md:w-[300px] rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
