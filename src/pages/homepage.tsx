// app/page.tsx or pages/index.tsx
import HeroSection from "../component/Hero";
import Offers from "../component/Offers.tsx"
import NfcTagSection from "../component/NfcTagSection.tsx";
import AboutUsSection from "../component/AboutUsSection.tsx";
import FooterSection from "../component/Footer.tsx";
export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <HeroSection />
            <Offers />
            <NfcTagSection />
            <AboutUsSection />
            <FooterSection />
            {/* Upcoming sections: What We Offer, NFC Tag, CTA, Footer */}
        </main>
    );
}
