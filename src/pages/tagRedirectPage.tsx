// src/pages/TagRedirectPage.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TagRedirectPage() {
    const { uid } = useParams<{ uid?: string }>();
    const navigate = useNavigate();
    const API_BASE_URL = 'https://tododigitals.azurewebsites.net';

    useEffect(() => {
        if (uid) {
            axios.get(`${API_BASE_URL}/tag/${uid}`, { maxRedirects: 0 })
                .then((response) => {
                    // This block might not be reached due to the 302 redirect
                    console.log('Unexpected response:', response);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 302) {
                        const redirectUrl = error.response.headers.location;
                        if (redirectUrl) {
                            const path = new URL(redirectUrl, API_BASE_URL).pathname;
                            navigate(path);
                        } else {
                            navigate('/'); // Fallback to homepage
                        }
                    } else {
                        console.error('Error handling tag redirect:', error);
                        navigate('/'); // Fallback to homepage on error
                    }
                });
        } else {
            navigate('/'); // Fallback if no uid is provided
        }
    }, [uid, navigate]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white">Loading...</p>
        </div>
    );
}
