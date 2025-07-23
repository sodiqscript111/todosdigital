import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    light: { name: 'light', background: 'bg-white', text: 'text-black' },
    dark: { name: 'dark', background: 'bg-black', text: 'text-white' },
    ocean: { name: 'ocean', background: 'bg-blue-900', text: 'text-white' },
    forest: { name: 'forest', background: 'bg-green-900', text: 'text-white' },
    peach: { name: 'peach', background: 'bg-orange-100', text: 'text-orange-900' },
};

export interface ThemeContextType {
    theme: ThemeType;
    setThemeByName: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: themes.dark,
    setThemeByName: () => {},
});
