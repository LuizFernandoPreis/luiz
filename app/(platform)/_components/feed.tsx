'use client'
import { useEffect, useState } from "react";
import TagSearch from "./tagSearch";
import VagaCard from "./vagaCard";
import Spinner from "./spinner";

export default function Feed() {
  const [loading, setLoading] = useState(true);

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
              vagas.map((vaga, i) => (
                <VagaCard key={i} vaga={vaga} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
