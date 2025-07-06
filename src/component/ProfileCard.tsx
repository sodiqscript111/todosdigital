import {
    GlobeAltIcon,
    CodeBracketIcon,
    UserIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTiktok,
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
    return (
        <section className="w-screen h-screen bg-black text-white flex flex-col font-sans">
            {/* Profile Image (Top 50%) */}
            <div className="w-full h-1/2">
                <img
                    src={user.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-b-2xl"
                />
            </div>

            {/* Info Section (Bottom 50%) */}
            <div className="flex-1 px-6 pt-4 pb-6 flex flex-col gap-3 overflow-y-auto">
                {/* Full Name with sharp font */}
                <h1
                    className="text-3xl md:text-4xl font-bold tracking-wide"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    {user.full_name}
                </h1>

                {/* Headline at Company */}
                <p className="text-[27px] text-gray-200 italic">
                    {user.headline}
                    {user.company && (
                        <span className="not-italic text-gray-400"> at {user.company}</span>
                    )}
                </p>

                {/* Save Contact Button */}
                <a
                    href={`${API_BASE_URL}/api/users/${user.slug}/vcard.vcf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-max bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                    📁 Save Contact
                </a>

                {/* Social Links */}
                <div className="mt-6">
                    <p className="text-xs text-gray-400 mb-2">CONNECT</p>
                    <ul className="space-y-2">
                        {user.profile_links?.linkedin && (
                            <li>
                                <a
                                    href={user.profile_links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <UserIcon className="h-5 w-5" /> <span>LinkedIn</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.github && (
                            <li>
                                <a
                                    href={user.profile_links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <CodeBracketIcon className="h-5 w-5" /> <span>GitHub</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.twitter && (
                            <li>
                                <a
                                    href={user.profile_links.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <EnvelopeIcon className="h-5 w-5" /> <span>Twitter</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.website && (
                            <li>
                                <a
                                    href={user.profile_links.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <GlobeAltIcon className="h-5 w-5" /> <span>Website</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.facebook && (
                            <li>
                                <a
                                    href={user.profile_links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <FaFacebook className="h-5 w-5" /> <span>Facebook</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.instagram && (
                            <li>
                                <a
                                    href={user.profile_links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <FaInstagram className="h-5 w-5" /> <span>Instagram</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.youtube && (
                            <li>
                                <a
                                    href={user.profile_links.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <FaYoutube className="h-5 w-5" /> <span>YouTube</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.tiktok && (
                            <li>
                                <a
                                    href={user.profile_links.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800"
                                >
                                    <FaTiktok className="h-5 w-5" /> <span>TikTok</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="mt-8 text-center text-gray-500 text-xs">
                    Powered by todosdigitals.
                </div>
            </div>
        </section>
    );
}
