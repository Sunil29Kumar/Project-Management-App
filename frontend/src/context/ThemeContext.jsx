import { createContext, useState, } from "react";



export const ThemeContext = createContext(null)


export default function ThemeProvider({ children }) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <ThemeContext.Provider value={{ 
            isDarkMode, 
            setIsDarkMode 
        }}>
            {children}
        </ThemeContext.Provider>
    );
}