import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('profile_links.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                profile_links: {
                    ...prev.profile_links,
                    [key]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
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
                setError('Please select a profile image.');
                setLoading(false);
                return;
            }

            // Upload image to Cloudinary
            const uploadData = new FormData();
            uploadData.append('file', imageFile);
            uploadData.append('upload_preset', 'nfc_upload_preset');
            uploadData.append('cloud_name', 'de2m62wji');

            const cloudRes = await axios.post('https://api.cloudinary.com/v1_1/de2m62wji/image/upload', uploadData);
            const imageUrl = cloudRes.data.secure_url;

            const token = localStorage.getItem('auth_token');

            // Submit profile data to backend
            const response = await axios.post(
                'https://tododigitals.azurewebsites.net/setup',
                {
                    ...formData,
                    image_url: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const profileLink = response.data.profile_link;
            const slug = profileLink.split('/').pop();
            if (slug) {
                navigate(`/u/${slug}`);
            } else {
                setError('Invalid profile link');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Create Profile</h1>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <SimpleInput name="full_name" label="Full Name *" value={formData.full_name} onChange={handleChange} />
                    <SimpleInput name="headline" label="Headline *" value={formData.headline} onChange={handleChange} />
                    <SimpleInput name="company" label="Company *" value={formData.company} onChange={handleChange} />
                    <SimpleInput name="email" label="Email *" type="email" value={formData.email} onChange={handleChange} />

                    <div>
                        <label htmlFor="image" className="block text-sm text-gray-400 mb-1">Profile Image *</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700"
                            required
                        />
                    </div>

                    {Object.keys(formData.profile_links).map((key) => (
                        <SimpleInput
                            key={key}
                            name={`profile_links.${key}`}
                            label={`${key.charAt(0).toUpperCase() + key.slice(1)} URL`}
                            value={formData.profile_links[key as keyof typeof formData.profile_links]}
                            onChange={handleChange}
                        />
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function SimpleInput({
                         name,
                         label,
                         value,
                         onChange,
                         type = 'text',
                     }: {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-neutral-900 rounded-md text-white border border-neutral-700"
            />
        </div>
    );
}
