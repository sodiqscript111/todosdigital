import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://tododigitals.azurewebsites.net';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const token = params.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('Invalid or missing token');
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const res = await axios.post(`${API_URL}/auth/reset-password`, {
                token,
                new_password: newPassword,
            });

            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="bg-black border border-neutral-800 text-white p-6 rounded-xl max-w-md w-full shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

                {message && <p className="bg-green-600 p-3 rounded mb-4 text-center">{message}</p>}
                {error && <p className="bg-red-600 p-3 rounded mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm text-gray-400">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            minLength={6}
                            required
                            className="w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
