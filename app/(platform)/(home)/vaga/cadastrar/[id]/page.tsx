"use client";
import { useApp } from "@/app/(platform)/contexts/ctxHome";
import SearchBar from "../../../cursos/_components/searchBar";
import Spinner from "@/app/(platform)/_components/spinner";
import Curso from "../../../cursos/types/cursoType";
import { useEffect } from "react";
import CursoCard from "../../_components/cursoCard";

export default function Page({ params }: { params: { id: string } }) {
  const { cursosApp, isSearching, setcursosApp, setisSearching } = useApp();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch("https://tcc-ifsc.vercel.app/api/cursos");
        const res = await response.json();
        setcursosApp(res);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setisSearching(false);
      }
    };

    fetchCurso();
  }, []);

  return (
    <div className="flex flex-grow flex-col w-full">
      <h1 className="text-center font-semibold mt-8 text-2xl">
        Vincule Cursos a Vaga
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row w-4/5 mx-auto p-4">
          <div>
            <SearchBar />
            <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-wrap gap-4 justify-center">
              {isSearching ? (
                <Spinner />
              ) : (
                cursosApp.map((curso: Curso, index) => (
                  <CursoCard
                    vagaId={parseInt(params.id)}
                    isEdit={true}
                    key={index}
                    curso={curso}
                  />
                ))
              )}
            </div>
            <div className="flex w-full justify-end">
              <a href={`/vaga/${params.id}`} className="text-lg text-center p-2 min-w-fit w-1/6 rounded bg-mercury shadow-md hover:bg-alternate">
                Finalizar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
