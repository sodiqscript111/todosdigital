import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    light: {
        name: 'light',
        background: 'bg-[#F4F4F5]',
        text: 'text-[#1A1A1A]',
    },
    dark: {
        name: 'dark',
        background: 'bg-[#0D1117]',
        text: 'text-[#E6EDF3]',
    },
    ocean: {
        name: 'ocean',
        background: 'bg-[#075985]', // Sleek ocean depth
        text: 'text-[#F0F9FF]',     // Clear ice blue
    },
    forest: {
        name: 'forest',
        background: 'bg-[#14532D]', // Rich forest base
        text: 'text-[#F0FFF4]',     // Soft mint white
    },
    peach: {
        name: 'peach',
        background: 'bg-[#FFF1E6]',
        text: 'text-[#4B3832]',
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
