import { createContext } from 'react';

interface ThemeType {
    name: string;
    background: string;
    text: string;
}

export const themes: Record<string, ThemeType> = {
    light: { name: 'light', background: 'bg-[#FFF1D5]', text: 'text-[#0B1D51]' },
    dark: { name: 'dark', background: 'bg-black', text: 'text-[#FFF1D5]' },
    ocean: { name: 'ocean', background: 'bg-[#0B1D51]', text: 'text-[#E7EFC7]' },
    forest: { name: 'forest', background: 'bg-[#B6B09F]', text: 'text-[#0B1D51]' },
    peach: { name: 'peach', background: 'bg-[#E7EFC7]', text: 'text-[#0B1D51]' },
};

export interface ThemeContextType {
    theme: ThemeType;
    setThemeByName: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: themes.dark,
    setThemeByName: () => {},
});
