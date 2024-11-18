"use client";
import { useEffect, useState } from "react";
import TagSearch from "./tagSearch";
import VagaCard from "./vagaCard";
import Spinner from "./spinner";
import { useApp } from "../contexts/ctxHome";
import { Vaga } from "@prisma/client";

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const { searchParam } = useApp(); 
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          `/api/vaga?page=${currentPage}&limit=${limit}${
            searchParam ? `&search=${searchParam}` : ""
          }`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados.");
        }
        const data = await response.json();
        setVagas(data.data);
        setCount(data.total); 
      } catch (error) {
        console.error("Erro na busca das vagas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchParam]);

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
            ) : vagas.length > 0 ? (
              vagas.map((vaga) => <VagaCard key={vaga.id} vaga={vaga} />)
            ) : (
              <p className="text-center text-gray-600">Nenhuma vaga encontrada.</p>
            )}
            <div className="flex justify-between w-full mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1 || loading}
              >
                Anterior
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage >= Math.ceil(count / limit) || loading}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
