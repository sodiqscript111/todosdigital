import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    // Clean and modern light theme
    light: {
        name: 'light',
        background: 'bg-[#F8F9FA]', // off-white
        text: 'text-[#111827]', // dark grayish navy
    },
    // Sleek high-contrast dark theme
    dark: {
        name: 'dark',
        background: 'bg-[#0F172A]', // deep slate
        text: 'text-[#F8FAFC]', // off-white
    },
    // Calm and professional blue
    ocean: {
        name: 'ocean',
        background: 'bg-[#1E3A8A]', // bold blue (tailwind blue-800)
        text: 'text-white',
    },
    // Earthy and elegant
    forest: {
        name: 'forest',
        background: 'bg-[#2F3E46]', // desaturated forest green
        text: 'text-[#EDF6F9]', // soft pastel blue
    },
    // Soft pastel for a gentle mood
    peach: {
        name: 'peach',
        background: 'bg-[#FFE5B4]', // soft peach
        text: 'text-[#3B3B3B]', // dark gray for readability
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
