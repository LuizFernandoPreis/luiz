import { SearchIcon } from "lucide-react";

export default function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 mb-16">
            <div className="absolute inset-0 -z-10 bg-black opacity-50"></div> 
            <div 
                className="absolute inset-0 -z-20 bg-cover bg-center" 
                style={{
                    backgroundImage: "url('/icons/hero(1).jpg')",
                    backgroundAttachment: 'fixed',
                }}
            ></div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-6xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">Mercury Surge</h2>
                    <p className="mt-6 leading-8 text-4xl text-gray-300 drop-shadow-lg">
                        Conectando talentos a oportunidades: o seu próximo passo na carreira começa aqui!
                    </p>
                </div>
                <div className="mt-16 flex items-center justify-center">
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text" 
                            placeholder="Busque por vagas..."
                            className="w-full py-3 pl-10 pr-4 text-lg text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SearchIcon className="h-6 w-6 text-gray-500" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
