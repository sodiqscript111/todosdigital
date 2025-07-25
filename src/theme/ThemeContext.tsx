import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
    buttonBackground: string; // Added for button and fallback header
}

export const themes: Record<string, ThemeType> = {
    // Light: Clean and modern
    light: {
        name: 'light',
        background: 'bg-[#EFEBE5]', // Dune Mist – warm, clean background
        text: 'text-[#2E1F1B]',     // Sable Brown – deep, rich base
        buttonBackground: 'bg-[#3b5998]', // Deep blue for contrast
    },
    // Dark: Pure black and white
    dark: {
        name: 'dark',
        background: 'bg-black',
        text: 'text-white',
        buttonBackground: 'bg-[#4c70ba]', // Lighter blue for visibility on black
    },
    // Ocean: Purple palette (Creative / Bold / Futuristic)
    ocean: {
        name: 'ocean',
        background: 'bg-[#3D096C]', // Midnight Grape – bold base
        text: 'text-[#E1AAFF]',     // Lavender Cloud – tint
        buttonBackground: 'bg-[#6A2C9B]', // Slightly lighter purple for harmony
    },
    // Forest: Earthy palette (Natural / Calm / Organic)
    forest: {
        name: 'forest',
        background: 'bg-[#2E1F1B]', // Sable Brown – deep base
        text: 'text-[#EFEBE5]',     // Dune Mist – warm clean
        buttonBackground: 'bg-[#4A3728]', // Darker brown for earthy feel
    },
    // Peach: Soft & readable
    peach: {
        name: 'peach',
        background: 'bg-[#FFF1E6]', // Pastel Peach
        text: 'text-[#4B3832]',     // Warm brown-black
        buttonBackground: 'bg-[#7A5A4F]', // Muted peach-brown for contrast
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
