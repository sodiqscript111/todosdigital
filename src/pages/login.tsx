import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://tododigitals.azurewebsites.net';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });

            const { token, user, has_profile } = response.data;

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('user_email', user.email);

            if (has_profile) {
                navigate('/dashboard');
            } else {
                navigate('/setup');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 bg-neutral-900 text-white border border-neutral-700 rounded"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 bg-neutral-900 text-white border border-neutral-700 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
