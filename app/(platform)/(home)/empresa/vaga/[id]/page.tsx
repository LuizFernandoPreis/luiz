"use client";
import Spinner from "@/app/(platform)/_components/spinner";
import { Vaga, Empresa } from "@prisma/client";
import { useState, useEffect } from "react";
import Curso from "../../../cursos/types/cursoType";
import CursoCard from "../../../vaga/_components/cursoCard";
import VagaCard from "../../../vaga/_components/vagaCard";
import HeroSection from "../../../vaga/_components/vagaHero";
import Image from "next/image";
import { Building, Pin, Hammer, ChartBar, Scroll, HandCoins, GraduationCap, Mail } from "lucide-react";

export default function EmpVagaPage({ params }: { params: { id: string } }) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [cursos, setCurso] = useState<Curso[]>([]);
  const [qtdCandidatos, setQtdCandidatos] = useState(0);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados da vaga
        const response = await fetch(`/api/vaga?id=${params.id}`);
        if (!response.ok) throw new Error("Erro ao buscar vaga");
        const data = await response.json();
        setVaga(data.vaga.data);

        // Dados da empresa
        const responseEmpresa = await fetch(
          `/api/empresa?cnpj=${data.vaga.data.empresaId}`
        );
        if (!responseEmpresa.ok) throw new Error("Erro ao buscar empresa");
        const dataEmpresa = await responseEmpresa.json();
        setEmpresa(dataEmpresa);

        // Cursos vinculados
        const responseCursos = await fetch(`/api/cursos/vaga?id=${params.id}`);
        const dataCursos = await responseCursos.json();
        setCurso(dataCursos);

        // Quantidade e detalhes dos candidatos
        const responseCandidatos = await fetch(
          `/api/vaga/candidato?qtd=S&vagaId=${params.id}`
        );
        const dataCandidatos = await responseCandidatos.json();
        setQtdCandidatos(dataCandidatos.qtdCandidato);
        setCandidatos(dataCandidatos.candidatos);
        console.log(dataCandidatos.candidatos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {empresa && (
        <HeroSection
          capaImage={vaga?.empCapaImage}
          perfilImage={vaga?.empImage}
          empresa={empresa}
        />
      )}
      <div className="container mx-auto px-4 pb-4 md:px-16 pt-8">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          {vaga?.titulo}
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="flex justify-center mb-10">
            <div className="w-full md:w-1/2">
              {vaga && <VagaCard vaga={vaga} isEmp={false} />}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="font-medium text-xl text-gray-800 mb-4">
                Detalhes da Vaga
              </h2>
              <p className="text-gray-600">{vaga?.descricao}</p>

              <h2 className="font-medium text-xl text-gray-800 mt-8 mb-4">
                Requisitos da Vaga
              </h2>
              <p className="text-gray-600">{vaga?.requisitos}</p>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-center">
                Quantidade de inscritos
              </h1>
              <h1 className="font-bold text-2xl text-center">
                {qtdCandidatos}
              </h1>
            </div>
          </div>
        </div>

        <h1 className="text-center text-3xl pt-8 font-semibold text-gray-800 mb-8">
          Candidatos
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="flex-col flex-wrap gap-4 justify-center">
            {isLoading ? (
              <Spinner />
            ) : (
              candidatos.map((candidato: any, index: number) => (
                <div className="flex-1" key={index}>
                  <div
                    className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col md:flex-row w-dvw-50 hover:bg-alternate cursor-pointer"
                    onClick={()=>{}}
                    id={String(candidato.id)}
                  >
                    <Image
                      className="mr-4 max-h-[100px]"
                      src={candidato.userPerfilImage + `?cache-buster=${Date.now()}`}
                      alt="Empresa Profile Image"
                      width={150}
                      height={150}
                      priority
                    />
                    <div className="flex flex-col justify-between max-w-full">
                      <h3 className="font-semibold truncate text-2xl">{candidato.nome}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-700">
                        <p className="flex items-center gap-2">
                          <GraduationCap /> Curso: {candidato.curso} 
                        </p>
                        <p className="flex items-center gap-2">
                          <Pin /> Cidade: {candidato.cidade}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail /> Email de contato: {candidato.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <h1 className="text-center text-3xl pt-8 font-semibold text-gray-800 mb-8">
          Cursos vinculados
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="flex flex-wrap gap-4 justify-center">
            {isLoading ? (
              <Spinner />
            ) : cursos.length > 0 ? (
              cursos.map((curso, index) => (
                <CursoCard
                  key={index}
                  vagaId={parseInt(params.id)}
                  isEdit={false}
                  curso={curso}
                />
              ))
            ) : (
              <p className="text-gray-600">
                Nenhum curso vinculado encontrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
