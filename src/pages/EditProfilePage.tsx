import { useEffect, useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, themes } from '../theme/ThemeContext';
import {
    Camera,
    User,
    MapPin,
    Mail,
    Building,
    Link,
    Save,
    Linkedin,
    GitHub,
    Twitter,
    Globe,
    Facebook,
    Instagram,
    Youtube,
    Music,
} from 'lucide-react';

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
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

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

                const data = res.data;
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
                const error = err as AxiosError;
                console.error('Fetch error:', error.response?.data || error.message);
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
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            [type]: previewUrl,
        }));

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'your_upload_preset'); // Replace
        uploadData.append('cloud_name', 'your_cloud_name'); // Replace

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await res.json();
            setFormData((prev) => ({
                ...prev,
                [type]: data.secure_url,
            }));
        } catch (err) {
            const error = err as AxiosError;
            console.error('Image upload error:', error);
            setError('Failed to upload image.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const token = localStorage.getItem('auth_token');
        try {
            await axios.put('https://tododigitals.azurewebsites.net/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            const error = err as AxiosError;
            console.error('Update error:', error.response?.data || error.message);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const socialPlatforms = [
        { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
        { key: 'github', label: 'GitHub', icon: GitHub },
        { key: 'twitter', label: 'Twitter', icon: Twitter },
        { key: 'website', label: 'Website', icon: Globe },
        { key: 'facebook', label: 'Facebook', icon: Facebook },
        { key: 'instagram', label: 'Instagram', icon: Instagram },
        { key: 'youtube', label: 'YouTube', icon: Youtube },
        { key: 'tiktok', label: 'TikTok', icon: Music },
    ];

    if (loading) {
        return <div className="p-6 text-lg">Loading profile...</div>;
    }

    return (
        <div className={`min-h-screen ${theme.background}`}>
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
                    <p className="text-gray-600 mt-1">Update your personal information and social links</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-green-800 font-medium">Profile updated successfully!</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-xs">!</span>
                        </div>
                        <span className="text-red-800 font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Header Image Section */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Camera className="w-5 h-5 mr-2 text-gray-600" />
                            Header Image
                        </h2>
                        <div className="space-y-4">
                            <div className="relative">
                                {formData.header_image_url ? (
                                    <div className="relative group">
                                        <img
                                            src={formData.header_image_url}
                                            alt="Header"
                                            className="w-full h-32 object-cover rounded-lg border-2 border-dashed border-gray-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                        <div className="text-center">
                                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <span className="text-gray-500 text-sm">Upload header image</span>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'header_image_url')}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Image & Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            Basic Information
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Profile Image */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                                <div className="relative">
                                    {formData.image_url ? (
                                        <div className="relative group">
                                            <img
                                                src={formData.image_url}
                                                alt="Profile"
                                                className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 mx-auto"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 mx-auto">
                                            <Camera className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], 'image_url')}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        name="full_name"
                                        placeholder="Enter your full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                                    <input
                                        name="headline"
                                        placeholder="Professional headline"
                                        value={formData.headline}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                            <input
                                                name="company"
                                                placeholder="Company name"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                            <input
                                                name="address"
                                                placeholder="City, Country"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        placeholder="Tell us about yourself..."
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Theme</h2>
                        <select
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="">Select a theme</option>
                            {Object.entries(themes).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Link className="w-5 h-5 mr-2 text-gray-600" />
                            Social Links
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {socialPlatforms.map((platform) => (
                                <div key={platform.key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <platform.icon className="w-4 h-4 mr-2 text-gray-600" />
                                        {platform.label}
                                    </label>
                                    <input
                                        name={platform.key}
                                        placeholder={`Your ${platform.label} URL`}
                                        value={formData.profile_links[platform.key as keyof SocialLinks] || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 flex items-center"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Update Profile
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
