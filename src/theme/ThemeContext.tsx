import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    // Light: Neutral and modern (Apple/Notion-style)
    light: {
        name: 'light',
        background: 'bg-[#F4F4F5]', // soft gray-white
        text: 'text-[#1A1A1A]',     // near-black
    },
    // Dark: Clean and elegant
    dark: {
        name: 'dark',
        background: 'bg-[#0D1117]', // GitHub dark mode vibe
        text: 'text-[#E6EDF3]',     // soft light blue-gray
    },
    // Ocean: Vibrant yet professional
    ocean: {
        name: 'ocean',
        background: 'bg-[#0E7490]', // Tailwind cyan-700
        text: 'text-white',
    },
    // Forest: Subdued and premium green
    forest: {
        name: 'forest',
        background: 'bg-[#1B4332]', // dark forest green
        text: 'text-[#D8F3DC]',     // minty soft green
    },
    // Peach: Stylish and soft (but readable)
    peach: {
        name: 'peach',
        background: 'bg-[#FFF1E6]', // pastel peach
        text: 'text-[#4B3832]',     // warm brownish black
    },
};


export interface ThemeContextType {
    theme: ThemeType;
    setThemeByName: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: themes.dark,
    setThemeByName: () => {},
});
