"use client"
import { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
    mode: Theme;
    toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ mode: "light", toggle: () => {} });

export const ThemeProvider = ({children}:{children:ReactNode}) => {
    const [mode, setMode] = useState<Theme>("light");

    useEffect(() => {
        const savedTheme = (localStorage?.getItem("theme") || "light") as Theme;
        setMode(savedTheme);
    }, []);

    const toggle = () => {
        setMode(prev => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            localStorage?.setItem("theme", newTheme);
            return newTheme;
        });
    }
    
    return (
        <ThemeContext.Provider value={{ mode, toggle }}>
            <div className= {mode}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}