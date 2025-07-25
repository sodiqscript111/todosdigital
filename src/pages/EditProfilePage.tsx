import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, themes } from '../theme/ThemeContext';

export default function EditProfilePage() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        full_name: '',
        headline: '',
        company: '',
        image_url: '',
        header_image_url: '',
        address: '',
        email: '',
        bio: '',
        theme: '',
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
    const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // 🔄 Load existing profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('auth_token');
            try {
                const res = await axios.get('https://tododigitals.azurewebsites.net/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data.profile;
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
            } catch (err) {
                setError("Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setHeaderImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const token = localStorage.getItem('auth_token');

            let imageUrl = formData.image_url;
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);
                uploadData.append('upload_preset', 'nfc_upload_preset');
                uploadData.append('cloud_name', 'de2m62wji');

                const res = await axios.post('https://api.cloudinary.com/v1_1/de2m62wji/image/upload', uploadData);
                imageUrl = res.data.secure_url;
            }

            let headerImageUrl = formData.header_image_url;
            if (headerImageFile) {
                const uploadData = new FormData();
                uploadData.append('file', headerImageFile);
                uploadData.append('upload_preset', 'nfc_upload_preset');
                uploadData.append('cloud_name', 'de2m62wji');

                const res = await axios.post('https://api.cloudinary.com/v1_1/de2m62wji/image/upload', uploadData);
                headerImageUrl = res.data.secure_url;
            }

            await axios.put(
                'https://tododigitals.azurewebsites.net/edit/profile',
                {
                    ...formData,
                    image_url: imageUrl,
                    header_image_url: headerImageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate(`/u/${formData.full_name.toLowerCase().replace(/\s+/g, '-')}`);
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center p-4`}>
            <div className="bg-[#FFF1D5] border border-[#B6B09F] rounded-2xl p-6 max-w-md w-full shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#0B1D51]">Edit Profile</h1>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <SimpleInput name="full_name" label="Full Name *" value={formData.full_name} onChange={handleChange} />
                    <SimpleInput name="headline" label="Headline *" value={formData.headline} onChange={handleChange} />
                    <SimpleInput name="company" label="Company *" value={formData.company} onChange={handleChange} />
                    <SimpleInput name="email" label="Email" value={formData.email} onChange={handleChange} type="email" />
                    <SimpleInput name="address" label="Address" value={formData.address} onChange={handleChange} />

                    <div>
                        <label htmlFor="bio" className="block text-sm text-[#0B1D51] mb-1">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#E7EFC7] rounded-md text-[#0B1D51] border border-[#B6B09F] focus:ring-[#0B1D51] focus:border-[#0B1D51]"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label htmlFor="theme" className="block text-sm text-[#0B1D51] mb-1">Theme *</label>
                        <select
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#E7EFC7] rounded-md text-[#0B1D51] border border-[#B6B09F] focus:ring-[#0B1D51] focus:border-[#0B1D51]"
                            required
                        >
                            <option value="" disabled>Select a theme</option>
                            {Object.keys(themes).map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm text-[#0B1D51] mb-1">Profile Image *</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 bg-[#E7EFC7] rounded-md text-[#0B1D51] border border-[#B6B09F] file:bg-[#FFF1D5] file:border-0 file:rounded-md file:text-[#0B1D51] file:cursor-pointer"
                        />
                        {formData.image_url && (
                            <img src={formData.image_url} alt="Current" className="mt-2 rounded-md w-full h-32 object-cover" />
                        )}
                    </div>

                    <div>
                        <label htmlFor="header_image" className="block text-sm text-[#0B1D51] mb-1">Header Image</label>
                        <input
                            id="header_image"
                            type="file"
                            accept="image/*"
                            onChange={handleHeaderImageChange}
                            className="w-full p-2 bg-[#E7EFC7] rounded-md text-[#0B1D51] border border-[#B6B09F] file:bg-[#FFF1D5] file:border-0 file:rounded-md file:text-[#0B1D51] file:cursor-pointer"
                        />
                        {formData.header_image_url && (
                            <img src={formData.header_image_url} alt="Header" className="mt-2 rounded-md w-full h-32 object-cover" />
                        )}
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
                        className="w-full bg-[#FFF1D5] text-[#0B1D51] font-semibold py-2 px-4 rounded-md hover:bg-[#E7EFC7] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Update Profile'}
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
            <label htmlFor={name} className="block text-sm text-[#0B1D51] mb-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 bg-[#E7EFC7] rounded-md text-[#0B1D51] border border-[#B6B09F] focus:ring-[#0B1D51] focus:border-[#0B1D51]"
            />
        </div>
    );
}
