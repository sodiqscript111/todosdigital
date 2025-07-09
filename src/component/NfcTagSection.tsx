export default function NfcTagSection() {
    return (
        <section
            className="relative bg-cover bg-center text-white min-h-[80vh] flex items-center justify-center"
            style={{
                backgroundImage: "url('https://i.ibb.co/Pz91TKGs/Handshake.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#29364f]/90"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl px-4 pt-10 flex flex-col md:flex-row items-center justify-between">
                {/* Text */}
                <div className="flex-1 text-left space-y-4">
                    <h2 className="text-5xl font-bold leading-tight">Smart</h2>
                    <h2 className="text-5xl font-bold leading-tight">Business Card</h2>
                    <h3 className="text-2xl font-semibold text-white/90">
                        One Tap. Instant Connection.
                    </h3>
                    <p className="text-lg text-white/80 max-w-md">
                        A digital business card for you and your team — instantly share your latest business info, stand out with tech, and easily capture leads.
                    </p>
                    <a
                        href="/nfc-card"
                        className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
                    >
                        Create Account
                    </a>
                </div>

                {/* Image */}
                <div className="flex-1 flex justify-center md:justify-end h-100vh]">
                    <img
                        src="https://i.ibb.co/Swxfncpj/image-removebg-preview-9.png"
                        alt="NFC Tag"
                        className="h-full w-[500px] mt-[100px]"
                    />
                </div>
            </div>
        </section>
    );
}
