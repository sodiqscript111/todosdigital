// src/SetupPage.tsx
// 📦 Installation requirements:
// npm install tailwindcss @heroicons/react react-router-dom axios @types/react @types/react-dom @types/react-router-dom

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the type for profile_links
interface SocialLinksInput {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
}

// Define the type for the form data
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
        },
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('profile_links.')) {
            const key = name.split('.')[1] as keyof SocialLinksInput;
            setFormData({
                ...formData,
                profile_links: {
                    ...formData.profile_links,
                    [key]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
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

            // Upload image to Cloudinary
            const formDataUpload = new FormData();
            formDataUpload.append('file', imageFile);
            formDataUpload.append('upload_preset', 'nfc_upload_preset'); // Replace with your unsigned upload preset name
            formDataUpload.append('cloud_name', 'de2m62wji'); // Your Cloudinary cloud name

            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/de2m62wji/image/upload',
                formDataUpload
            );
            const imageUrl = uploadResponse.data.secure_url;

            // Submit form data to backend
            const response = await axios.post<{ message: string; profile_link: string }>(
                'http://localhost:8080/setup',
                { ...formData, image_url: imageUrl }
            );
            const slug = response.data.profile_link.split('/').pop();
            navigate(`/u/${slug}`);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="full_name" className="block text-sm text-gray-400">Full Name *</label>
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
                        <label htmlFor="headline" className="block text-sm text-gray-400">Headline *</label>
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
                        <label htmlFor="company" className="block text-sm text-gray-400">Company *</label>
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
                        <label htmlFor="email" className="block text-sm text-gray-400">Email *</label>
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
                        <label htmlFor="image_file" className="block text-sm text-gray-400">Profile Image *</label>
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
                    <div>
                        <label htmlFor="profile_links.linkedin" className="block text-sm text-gray-400">LinkedIn URL</label>
                        <input
                            type="url"
                            id="profile_links.linkedin"
                            name="profile_links.linkedin"
                            value={formData.profile_links?.linkedin}
                            onChange={handleChange}
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile_links.github" className="block text-sm text-gray-400">GitHub URL</label>
                        <input
                            type="url"
                            id="profile_links.github"
                            name="profile_links.github"
                            value={formData.profile_links?.github}
                            onChange={handleChange}
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile_links.twitter" className="block text-sm text-gray-400">Twitter URL</label>
                        <input
                            type="url"
                            id="profile_links.twitter"
                            name="profile_links.twitter"
                            value={formData.profile_links?.twitter}
                            onChange={handleChange}
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="profile_links.website" className="block text-sm text-gray-400">Website URL</label>
                        <input
                            type="url"
                            id="profile_links.website"
                            name="profile_links.website"
                            value={formData.profile_links?.website}
                            onChange={handleChange}
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>
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
