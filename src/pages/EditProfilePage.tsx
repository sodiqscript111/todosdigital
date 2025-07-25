import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

interface FormData {
    full_name: string;
    headline: string;
    company: string;
    address: string;
    email: string;
    bio: string;
    image_url: string;
    header_image_url: string;
    theme: string;
    profile_links: SocialLinks;
}

export default function EditProfilePage() {
    const navigate = useNavigate();
    const { theme, setThemeByName } = useContext(ThemeContext);

    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        headline: '',
        company: '',
        address: '',
        email: '',
        bio: '',
        image_url: '',
        header_image_url: '',
        theme: '',
        profile_links: {},
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // start loading true

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get('https://tododigitals.azurewebsites.net/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data?.profile;
                if (!data) {
                    setError('Profile data not found.');
                    setLoading(false);
                    return;
                }

                setFormData({
                    full_name: data.full_name || '',
                    headline: data.headline || '',
                    company: data.company || '',
                    image_url: data.image_url || '',
                    header_image_url: data.header_image_url || '',
                    address: data.address || '',
                    email: data.email || '',
                    bio: data.bio || '',
                    theme: data.theme || '',
                    profile_links: {
                        linkedin: data.profile_links?.linkedin || '',
                        github: data.profile_links?.github || '',
                        twitter: data.profile_links?.twitter || '',
                        website: data.profile_links?.website || '',
                        facebook: data.profile_links?.facebook || '',
                        instagram: data.profile_links?.instagram || '',
                        youtube: data.profile_links?.youtube || '',
                        tiktok: data.profile_links?.tiktok || '',
                    },
                });

                if (data.theme && themes[data.theme]) {
                    setThemeByName(data.theme);
                }

            } catch (err) {
                console.error(err);
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, setThemeByName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name in formData.profile_links) {
            setFormData((prev) => ({
                ...prev,
                profile_links: {
                    ...prev.profile_links,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImageUpload = async (file: File, type: 'image_url' | 'header_image_url') => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'your_upload_preset'); // Replace
        uploadData.append('cloud_name', 'your_cloud_name'); // Replace

        const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
            method: 'POST',
            body: uploadData,
        });

        const data = await res.json();
        setFormData((prev) => ({
            ...prev,
            [type]: data.secure_url,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('auth_token');

        try {
            await axios.put('https://tododigitals.azurewebsites.net/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-6 text-lg">Loading profile...</div>;
    }

    return (
        <div className={`min-h-screen ${theme.background} ${theme.text} p-6`}>
            <h1 className="text-3xl font-bold mb-4">Edit Your Profile</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="w-full p-2 rounded border" />

                <input name="headline" placeholder="Headline" value={formData.headline} onChange={handleChange} className="w-full p-2 rounded border" />

                <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="w-full p-2 rounded border" />

                <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 rounded border" />

                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded border" />

                <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleChange} className="w-full p-2 rounded border" />

                <div>
                    <label>Profile Image</label>
                    <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'image_url')} />
                </div>

                <div>
                    <label>Header Image</label>
                    <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'header_image_url')} />
                </div>

                <select name="theme" value={formData.theme} onChange={handleChange} className="w-full p-2 rounded border">
                    <option value="">Select Theme</option>
                    {Object.entries(themes).map(([key, value]) => (
                        <option key={key} value={key}>{value.name}</option>
                    ))}
                </select>

                <h2 className="text-xl font-semibold mt-4">Social Links</h2>
                {Object.keys(formData.profile_links).map((key) => (
                    <input
                        key={key}
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={formData.profile_links[key as keyof SocialLinks] || ''}
                        onChange={handleChange}
                        className="w-full p-2 rounded border mt-1"
                    />
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Saving...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}
