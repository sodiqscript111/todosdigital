// src/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../component/ProfileCard.tsx';

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

export default function ProfilePage() {
    const { slug } = useParams<{ slug: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Error: {error}
            </div>
        );

    if (!user)
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                User not found
            </div>
        );

    return <ProfileCard user={user} />;
}
