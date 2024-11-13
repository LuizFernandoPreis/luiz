"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Building,
  Pin,
  Hammer,
  ChartBar,
  Scroll,
  HandCoins,
} from "lucide-react";
import Image from "next/image";
import { Vaga } from "@prisma/client";
import { useEffect, useState } from "react";

export default function VagaCard({ vaga }: { vaga: Vaga }) {
  const { data: session } = useSession();
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [perfilImage, setPerfilImage] = useState("/icons/ifsc.jpg");
  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    router.push(session ? `/vaga/${vaga.id}` : "/auth/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresaResponse = await fetch(`/api/empresa?cnpj=${vaga.empresaId}`);
        const empresa = await empresaResponse.json();
        setNomeEmpresa(empresa.nome);

        const userResponse = await fetch(`/api/usuario/images/?id=${empresa.usuarioId}`);
        const user = await userResponse.json();
        setPerfilImage(user.perfil || "/icons/ifsc.jpg");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [vaga.empresaId]); 

  return (
    <div className="flex-1">
      <div
        className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col md:flex-row w-dvw-50 hover:bg-alternate cursor-pointer"
        onClick={handleClick}
        id={String(vaga.id)}
      >
        <Image
          className="mr-4 max-h-[100px]"
          src={perfilImage}
          alt="User Profile Image"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col justify-between max-w-full">
          <h3 className="font-semibold truncate">{vaga.titulo}</h3>
          <div className="flex flex-wrap gap-4 text-gray-700">
            <p className="flex">
              <Building /> Empresa: {nomeEmpresa}
            </p>
            <p className="flex">
              <Pin /> Local: {vaga.local}
            </p>
            <p className="flex">
              <Hammer /> Modalidade: {vaga.modalidade}
            </p>
            <p className="flex">
              <ChartBar /> Senioridade: {vaga.senioridade}
            </p>
            <p className="flex">
              <Scroll /> Contratação: {vaga.contatacao}
            </p>
            <p className="flex">
              <HandCoins /> Salário: {vaga.salario}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
