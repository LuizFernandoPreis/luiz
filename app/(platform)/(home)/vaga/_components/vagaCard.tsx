"use client";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Building, Pin, Hammer, ChartBar, Scroll, HandCoins } from "lucide-react";
import Image from "next/image";
import { Vaga } from "@prisma/client";
import { useEffect, useState } from "react";



export default function VagaCard({ vaga, isEmp }: { vaga: Vaga, isEmp: boolean}) {
  const { data: session } = useSession();
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/empresa?cnpj=" + vaga.empresaId);
      const empresa = await data.json();
      setNomeEmpresa(empresa.nome);
    }
    fetchData();
  }, []);

  function handleClick(){
    if(!isEmp) return;
    router.push(`/empresa/vaga/${vaga.id}`);
  }  
  return (
    <div className="flex-1">
      <div
        className={`bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col md:flex-row w-dvw-50 ${isEmp ? "hover:bg-alternate" : ""}`}
        id={String(vaga.id)}
        onClick={handleClick}
      >
        <Image
          className="mr-4 max-h-[100px] "
          src="/icons/ifsc.jpg"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex flex-col justify-between max-w-full">
          <h3 className="font-semibold truncate">{vaga.titulo}</h3>
          <div className="flex flex-wrap gap-4 text-gray-700">
            <p className="flex">
              {" "}
              <Building /> Empresa: {nomeEmpresa}
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
              <Scroll /> Contratação: {vaga.contatacao}
            </p>
            <p className="flex">
              {" "}
              <HandCoins /> Salário: {vaga.salario}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
