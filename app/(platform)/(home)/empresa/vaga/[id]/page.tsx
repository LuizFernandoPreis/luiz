'use client'
import Spinner from "@/app/(platform)/_components/spinner";
import { Vaga, Empresa } from "@prisma/client";
import { useState, useEffect } from "react";
import Curso from "../../../cursos/types/cursoType";
import { BtnCandidatar } from "../../../vaga/_components/btnCandidatar";
import CursoCard from "../../../vaga/_components/cursoCard";
import VagaCard from "../../../vaga/_components/vagaCard";
import HeroSection from "../../../vaga/_components/vagaHero";

export default function EmpVagaPage({ params }: { params: { id: string } }){
    const [vaga, setVaga] = useState<Vaga | null>(null);
    const [empresa, setEmpresa] = useState<Empresa | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [cursos, setCurso] = useState<Curso[]>([])
    const [qtdCandidatos, setQtdCandidatos] = useState(0)
  

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

        // Quantidade de candidatos
        const responseCandidatos = await fetch('/api/vaga/candidato?qtd=S&vagaId=' + params.id)
        const dataCandidatos = await responseCandidatos.json();
        setQtdCandidatos(dataCandidatos)

        
        setLoading(false);
        
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, [params.id]);
  
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
              {vaga && <VagaCard vaga={vaga} isEmp={false}/>}
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
            <div>
                <h1 className="text-2xl font-semibold">Quantidade de inscritos</h1>
                <h1 className="font-semibold">{qtdCandidatos}</h1>
            </div>
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
    )
}