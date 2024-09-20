'use client'
import { Building, Pin, Hammer, ChartBar, Scroll } from "lucide-react";
import Image from "next/image";

type vagaType = {
  id: number
  titulo: string;
  empresa: string;
  local: string;
  modalidade: string;
  senioridade: string;
  contratacao: string;
};

export default function VagaCard({vaga}: {vaga: vagaType}) {
    const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (
        event
      ) => {
        alert(event.currentTarget.id);
      };
  return (
    <div className="flex-1">
      <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex w-dvw-50 hover:bg-alternate" onClick={handleClick} id={String(vaga.id)}>
        <Image
          className="mr-4"
          src="/icons/ifsc.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-between max-w-full">
          <h3 className="font-semibold truncate">{vaga.titulo}</h3>
          <div className="flex flex-wrap space-x-4 text-gray-700">
            <p className="flex pt-1">
              {" "}
              <Building /> Empresa: {vaga.empresa}
            </p>
            <p className="flex pt-1">
              {" "}
              <Pin /> Local: {vaga.local}
            </p>
            <p className="flex pt-1">
              {" "}
              <Hammer /> Modalidade: {vaga.modalidade}
            </p>
            <p className="flex pt-1">
              {" "}
              <ChartBar /> Senioridade: {vaga.senioridade}
            </p>
            <p className="flex pt-1">
              {" "}
              <Scroll /> Contratação: {vaga.contratacao}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
