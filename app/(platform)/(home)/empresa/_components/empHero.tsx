import SearchBar from "@/app/(platform)/_components/searchBar";
import { SearchIcon } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 min-h-[550px]">
            <div className="absolute inset-0 -z-10 bg-black opacity-50"></div>
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/icons/empHero.jpg')",
                    backgroundAttachment: 'fixed',
                }}
            ></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-6xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">Cadastre sua empresa!</h2>
                    <p className="mt-6 leading-8 text-4xl text-gray-300 drop-shadow-lg">
                        Cadastre sua empresa e oferte suas oportunidades conosco! 
                    </p>
                </div>
                <a href="/empresa/cadastro" className="bg-white rounded-md p-4 absolute bottom-32 right-1/2 translate-x-1/2 hover:bg-mercury">Comece a contratar!</a>
            </div>
        </div>
    );
}
