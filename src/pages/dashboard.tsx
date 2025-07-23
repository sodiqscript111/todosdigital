import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from "../theme/ThemeContext.tsx"

interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
}

interface UserProfile {
    id: number;
    full_name: string;
    headline: string;
    company: string;
    email: string;
    image_url: string;
    slug: string;
    theme: string; // Added theme
    profile_links: SocialLinks;
}

export default function Dashboard() {
    const { theme: currentTheme, setThemeByName } = useContext(ThemeContext);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userId = localStorage.getItem('user_id');

        if (!token || !userId) {
            navigate('/login');
            return;
        }

        axios
            .get(`https://tododigitals.azurewebsites.net/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setProfile(res.data);
                if (res.data.theme) {
                    setThemeByName(res.data.theme); // Sync with backend theme
                }
            })
            .catch(() => {
                setProfile(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate, setThemeByName]);

    const handleThemeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        setThemeByName(newTheme);

        try {
            const token = localStorage.getItem('auth_token');
            await axios.patch(
                'https://tododigitals.azurewebsites.net/api/profile/theme',
                { theme: newTheme },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error('Failed to update theme:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">No profile found</h1>
                    <p className="text-gray-400">You haven't set up your digital business card yet.</p>
                    <button
                        onClick={() => navigate('/setup')}
                        className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    const socialMediaLinks = Object.entries(profile.profile_links || {}).filter(([_, value]) => value);

    return (
        <div className={`min-h-screen p-6 ${currentTheme.background} ${currentTheme.text} transition-colors duration-300`}>
            <div className="max-w-3xl mx-auto bg-neutral-900 p-6 rounded-2xl border border-neutral-700 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Your Profile</h1>
                    <button
                        onClick={() => navigate(`/edit-profile`)}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
                    >
                        Edit
                    </button>
                </div>

                <div className="mb-6">
                    <label htmlFor="theme-select" className="block text-sm mb-1 font-semibold">
                        Select Theme:
                    </label>
                    <select
                        id="theme-select"
                        className="bg-neutral-800 border border-neutral-600 rounded-md px-3 py-2"
                        value={currentTheme.name}
                        onChange={handleThemeChange}
                    >
                        {['light', 'dark', 'ocean', 'forest', 'peach'].map((key) => (
                            <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                        src={profile.image_url}
                        alt={`${profile.full_name}'s profile picture`}
                        className="w-40 h-40 rounded-xl object-cover border border-neutral-700"
                    />

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">{profile.full_name}</h2>
                        <p className="text-gray-400">{profile.headline}</p>
                        <p className="text-sm mt-2">{profile.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{profile.email}</p>

                        <div className="mt-4 space-y-1">
                            <h3 className="text-base font-medium">Social Links:</h3>
                            {socialMediaLinks.length > 0 ? (
                                <ul className="space-y-1 list-disc list-inside text-sm">
                                    {socialMediaLinks.map(([key, value]) => (
                                        <li key={key}>
                                            <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 underline"
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No links provided.</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <a
                                href={`https://www.todosdigitals.com/u/${profile.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
                            >
                                View Public Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
