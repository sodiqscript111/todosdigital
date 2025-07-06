// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SetupPage from '../src/pages/setupPage';
import ProfilePage from '../src/pages/profilePage';
import LandingPage from '../src/pages/landingpage.tsx';
import HomePage from '../src/pages/homepage';
import AllServices from "../src/pages/AllServices";
import PrintingHero from "./pages/printingPage.tsx";
import SocialMediaHero from "./pages/socialpage.tsx";
import GraphicDesignHero from "./pages/graphics.tsx";
import BrandingHero from "./pages/branding.tsx";
import WebsiteHero from "./pages/website.tsx";
import VideoEditingHero from "./pages/videography.tsx";
import ScrollToTop from "./ScrollToTop";

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/nfc-card" element={<LandingPage />} />
                <Route path="/setup" element={<SetupPage/>}/>
                <Route path="/u/:slug" element={<ProfilePage />} />
                <Route path="/all-services" element={<AllServices />} />
                <Route path="/printing" element={<PrintingHero/>}/>
                <Route path="/social-media-design" element={<SocialMediaHero/>}/>
                <Route path="/graphic-design" element={<GraphicDesignHero/>}/>
                <Route path="/branding" element={<BrandingHero/>}/>
                <Route path="/website-design" element={<WebsiteHero/>}/>
                <Route path="/video-editing" element={<VideoEditingHero/>}/>
            </Routes>
        </Router>
    );
}

export default App;
