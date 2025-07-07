import { Link } from "react-router-dom";

export default function NfcTagSection() {
    return (
        <section className="bg-[#3e5fa2] text-white py-1 md:py-0">
            <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Text Block */}
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        One Tap. Instant Connection.
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 mb-6">
                        Introducing our NFC Business Tag — a smart, contactless way to share your brand.
                        Just one tap and clients can instantly view your profile, portfolio, or contact details.
                        No apps, no friction.
                    </p>
                    <Link
                        to="/nfc-card"
                        className="inline-block px-7 py-3 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="https://i.ibb.co/0p4q7mjS/image-removebg-preview-1.png"
                        alt="NFC Business Tag Illustration"
                        className="w-full max-w-lg rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
}
