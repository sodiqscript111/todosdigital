export default function NfcTagSection() {
    return (
        <section
            className="relative bg-cover bg-center text-white min-h-[75vh] flex items-center justify-center"
            style={{
                backgroundImage: "url('https://i.ibb.co/Pz91TKGs/Handshake.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#29364f]/90"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl pt-[20px] mx-auto w-full h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-full px-4 md:px-8">

                    {/* Text Block */}
                    <div className="flex-1 flex flex-col items-start text-left space-y-4 mt-auto mb-36">
                        <div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">Smart</h2>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">Business Card</h2>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                            One Tap. Instant Connection.
                        </h3>

                        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-md leading-relaxed">
                            A digital business card for you and your team — instantly share your latest business info, stand out with tech, and easily capture leads.
                        </p>

                        <a
                            href="/nfc-card"
                            className="inline-block px-6 py-2 bg-white text-black text-sm sm:text-base font-semibold rounded-full hover:bg-gray-200 transition"
                        >
                            Create Account
                        </a>
                    </div>

                    {/* Image Block */}
                    <div className="flex-1 flex justify-center md:justify-end h-full">
                        <img
                            src="https://i.ibb.co/sv567FLv/image-removebg-preview-2.png"
                            alt="NFC Business Tag"
                            className="h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
