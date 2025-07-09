import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://tododigitals.azurewebsites.net';

export default function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await axios.post(`${API_URL}/signup`, {
                full_name: fullName,
                email,
                password,
            });

            const { token, user } = response.data;

            if (token && user) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_id', user.id);
                navigate('/setup');
            } else {
                setError('Registration succeeded but token is missing.');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border border-neutral-800 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                {message && <div className="bg-green-600 p-3 rounded mb-4 text-center">{message}</div>}
                {error && <div className="bg-red-600 p-3 rounded mb-4 text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {/* Login link */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white underline hover:text-gray-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
