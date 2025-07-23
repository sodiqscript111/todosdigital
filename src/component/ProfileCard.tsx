import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import {
    GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaTwitter,
    FaLinkedin,
    FaGithub,
} from 'react-icons/fa';

interface SocialLinks {
    linkedin?: string | null;
    github?: string | null;
    twitter?: string | null;
    website?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
}

interface User {
    full_name: string;
    headline: string;
    company: string;
    email: string;
    image_url: string;
    slug: string;
    profile_links?: SocialLinks;
}

interface ProfileCardProps {
    user: User;
}

const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

export default function ProfileCard({ user }: ProfileCardProps) {
    const { theme } = useContext(ThemeContext);

    const links = [
        { label: 'LinkedIn', icon: <FaLinkedin className="h-5 w-5" />, url: user.profile_links?.linkedin },
        { label: 'GitHub', icon: <FaGithub className="h-5 w-5" />, url: user.profile_links?.github },
        { label: 'Twitter', icon: <FaTwitter className="h-5 w-5" />, url: user.profile_links?.twitter },
        { label: 'Website', icon: <GlobeAltIcon className="h-5 w-5" />, url: user.profile_links?.website },
        { label: 'Facebook', icon: <FaFacebook className="h-5 w-5" />, url: user.profile_links?.facebook },
        { label: 'Instagram', icon: <FaInstagram className="h-5 w-5" />, url: user.profile_links?.instagram },
        { label: 'YouTube', icon: <FaYoutube className="h-5 w-5" />, url: user.profile_links?.youtube },
        { label: 'TikTok', icon: <FaTiktok className="h-5 w-5" />, url: user.profile_links?.tiktok },
    ];

    const validUrl = (url: string | null | undefined): string | null => {
        if (!url) return null;
        const urlRegex = /^(https?:\/\/)/;
        return urlRegex.test(url) ? url : null;
    };

    return (
        <section className={`w-screen h-screen ${theme.background} ${theme.text} flex flex-col font-sans`}>
            {/* Profile Image and Name */}
            <div className="w-full h-1/2 flex flex-col items-center justify-center bg-gray-200">
                <img
                    src={user.image_url}
                    alt={`${user.full_name}'s profile picture`}
                    className="w-40 h-40 object-cover rounded-full border-4 border-[#FFF1D5]"
                />
                <h1
                    className="mt-4 text-3xl md:text-4xl font-bold tracking-wide text-[#0B1D51]"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    {user.full_name}
                </h1>
            </div>

            {/* Info Section */}
            <div className="flex-1 px-6 pt-4 pb-6 flex flex-col gap-4 overflow-y-auto">
                {/* Headline */}
                <p className="text-[27px] text-gray-200 italic">
                    {user.headline}
                    {user.company && (
                        <span className="not-italic text-gray-400"> at {user.company}</span>
                    )}
                </p>

                {/* Save Contact */}
                <a
                    href={`${API_BASE_URL}/api/users/${user.slug}/vcard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-max bg-[#FFF1D5] text-[#0B1D51] font-semibold py-2 px-4 rounded hover:bg-[#E7EFC7] transition"
                    aria-label={`Download vCard for ${user.full_name}`}
                >
                    📁 Save Contact
                </a>

                {/* Social Links Grid */}
                <div className="mt-6">
                    <p className="text-xs text-[#B6B09F] mb-2 uppercase">Connect</p>
                    <ul className="grid grid-cols-3 gap-4">
                        {links
                            .filter((link) => validUrl(link.url))
                            .map(({ label, icon, url }) => (
                                <li key={label}>
                                    <a
                                        href={url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-[#E7EFC7] text-[#0B1D51] hover:bg-[#FFF1D5] transition"
                                    >
                                        {icon}
                                        <span className="text-sm font-medium">{label}</span>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-[#B6B09F]">
                    Powered by Todos Digitals
                </div>
            </div>
        </section>
    );
}
