import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
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
        // userId is not used, so we won't declare it to avoid lint error

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get<UserProfile>(
                `https://tododigitals.azurewebsites.net/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProfile(res.data);
            if (res.data.theme && themes[res.data.theme]) {
                setThemeByName(res.data.theme); // Sync with backend theme
            }
            setError(null);
        } catch (error) {
            setProfile(null);
            setError('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only run on mount, no need to depend on navigate or setThemeByName

    const handleThemeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;

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
            await fetchProfile();
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            console.error(
                'Failed to update theme:',
                axiosError.response?.data || axiosError.message
            );
            setError(
                `Failed to save theme: ${
                    axiosError.response?.data?.message || axiosError.message
                }`
            );

            // Revert theme if possible
            if (profile?.theme && themes[profile.theme]) {
                setThemeByName(profile.theme);
            }
        }
    };

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center bg-black text-white`}
            >
                <p className="text-xl font-medium">Loading your dashboard...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center p-8 bg-black text-white`}
            >
                <div className="text-center space-y-6">
                    <h1 className="text-3xl font-bold text-[#FFF1D5]">No profile found</h1>
                    <p className="text-lg text-[#B6B09F]">
                        You haven't set up your digital business card yet.
                    </p>
                    <button
                        onClick={() => navigate('/setup')}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#E7EFC7] transition"
                    >
                        Create Profile
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center p-8 bg-black text-white`}
            >
                <div className="text-center space-y-6">
                    <h1 className="text-3xl font-bold text-red-600">Error</h1>
                    <p className="text-lg text-[#FFF1D5]">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#E7EFC7] transition"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const socialMediaLinks = Object.entries(profile.profile_links || {}).filter(
        ([, value]) => value
    );

    return (
        <div
            className={`min-h-screen p-8 bg-black text-white transition-colors duration-300`}
        >
            <div className="max-w-3xl mx-auto bg-[#FFF1D5] p-8 rounded-2xl border border-[#B6B09F] shadow-xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0B1D51]">Your Profile</h1>
                    <button
                        onClick={() => navigate(`/edit-profile`)}
                        className="bg-[#FFF1D5] text-[#0B1D51] px-5 py-2 rounded-lg text-base font-semibold shadow-md hover:bg-[#E7EFC7] transition"
                    >
                        Edit
                    </button>
                </div>

                <div className="mb-8">
                    <label
                        htmlFor="theme-select"
                        className="block text-lg mb-2 font-semibold text-[#0B1D51]"
                    >
                        Select Theme:
                    </label>
                    <select
                        id="theme-select"
                        className="w-full bg-[#E7EFC7] border border-[#B6B09F] rounded-lg px-4 py-2 text-[#0B1D51] focus:ring-[#0B1D51] focus:border-[#0B1D51] shadow-md"
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

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <img
                        src={profile.image_url}
                        alt={`${profile.full_name}'s profile picture`}
                        className="w-56 h-56 rounded-xl object-cover border-2 border-[#B6B09F] shadow-md"
                    />

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[#0B1D51] mb-3">
                            {profile.full_name}
                        </h2>
                        <p className="text-lg text-[#B6B09F] mb-2">{profile.headline}</p>
                        <p className="text-base text-[#0B1D51] mb-1">{profile.company}</p>
                        <p className="text-base text-[#B6B09F]">{profile.email}</p>

                        <div className="mt-6 space-y-2">
                            <h3 className="text-lg font-medium text-[#0B1D51]">Social Links:</h3>
                            {socialMediaLinks.length > 0 ? (
                                <ul className="space-y-2 list-disc list-inside text-base">
                                    {socialMediaLinks.map(([key, value]) => (
                                        <li key={key}>
                                            <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#0B1D51] hover:text-[#E7EFC7] transition"
                                            >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-base text-[#B6B09F]">No links provided.</p>
                            )}
                        </div>

                        <div className="mt-8">
                            <a
                                href={`https://www.todosdigitals.com/u/${profile.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#FFF1D5] text-[#0B1D51] px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-[#E7EFC7] transition"
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
