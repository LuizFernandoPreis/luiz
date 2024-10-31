"use client";
import { useEffect, useState } from "react";
import HeroSection from "../_components/vagaHero";
import { Empresa, Vaga } from "@prisma/client";
import VagaCard from "../_components/vagaCard";
import Spinner from "@/app/(platform)/_components/spinner";
import Curso from "../../cursos/types/cursoType";
import CursoCard from "../_components/cursoCard";
import { BtnCandidatar } from "../_components/btnCandidatar";

export default function Page({ params }: { params: { id: string } }) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [cursos, setCurso] = useState<Curso[]>([])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados base
        const response = await fetch(`/api/vaga?id=${params.id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setVaga(data.vaga.data);

        // Dados da empresa
        const responseEmpresa = await fetch(
          `/api/empresa?cnpj=${data.vaga.data.empresaId}`
        );
        if (!responseEmpresa.ok) throw new Error("Network response was not ok");

        const dataEmpresa = await responseEmpresa.json();
        setEmpresa(dataEmpresa);


        // Cursos vinculados
        const responseCursos = await fetch('/api/cursos/vaga?id=' + params.id)
        const dataCursos = await responseCursos.json();
        console.log(dataCursos)
        setCurso(dataCursos)
        setLoading(false);
         
        
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {empresa && <HeroSection empresa={empresa} />}
      <div className="container mx-auto px-4 pb-4 md:px-16 pt-8">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          {vaga?.titulo}
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="flex justify-center mb-10">
            <div className="w-full md:w-1/2">
              {vaga && <VagaCard vaga={vaga} />}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="font-medium text-xl text-gray-800 mb-4">
                Detalhes da Vaga
              </h2>
              <p className="text-gray-600">{vaga?.descricao}</p>

              <h2 className="font-medium  text-xl text-gray-800 mt-8 mb-4">
                Requisitos da Vaga
              </h2>
              <p className="text-gray-600">{vaga?.requisitos}</p>
            </div>

            <BtnCandidatar id={parseInt(params.id)}/>
          </div>
        </div>
        <h1 className="text-center text-3xl pt-8 font-semibold text-gray-800 mb-8">
          Cursos vinculados
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-10">
        <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-wrap gap-4 justify-center">
              {isLoading ? (
                <Spinner />
              ) : (
                cursos.map((curso: Curso, index) => (
                  <CursoCard
                    vagaId={parseInt(params.id)}
                    isEdit={false}
                    key={index}
                    curso={curso}
                  />
                ))
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
