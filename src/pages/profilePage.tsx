import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
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
    slug: string;
    profile_links?: SocialLinks;
}

export default function ProfilePage() {
    const { slug } = useParams<{ slug: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { theme } = useContext(ThemeContext);

    // Hardcoded Azure Web App backend URL
    const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get<User>(`${API_BASE_URL}/u/${slug}`);
                setUser(response.data);
                setLoading(false);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
                setError(errorMessage);
                setLoading(false);
            }
        };

        if (slug) {
            fetchUser();
        } else {
            setError('No slug provided');
            setLoading(false);
        }
    }, [slug]);

    if (loading)
        return (
            <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center`}>
                <p className="text-[#0B1D51]">Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center`}>
                <p className="text-red-600">Error: {error}</p>
            </div>
        );

    if (!user)
        return (
            <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center`}>
                <p className="text-[#0B1D51]">User not found</p>
            </div>
        );

    return <ProfileCard user={user} />;
}
