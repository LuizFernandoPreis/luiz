'use client';
import { useEffect, useState } from "react";
import TagSearch from "./tagSearch";
import VagaCard from "./vagaCard";
import Spinner from "./spinner";
import { useApp } from "../contexts/ctxHome";
import { Vaga } from "@prisma/client";

export default function Feed() {
  const [loading, setLoading] = useState(true);
  const { searchParam, setSearchParam } = useApp();
  const [vagas, setVagas] = useState<Vaga[]>([]);

  
  const filteredVagas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/vaga");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVagas(data.data.vagas);
        console.log(data.data.vagas);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="mx-auto flex flex-col mb-24">
      <div className="flex flex-row ml-4">
        <h1>
          <strong>Início</strong> / Vagas disponíveis
        </h1>
      </div>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4">
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
