"use client";
import { useEffect, useState } from "react";
import HeroSection from "../_components/vagaHero";
import { Empresa, Vaga } from "@prisma/client";
import VagaCard from "../_components/vagaCard";
export default function Page({ params }: { params: { id: string } }) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/vaga?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVaga(data.vaga.data);

        const responseEmpresa = await fetch(
          `/api/empresa?cnpj=${data.vaga.data.empresaId}`
        );
        if (!responseEmpresa.ok) {
          throw new Error("Network response was not ok");
        }
        const dataEmpresa = await responseEmpresa.json();
        setEmpresa(dataEmpresa);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {empresa && <HeroSection empresa={empresa} />}
      <h1 className="text-center mt-8 text-2xl font-semibold">
        {vaga?.titulo}
      </h1>
      <div className="w-full h-full pt-8 px-16 mb-16">
        <div className="w-full p-16 bg-mercury">
          <div className="w-1/2">{vaga && <VagaCard vaga={vaga} />}</div>
          <h1 className="font-medium text-2xl mt-16">Detalhes da Vaga</h1>
          {vaga?.descricao}
          <h1 className="font-medium text-2xl mt-16">Requisitos da vaga</h1>
          {vaga?.requisitos}          
        </div> 
      </div>
    </div>
  );
}
