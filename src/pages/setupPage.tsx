import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SocialLinksInput {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
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
            facebook: '',
            instagram: '',
            youtube: '',
            tiktok: '',
        },
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [profileLink, setProfileLink] = useState<string | null>(null);

    const API_BASE_URL = 'https://www.todosdigitals.com';

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

            setProfileLink(response.data.profile_link);
            const slug = response.data.profile_link.split('/').pop();
            if (slug) {
                navigate(`/u/${slug}`);
            } else {
                throw new Error('Invalid profile link received');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred while creating profile.');
            }
        } finally {
            setLoading(false);
        }
    };

    const socialMediaKeys: (keyof SocialLinksInput)[] = [
        'linkedin', 'github', 'twitter', 'website',
        'facebook', 'instagram', 'youtube', 'tiktok'
    ];

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Profile</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {profileLink && (
                    <p className="text-green-500 text-center mb-4">
                        Profile created! Your card will be printed with: <a href={profileLink} className="underline">{profileLink}</a>
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <InputField label="Full Name *" name="full_name" value={formData.full_name} onChange={handleChange} />
                    <InputField label="Headline *" name="headline" value={formData.headline} onChange={handleChange} />
                    <InputField label="Company *" name="company" value={formData.company} onChange={handleChange} />
                    <InputField label="Email *" name="email" value={formData.email} onChange={handleChange} type="email" />

                    <div>
                        <label htmlFor="image_file" className="block text-sm text-gray-400">
                            Profile Image *
                        </label>
                        <input
                            type="file"
                            id="image_file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
                        />
                    </div>

                    {socialMediaKeys.map((key) => (
                        <InputField
                            key={key}
                            label={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                            name={`profile_links.${key}`}
                            value={formData.profile_links?.[key] || ''}
                            onChange={handleChange}
                            type="url"
                        />
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

type InputFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

function InputField({ label, name, value, onChange, type = 'text' }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm text-gray-400">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700 focus:outline-none focus:border-white"
            />
        </div>
    );
}
