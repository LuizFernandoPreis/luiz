'use client'
import { SearchIcon } from "lucide-react";
import { useApp } from "../contexts/ctxHome";

export default function SearchBar() {
    const { searchParam,
        setSearchParam } = useApp();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParam(e.target.value)
        console.log(searchParam)
    }
    return (
        <div className="mt-16 flex items-center justify-center">
            <div className="relative w-full max-w-md">
                <input
                    onChange={onChange}
                    type="text" 
                    placeholder="Busque por vagas..."
                    className="w-full py-3 pl-10 pr-4 text-lg text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="h-6 w-6 text-gray-500" />
                </span>
            </div>
        </div>
    )
}