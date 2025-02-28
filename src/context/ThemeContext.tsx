import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { themes, ThemeType } from "../utils/theme.ts";

interface ThemeContextProps {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const storedTheme = (localStorage.getItem("theme") as ThemeType) || "dark";

    // if(storedTheme != null){
    const [theme, setTheme] = useState<ThemeType>(storedTheme);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.style.setProperty("--background-color", themes[theme].background);
        document.documentElement.style.setProperty("--primary-color", themes[theme].primary);
        document.documentElement.style.setProperty("--secondary-color", themes[theme].secondary);
        document.documentElement.style.setProperty("--font-color", themes[theme].color);
        document.documentElement.style.setProperty("--contrast", themes[theme].contrast);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "black" : "light"));
    }
    return (
        <ThemeContext.Provider value={{ theme, setTheme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}