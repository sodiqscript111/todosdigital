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
        return urlRegex.test(url) ? url : `https://${url}`;
    };

    return (
        <section
            className={`max-w-md mx-auto ${theme.background} ${theme.text} rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px]`}
        >
            {/* Profile Image */}
            <div className="w-full h-1/2">
                <img
                    src={user.image_url}
                    alt={`${user.full_name}'s profile picture`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info Section */}
            <div className="p-6 flex flex-col justify-between flex-1">
                {/* Name and Headline */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-wide text-[#0B1D51]">
                        {user.full_name}
                    </h1>
                    <p className="text-lg text-[#B6B09F] italic">
                        {user.headline}
                        {user.company && (
                            <span className="not-italic text-[#B6B09F]"> at {user.company}</span>
                        )}
                    </p>
                    <p className="text-sm text-[#B6B09F]">{user.email}</p>
                </div>

                {/* Save Contact */}
                <a
                    href={`${API_BASE_URL}/api/users/${user.slug}/vcard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block w-full bg-[#FFF1D5] text-[#0B1D51] font-semibold py-2 px-4 rounded-md text-center hover:bg-[#E7EFC7] transition"
                    aria-label={`Download vCard for ${user.full_name}`}
                >
                    📁 Save Contact
                </a>

                {/* Social Links */}
                <div className="mt-6">
                    <p className="text-xs text-[#B6B09F] mb-2 uppercase">Connect</p>
                    <ul className="space-y-2">
                        {links
                            .filter((link) => validUrl(link.url))
                            .map(({ label, icon, url }) => (
                                <li key={label}>
                                    <a
                                        href={validUrl(url)!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-2 rounded-md bg-[#E7EFC7] text-[#0B1D51] hover:bg-[#FFF1D5] transition-all duration-200"
                                    >
                                        {icon}
                                        <span className="text-sm font-medium">{label}</span>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-[#B6B09F]">
                    Powered by Todos Digitals
                </div>
            </div>
        </section>
    );
}
