import { Building, ChartBar, Hammer, Pin, Scroll } from 'lucide-react';
import Image from 'next/image'

export default function Feed() {
    return (
        <div className='mx-auto flex flex-col'>
            <div className="flex flex-row ml-4"> 
                <h1><strong>Início</strong> / Vagas disponíveis</h1>
            </div>
            <div className="flex flex-row max-w-6xl  mx-auto p-4">
                <div className="w-1/4">
                    <h2 className="text-2xl font-bold mb-4">Tags de Busca</h2>
                    <div className="bg-white shadow-md p-4 rounded">
                        <h3 className="font-semibold">Tipo de Contrato</h3>
                        <p className="text-gray-700 ">PJ</p>
                    </div>
                </div>
                <div className="flex-1 ml-16">
                    <h2 className="text-2xl font-bold mb-4">Vagas</h2>
                    <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex max-w-lg">
                        <Image
                            className="mr-4"
                            src="/icons/ifsc.png"
                            alt="Logo"
                            width={100} 
                            height={100} 
                        />
                        <div className="flex flex-col justify-between max-w-full">
                            <h3 className="font-semibold truncate">Título da Vaga</h3>
                            <div className="flex flex-wrap space-x-4 text-gray-700">
                                <p className='flex pt-1'> <Building /> Empresa: </p>
                                <p className='flex pt-1'> <Pin /> Local: </p>
                                <p className='flex pt-1'> <Hammer /> Modalidade: </p>
                                <p className='flex pt-1'> <ChartBar /> Senioridade: </p>
                                <p className='flex pt-1'> <Scroll /> Contratação: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
