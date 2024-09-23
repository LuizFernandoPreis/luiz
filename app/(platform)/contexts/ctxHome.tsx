'use client'
import { createContext, useState, useContext, ReactNode } from 'react';

// Define o tipo para o valor do contexto
interface AppContextType {
    isOnDemandOpen: boolean;
    setIsOnDemandOpen: (value: boolean) => void;
    isSelectOpen: boolean;
    setIsSelectOpen: (value: boolean) => void;
    searchParam: string;
    setSearchParam: (value: string) => void;
}

// Cria o contexto com um valor padrão como `null`
export const AppContext = createContext<AppContextType | null>(null);

interface AppWrapperProps {
    children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
    const [isOnDemandOpen, setIsOnDemandOpen] = useState(true);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [searchParam, setSearchParam] = useState("");
    return (
        <AppContext.Provider
            value={{
                isOnDemandOpen,
                setIsOnDemandOpen,
                isSelectOpen,
                setIsSelectOpen,
                searchParam,
                setSearchParam,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useApp must be used within an AppWrapper');
    }

    return context;
}
