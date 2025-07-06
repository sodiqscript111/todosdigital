// src/SetupPage.tsx
// 📦 Installation requirements:
// npm install tailwindcss @heroicons/react react-router-dom axios @types/react @types/react-dom @types/react-router-dom

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SocialLinksInput {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    facebook?: string;  // Added
    instagram?: string; // Added
    youtube?: string;   // Added
    tiktok?: string;    // Added
}

interface CreateUserInput {
    full_name: string;
    headline: string;
    company: string;
    email: string;
    image_url: string;
    profile_links?: SocialLinksInput;
}

export default function SetupPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CreateUserInput>({
        full_name: '',
        headline: '',
        company: '',
        email: '',
        image_url: '',
        profile_links: {
            linkedin: '',
            github: '',
            twitter: '',
            website: '',
            facebook: '',   // Added
            instagram: '',  // Added
            youtube: '',    // Added
            tiktok: '',     // Added
        },
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Hardcoded Azure Web App backend URL
    const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('profile_links.')) {
            const key = name.split('.')[1] as keyof SocialLinksInput;
            setFormData((prev) => ({
                ...prev,
                profile_links: {
                    ...prev.profile_links,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!imageFile) {
                setError('Profile image is required');
                setLoading(false);
                return;
            }

            const uploadFormData = new FormData();
            uploadFormData.append('file', imageFile);
            uploadFormData.append('upload_preset', 'nfc_upload_preset');
            uploadFormData.append('cloud_name', 'de2m62wji');

            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/de2m62wji/image/upload',
                uploadFormData
            );

            const imageUrl = uploadResponse.data.secure_url;

            const response = await axios.post<{ message: string; profile_link: string }>(
                `${API_BASE_URL}/setup`,
                { ...formData, image_url: imageUrl }
            );

            const slug = response.data.profile_link.split('/').pop();
            if (slug) {
                navigate(`/u/${slug}`);
            } else {
                throw new Error('Invalid profile link received');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to create profile due to an unknown error.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Define all social media keys including the new ones
    const socialMediaKeys: (keyof SocialLinksInput)[] = [
        'linkedin',
        'github',
        'twitter',
        'website',
        'facebook',   // New
        'instagram',  // New
        'youtube',    // New
        'tiktok',     // New
    ];

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="full_name" className="block text-sm text-gray-400">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="headline" className="block text-sm text-gray-400">
                            Headline *
                        </label>
                        <input
                            type="text"
                            id="headline"
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm text-gray-400">
                            Company *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-400">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="image_file" className="block text-sm text-gray-400">
                            Profile Image *
                        </label>
                        <input
                            type="file"
                            id="image_file"
                            name="image_file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    {/* Loop through all social media keys, including the new ones */}
                    {socialMediaKeys.map((key) => (
                        <div key={key}>
                            <label htmlFor={`profile_links.${key}`} className="block text-sm text-gray-400 capitalize">
                                {key.charAt(0).toUpperCase() + key.slice(1)} URL
                            </label>
                            <input
                                type="url"
                                id={`profile_links.${key}`}
                                name={`profile_links.${key}`}
                                value={formData.profile_links?.[key] || ''}
                                onChange={handleChange}
                                className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}
