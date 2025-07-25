import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SetupPage from '../src/pages/setupPage';
import ProfilePage from '../src/pages/profilePage';
import LandingPage from '../src/pages/landingpage.tsx';
import HomePage from '../src/pages/homepage';
import AllServices from '../src/pages/AllServices';
import PrintingHero from './pages/printingPage.tsx';
import SocialMediaHero from './pages/socialpage.tsx';
import GraphicDesignHero from './pages/graphics.tsx';
import BrandingHero from './pages/branding.tsx';
import WebsiteHero from './pages/website.tsx';
import VideoEditingHero from './pages/videography.tsx';
import ScrollToTop from './ScrollToTop';
import TagRedirectPage from './pages/tagRedirectPage.tsx';
import Navbar from './component/Navbar';
import OurWorkPage from './pages/works.tsx';
import AboutUs from './pages/aboutus.tsx';
import RegisterForm from './pages/register.tsx';
import LoginPage from './pages/login.tsx';
import Dashboard from './pages/dashboard.tsx';
import ForgotPassword from './pages/forgotPassword.tsx';
import ResetPassword from './pages/resetPassword.tsx';
import AllProductsPage  from "./pages/productPage.tsx";
import EditProfilePage from "./pages/EditProfilePage.tsx";

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        // Hide navbar on /u/:slug route
        setShowNavbar(!location.pathname.startsWith('/u/'));
    }, [location.pathname]);

    return (
        <>
            {showNavbar && <Navbar />}
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/nfc-card" element={<LandingPage />} />
                <Route path="/setup" element={<SetupPage />} />
                <Route path="/u/:slug" element={<ProfilePage />} />
                <Route path="/all-services" element={<AllServices />} />
                <Route path="/printing" element={<PrintingHero />} />
                <Route path="/social-media-design" element={<SocialMediaHero />} />
                <Route path="/graphic-design" element={<GraphicDesignHero />} />
                <Route path="/branding" element={<BrandingHero />} />
                <Route path="/website-design" element={<WebsiteHero />} />
                <Route path="/video-editing" element={<VideoEditingHero />} />
                <Route path="/tag/:uid" element={<TagRedirectPage />} />
                <Route path="/ourwork" element={<OurWorkPage />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products" element={<AllProductsPage/>}/>
                <Route path="/edit-profile" element={<EditProfilePage/>}/>
            </Routes>
        </>
    );
}

export default App;
