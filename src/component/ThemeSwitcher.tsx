import { useContext } from 'react';
import { ThemeContext, themes } from '../theme/ThemeContext';

export default function ThemeSwitcher() {
    const { setThemeByName, theme } = useContext(ThemeContext);

    return (
        <div className="p-4">
            <label className="block mb-2 font-bold text-[#0B1D51]">Choose Theme:</label>
            <select
                value={theme.name}
                onChange={(e) => setThemeByName(e.target.value)}
                className="border px-4 py-2 rounded-lg bg-[#FFF1D5] text-[#0B1D51] border-[#B6B09F] focus:ring-[#0B1D51] focus:border-[#0B1D51]"
            >
                {Object.keys(themes).map((name) => (
                    <option key={name} value={name}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
