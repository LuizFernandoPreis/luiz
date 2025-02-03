"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import Curso from "../(home)/cursos/types/cursoType";

// Define o tipo correto para o valor do contexto
interface AppContextType {
  cursosApp: Curso[]; 
  setcursosApp: (value: any[]) => void;
  isSearching: boolean;
  setisSearching: (value: boolean) => void;
  searchParam: string;
  setSearchParam: (value: string) => void;
  searchCursoParam: string;
  setSearchCursoPara: (value: string) => void;
  tagSearch: string;
  setTagSearch: (value: string) => void;
  isUpdate: boolean;
  setIsUpdate: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [cursosApp, setcursosApp] = useState<Curso[]>([]); 
  const [isSearching, setisSearching] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [searchCursoParam, setSearchCursoPara] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <AppContext.Provider
      value={{
        cursosApp,
        setcursosApp,
        isSearching,
        setisSearching,
        searchParam,
        setSearchParam,
        searchCursoParam,
        setSearchCursoPara,
        tagSearch,
        setTagSearch,
        isUpdate,
        setIsUpdate
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppWrapper");
  }

  return context;
}
