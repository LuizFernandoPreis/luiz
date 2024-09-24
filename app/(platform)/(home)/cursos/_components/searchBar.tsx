'use client';
import { useApp } from "@/app/(platform)/contexts/ctxHome";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
    const { searchCursoParam, setSearchCursoPara, setisSearching,
        setcursosApp, } = useApp();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCursoPara(e.target.value);
    };

    const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setisSearching(true);
            const response = await fetch(`http://localhost:3000/api/cursos?search=${searchCursoParam}`)
            const res = await response.json();
            console.log(res)
            setcursosApp(res);
            setisSearching(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
                <input
                    onChange={onChange}
                    onKeyDown={onKeyDown} 
                    type="text" 
                    placeholder="Busque por vagas..."
                    className="w-full py-3 pl-10 pr-4 text-lg text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-alternate/50"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="h-6 w-6 text-gray-500" />
                </span>
            </div>
        </div>
    );
}
