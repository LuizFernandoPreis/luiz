"use client";
import { useEffect, useState } from "react";
import Spinner from "../../_components/spinner";
import Curso from "./types/cursoType";
import CursoCard from "./_components/cursoCard";
import SearchBar from "./_components/searchBar";
import { useApp } from "../../contexts/ctxHome";

export default function CursoPage() {
  const [loading, setLoading] = useState(true);
  const { cursosApp,isSearching,
    setcursosApp, setisSearching} = useApp();
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch("https://tcc-ifsc.vercel.app/api/cursos");
        const res = await response.json();
        setcursosApp(res);
        console.log(cursosApp);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setisSearching(false);
      }
    };

    fetchCurso();
  }, []);

  return (
    <div className="mx-auto flex flex-col mt-8">
      <SearchBar />
      <div className="flex flex-row ml-[11%]">
        <h1>
          <strong>Cursos</strong> / Cursos disponíveis
        </h1>
      </div>

      {/* Container principal */}
      <div className="flex flex-col md:flex-row w-4/5 mx-auto p-4">
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold mb-4">Cursos</h2>

          {/* Div dos cursos */}
          <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-wrap gap-4">
            {isSearching ? (
              <Spinner />
            ) : (
              cursosApp.map((curso: Curso, index) => (
                <CursoCard key={index} curso={curso} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
