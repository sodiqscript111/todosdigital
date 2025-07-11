import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://tododigitals.azurewebsites.net';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
            setMessage(res.data.message);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="bg-black border border-neutral-800 text-white p-6 rounded-xl max-w-md w-full shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

                {message && <p className="bg-green-600 p-3 rounded mb-4 text-center">{message}</p>}
                {error && <p className="bg-red-600 p-3 rounded mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 rounded bg-neutral-900 border border-neutral-700 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
