import { useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import { ThemeContext, themes } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(themes.dark);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themes[savedTheme]) {
            setTheme(themes[savedTheme]);
        }
    }, []);

    const setThemeByName = async (name: string) => {
        if (themes[name]) {
            setTheme(themes[name]);
            localStorage.setItem('theme', name);

            try {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    await axios.patch(
                        'https://tododigitals.azurewebsites.net/api/profile/theme',
                        { theme: name },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            } catch (err) {
                console.error('Failed to update theme:', err);
            }
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemeByName }}>
            {children}
        </ThemeContext.Provider>
    );
};
