import { createContext, useState, type ReactNode } from "react";

interface GlobalContextType {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void; 
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export default function GlobalProvider({ children }: { children: ReactNode }) {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{ 
            isDarkMode, 
            setIsDarkMode 
        }}>
            {children}
        </GlobalContext.Provider>
    );
}