import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext, themes } from '../theme/ThemeContext';

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
    theme: string;
    profile_links: SocialLinks;
}

export default function Dashboard() {
    const { theme: currentTheme, setThemeByName } = useContext(ThemeContext);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const token = localStorage.getItem('auth_token');
        const userId = localStorage.getItem('user_id');

        if (!token || !userId) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`https://tododigitals.azurewebsites.net/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(res.data);
            if (res.data.theme && themes[res.data.theme]) {
                setThemeByName(res.data.theme); // Sync with backend theme
            }
        } catch (err) {
            setProfile(null);
            setError('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [navigate, setThemeByName]);

    const handleThemeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;

        // Validate theme
        if (!themes[newTheme]) {
            setError('Invalid theme selected');
            return;
        }

        setThemeByName(newTheme); // Update UI immediately

        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setError('Authentication token missing. Please log in again.');
                navigate('/login');
                return;
            }

            await axios.patch(
                'https://tododigitals.azurewebsites.net/api/profile/theme',
                { theme: newTheme },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setError(null);
            // Refetch profile to ensure UI reflects backend state
            await fetchProfile();
        } catch (err: any) {
            console.error('Failed to update theme:', err.response?.data || err.message);
            setError(`Failed to save theme: ${err.response?.data?.message || err.message}`);
            // Revert to previous theme if available
            if (profile?.theme && themes[profile.theme]) {
                setThemeByName(profile.theme);
            }
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${currentTheme.background} ${currentTheme.text}`}>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 ${currentTheme.background} ${currentTheme.text}`}>
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-[#0B1D51]">No profile found</h1>
                    <p className="text-[#B6B09F]">You haven't set up your digital business card yet.</p>
                    <button
                        onClick={() => navigate('/setup')}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-6 py-2 rounded-md font-semibold hover:bg-[#E7EFC7] transition"
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 ${currentTheme.background} ${currentTheme.text}`}>
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-red-600">Error</h1>
                    <p className="text-[#0B1D51]">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-6 py-2 rounded-md font-semibold hover:bg-[#E7EFC7] transition"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const socialMediaLinks = Object.entries(profile.profile_links || {}).filter(([_, value]) => value);

    return (
        <div className={`min-h-screen p-6 ${currentTheme.background} ${currentTheme.text} transition-colors duration-300`}>
            <div className="max-w-3xl mx-auto bg-[#FFF1D5] p-6 rounded-2xl border border-[#B6B09F] shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-[#0B1D51]">Your Profile</h1>
                    <button
                        onClick={() => navigate(`/edit-profile`)}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#E7EFC7] transition"
                    >
                        Edit
                    </button>
                </div>

                <div className="mb-6">
                    <label htmlFor="theme-select" className="block text-sm mb-1 font-semibold text-[#0B1D51]">
                        Select Theme:
                    </label>
                    <select
                        id="theme-select"
                        className="bg-[#E7EFC7] border border-[#B6B09F] rounded-md px-3 py-2 text-[#0B1D51] focus:ring-[#0B1D51] focus:border-[#0B1D51]"
                        value={currentTheme.name}
                        onChange={handleThemeChange}
                    >
                        {Object.keys(themes).map((key) => (
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
                        className="w-40 h-40 rounded-xl object-cover border border-[#B6B09F]"
                    />

                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-[#0B1D51]">{profile.full_name}</h2>
                        <p className="text-[#B6B09F]">{profile.headline}</p>
                        <p className="text-sm mt-2 text-[#0B1D51]">{profile.company}</p>
                        <p className="text-sm text-[#B6B09F] mt-1">{profile.email}</p>

                        <div className="mt-4 space-y-1">
                            <h3 className="text-base font-medium text-[#0B1D51]">Social Links:</h3>
                            {socialMediaLinks.length > 0 ? (
                                <ul className="space-y-1 list-disc list-inside text-sm">
                                    {socialMediaLinks.map(([key, value]) => (
                                        <li key={key}>
                                            <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#0B1D51] hover:underline"
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#B6B09F]">No links provided.</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <a
                                href={`https://www.todosdigitals.com/u/${profile.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#FFF1D5] text-[#0B1D51] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#E7EFC7] transition"
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
