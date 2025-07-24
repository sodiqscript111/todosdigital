import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { ThemeContext, themes } from '../theme/ThemeContext';
import ProfileCard from '../component/ProfileCard';

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
    theme?: string;
    profile_links?: SocialLinks;
}

export default function ProfilePage() {
    const { slug } = useParams<{ slug: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { theme, setThemeByName } = useContext(ThemeContext);

    const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

    useEffect(() => {
        const fetchUser = async () => {
            if (!slug) {
                setError('No profile slug provided in the URL');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<User>(`${API_BASE_URL}/api/u/${slug}`, {
                    timeout: 30000 // 30-second timeout
                });
                setUser(response.data);
                if (response.data.theme && themes[response.data.theme]) {
                    setThemeByName(response.data.theme);
                }
                setLoading(false);
            } catch (err) {
                const axiosError = err as AxiosError<{ error?: string }>;
                let errorMessage = 'Failed to fetch user data. Please try again.';
                if (axiosError.response) {
                    if (axiosError.response.status === 404) {
                        errorMessage = `Profile not found for slug: ${slug}. Please check the URL or try again later.`;
                    } else {
                        errorMessage = axiosError.response.data?.error || `Server error: ${axiosError.response.status}`;
                    }
                } else if (axiosError.request) {
                    errorMessage = 'No response from server. Please check your network connection.';
                }
                console.error('Profile fetch error:', {
                    message: axiosError.message,
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                    slug,
                });
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchUser().catch((err) => {
            console.error('Unhandled error in fetchUser:', err);
            setError('Unexpected error occurred. Please try again.');
            setLoading(false);
        });
    }, [slug, setThemeByName]);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.text}`}>
                <p className="font-semibold text-[#3b5998]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.text}`}>
                <div className="text-center space-y-4">
                    <p className="text-red-600 font-semibold">{error}</p>
                    <a
                        href="/"
                        className="inline-block bg-[#3b5998] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#4c70ba] transition"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.text}`}>
                <div className="text-center space-y-4">
                    <p className="font-semibold text-red-600">User not found</p>
                    <a
                        href="/"
                        className="inline-block bg-[#3b5998] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#4c70ba] transition"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return <ProfileCard user={user} />;
}
