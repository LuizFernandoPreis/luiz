"use client";
import { useSession } from "next-auth/react";
import { authConfig } from "@/lib/auth/auth-config";
import { isLoggedIn } from "@/lib/auth/session-user";
import { useRouter } from 'next/navigation';
import { Building, Pin, Hammer, ChartBar, Scroll } from "lucide-react";
import Image from "next/image";

type vagaType = {
  id: number;
  titulo: string;
  empresa: string;
  local: string;
  modalidade: string;
  senioridade: string;
  contratacao: string;
};

export default function VagaCard({ vaga }: { vaga: vagaType }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = async (event) => {
    if (session) {
      router.push(`/vaga/${vaga.id}`);
    } else {
      router.push('/auth/login')
    }
  };
  
  return (
    <div className="flex-1">
      <div
        className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col md:flex-row w-dvw-50 hover:bg-alternate"
        onClick={handleClick}
        id={String(vaga.id)}
      >
        <Image
          className="mr-4 max-h-[100px] "
          src="/icons/ifsc.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-between max-w-full">
          <h3 className="font-semibold truncate">{vaga.titulo}</h3>
          <div className="flex flex-wrap gap-4 text-gray-700">
            <p className="flex">
              {" "}
              <Building /> Empresa: {vaga.empresa}
            </p>
            <p className="flex">
              {" "}
              <Pin /> Local: {vaga.local}
            </p>
            <p className="flex">
              {" "}
              <Hammer /> Modalidade: {vaga.modalidade}
            </p>
            <p className="flex">
              {" "}
              <ChartBar /> Senioridade: {vaga.senioridade}
            </p>
            <p className="flex">
              {" "}
              <Scroll /> Contratação: {vaga.contratacao}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
