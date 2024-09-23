'use client';
import { useEffect, useState } from "react";
import TagSearch from "./tagSearch";
import VagaCard from "./vagaCard";
import Spinner from "./spinner";
import { useApp } from "../contexts/ctxHome";

export default function Feed() {
  const [loading, setLoading] = useState(true);
  const { searchParam, setSearchParam } = useApp();

  const vagas = [
    {
      id: 0,
      titulo: "Programador JAVA",
      empresa: "IFSC - Tubarão",
      local: "Tubarão",
      modalidade: "Presencial",
      senioridade: "Pleno",
      contratacao: "CLT",
    },
    {
      id: 1,
      titulo: "Programador PHP",
      empresa: "IFSC - Tubarão",
      local: "Tubarão",
      modalidade: "Híbrido",
      senioridade: "Junior",
      contratacao: "CLT",
    },
  ];

  // Filtra as vagas baseadas no título e searchParam
  const filteredVagas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex flex-col mb-24">
      <div className="flex flex-row ml-4">
        <h1>
          <strong>Início</strong> / Vagas disponíveis
        </h1>
      </div>
      <div className="flex flex-row max-w-6xl mx-auto p-4">
        <TagSearch />
        <div className="flex-1 md:ml-16">
          <h2 className="text-2xl font-bold mb-4">Vagas</h2>
          <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col">
            {loading ? (
              <Spinner />
            ) : (
              filteredVagas.map((vaga) => (
                <VagaCard key={vaga.id} vaga={vaga} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
