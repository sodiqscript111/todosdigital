import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTiktok,
} from 'react-icons/fa';
import {
    GlobeAltIcon,
    CodeBracketIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';

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

interface Props {
    name: string;
    headline: string;
    about: string;
    email: string;
    username: string;
    socialLinks: SocialLinks;
}

const ProfileDetails = ({
                            name,
                            headline,
                            about,
                            email,
                            username,
                            socialLinks,
                        }: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className={`text-3xl md:text-4xl font-bold ${theme.text}`}>
                    {name}
                </h1>
                <p className={`text-xl md:text-2xl italic mt-1 ${theme.text}`}>
                    {headline}
                </p>
            </div>

            <div>
                <h2 className={`text-lg font-semibold mb-2 ${theme.text}`}>About</h2>
                <div className={`space-y-2 text-base ${theme.text}`}>
                    <p>{about}</p>
                    <a
                        href={`mailto:${email}`}
                        className={`block underline hover:opacity-80 transition ${theme.text}`}
                    >
                        {email}
                    </a>
                    <a
                        href={`https://tododigitals.com/${username}`}
                        className={`block underline hover:opacity-80 transition ${theme.text}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        tododigitals.com/{username}
                    </a>
                </div>
            </div>

            <div>
                <a
                    href={`https://tododigitals.com/${username}`}
                    className={`inline-block w-max ${theme.background} ${theme.text} font-semibold py-2 px-6 rounded-md hover:opacity-80 transition`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Save Contact
                </a>
            </div>

            <div>
                <p className={`text-sm mb-3 uppercase font-semibold ${theme.text}`}>
                    Connect
                </p>
                <div className="flex flex-col gap-3">
                    {socialLinks.linkedin && (
                        <a
                            href={socialLinks.linkedin}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <UserIcon className="h-5 w-5" />
                            <span>LinkedIn</span>
                        </a>
                    )}
                    {socialLinks.github && (
                        <a
                            href={socialLinks.github}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <CodeBracketIcon className="h-5 w-5" />
                            <span>GitHub</span>
                        </a>
                    )}
                    {socialLinks.twitter && (
                        <a
                            href={socialLinks.twitter}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>Twitter</span>
                        </a>
                    )}
                    {socialLinks.website && (
                        <a
                            href={socialLinks.website}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GlobeAltIcon className="h-5 w-5" />
                            <span>Website</span>
                        </a>
                    )}
                    {socialLinks.facebook && (
                        <a
                            href={socialLinks.facebook}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaFacebook className="h-5 w-5" />
                            <span>Facebook</span>
                        </a>
                    )}
                    {socialLinks.instagram && (
                        <a
                            href={socialLinks.instagram}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaInstagram className="h-5 w-5" />
                            <span>Instagram</span>
                        </a>
                    )}
                    {socialLinks.youtube && (
                        <a
                            href={socialLinks.youtube}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaYoutube className="h-5 w-5" />
                            <span>YouTube</span>
                        </a>
                    )}
                    {socialLinks.tiktok && (
                        <a
                            href={socialLinks.tiktok}
                            className={`flex items-center gap-3 px-5 py-2 rounded ${theme.background} ${theme.text} hover:opacity-80 transition`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaTiktok className="h-5 w-5" />
                            <span>TikTok</span>
                        </a>
                    )}
                </div>
            </div>

            <div className={`mt-10 text-center text-sm ${theme.text}`}>
                &copy; {new Date().getFullYear()} The Flourishing Treats Company
            </div>
        </div>
    );
};

export default ProfileDetails;
