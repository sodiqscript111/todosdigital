import { useContext } from 'react';
import type { FC } from 'react';
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
    header_image_url: string;
    address: string;
    bio: string;
    slug: string;
    profile_links?: SocialLinks;
}

interface ProfileCardProps {
    user: User;
}

const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
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
        <section className={`max-w-4xl mx-auto h-screen ${theme.background} ${theme.text} flex flex-col font-sans`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
            {/* Header Image (Cover Photo) */}
            <div className="w-full h-1/3 bg-gray-200">
                {user.header_image_url ? (
                    <img
                        src={user.header_image_url}
                        alt={`${user.full_name}'s cover photo`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#3b5998]" />
                )}
            </div>

            {/* Profile Image (Overlaying Header) */}
            <div className="relative -mt-20 px-6">
                <img
                    src={user.image_url}
                    alt={`${user.full_name}'s profile picture`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>

            {/* Info Section */}
            <div className="flex-1 px-6 pt-4 pb-8 flex flex-col gap-6 bg-white">
                {/* Name and Headline */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#3b5998]">
                        {user.full_name}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 italic mt-1">
                        {user.headline}
                        {user.company && (
                            <span className="not-italic text-gray-600"> at {user.company}</span>
                        )}
                    </p>
                </div>

                {/* About Section */}
                {(user.email || user.address || user.bio) && (
                    <div className="border-t border-gray-200 pt-4">
                        <h2 className="text-lg font-semibold text-[#3b5998] mb-2">About</h2>
                        <div className="space-y-2 text-gray-700 text-base">
                            {user.email && (
                                <p>
                                    <span className="font-medium">Email:</span> {user.email}
                                </p>
                            )}
                            {user.address && (
                                <p>
                                    <span className="font-medium">Address:</span> {user.address}
                                </p>
                            )}
                            {user.bio && (
                                <p>
                                    <span className="font-medium">Bio:</span> {user.bio}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Save Contact */}
                <a
                    href={`${API_BASE_URL}/api/u/${user.slug}/vcard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-max bg-[#3b5998] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#4c70ba] transition"
                    aria-label={`Download vCard for ${user.full_name}`}
                >
                    📁 Save Contact
                </a>

                {/* Social Links */}
                <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3 uppercase font-semibold">Connect</p>
                    <ul className="space-y-3">
                        {links
                            .filter((link) => validUrl(link.url))
                            .map(({ label, icon, url }) => (
                                <li key={label}>
                                    <a
                                        href={url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-5 py-2 rounded bg-[#f7f7f7] text-[#3b5998] hover:bg-[#e8ecef] transition"
                                    >
                                        {icon}
                                        <span className="text-base font-medium">{label}</span>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center text-sm text-gray-500">
                    Powered by Todos Digitals
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;
