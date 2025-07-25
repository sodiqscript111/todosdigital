import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    // Light: Clean and modern
    light: {
        name: 'light',
        background: 'bg-[#EFEBE5]', // Dune Mist – warm, clean background
        text: 'text-[#2E1F1B]',     // Sable Brown – deep, rich base
    },
    // Dark: Pure black and white
    dark: {
        name: 'dark',
        background: 'bg-black',
        text: 'text-white',
    },
    // Ocean: Purple palette (Creative / Bold / Futuristic)
    ocean: {
        name: 'ocean',
        background: 'bg-[#3D096C]', // Midnight Grape – bold base
        text: 'text-[#E1AAFF]',     // Lavender Cloud – tint
    },
    // Forest: Earthy palette (Natural / Calm / Organic)
    forest: {
        name: 'forest',
        background: 'bg-[#2E1F1B]', // Sable Brown – deep base
        text: 'text-[#EFEBE5]',     // Dune Mist – warm clean
    },
    // Peach: Soft & readable
    peach: {
        name: 'peach',
        background: 'bg-[#FFF1E6]', // pastel peach
        text: 'text-[#4B3832]',     // warm brown-black
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
