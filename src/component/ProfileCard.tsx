// src/component/ProfileCard.tsx
import {
    GlobeAltIcon,
    CodeBracketIcon,
    UserIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

interface SocialLinks {
    linkedin?: string | null;
    github?: string | null;
    twitter?: string | null;
    website?: string | null;
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

// 💡 Azure backend URL
const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

export default function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white text-center shadow-xl">
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={user.image_url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border border-white"
                    />
                </div>

                {/* Name, Headline, Company */}
                <h1 className="text-xl font-bold">{user.full_name}</h1>
                <p className="text-sm text-gray-300">{user.headline}</p>
                <p className="text-sm text-gray-400 mt-1">{user.company}</p>

                {/* Save Contact Button */}
                <a
                    href={`${API_BASE_URL}/api/users/${user.slug}/vcard`}
                    download
                    className="mt-6 inline-block bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
                >
                    📁 Save Contact
                </a>

                {/* Connect Links */}
                <div className="mt-8 text-left">
                    <p className="text-gray-400 text-xs mb-2">CONNECT</p>
                    <ul className="space-y-2">
                        {user.profile_links?.linkedin && (
                            <li>
                                <a
                                    href={user.profile_links.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white"
                                >
                                    <UserIcon className="h-5 w-5" /> <span className="font-medium">LinkedIn</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.github && (
                            <li>
                                <a
                                    href={user.profile_links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white"
                                >
                                    <CodeBracketIcon className="h-5 w-5" /> <span className="font-medium">GitHub</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.twitter && (
                            <li>
                                <a
                                    href={user.profile_links.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white"
                                >
                                    <EnvelopeIcon className="h-5 w-5" /> <span className="font-medium">Twitter</span>
                                </a>
                            </li>
                        )}
                        {user.profile_links?.website && (
                            <li>
                                <a
                                    href={user.profile_links.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white"
                                >
                                    <GlobeAltIcon className="h-5 w-5" /> <span className="font-medium">Website</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center text-gray-500 text-xs">
                    Powered by todosdigitals.
                </div>
            </div>
        </div>
    );
}
