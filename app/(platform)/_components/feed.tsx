"use client";
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
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const filteredVagas = vagas.filter((vaga) =>
    vaga.titulo.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/vaga?page=${currentPage}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.data);
        setVagas(data.data.vagas);
        setCount(data.totalCount);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(count / limit);

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
            <div className="flex justify-end w-full mt-4">
              {currentPage > 1 ? (
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage((prev) => prev - 1);
                  }}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              ) : (
                <></>
              )}
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={() => {
                  setLoading(true);
                  setCurrentPage((prev) => prev + 1);
                }}
                disabled={currentPage === totalPages}
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
