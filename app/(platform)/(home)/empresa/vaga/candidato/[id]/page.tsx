"use client";
import Spinner from "@/app/(platform)/_components/spinner";
import { Vaga, Empresa, Usuario } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Pin, GraduationCap, Mail } from "lucide-react";
import CursoCard from "@/app/(platform)/(home)/vaga/_components/cursoCard";
import Curso from "@/app/(platform)/(home)/cursos/types/cursoType";
import HeroSection from "./_components/heroCandidato";

type User = {
  id: string,
  cidade: string,
  nome: string,
  email: string,
  curso: string,
  userPerfilImage: string,
  userCapaImage: string,
  sobre: string,
}

export default function EmpVagaPage({ params }: { params: { id: string } }) {
  const [candidato, setcandidato] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [cursos, setCurso] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dados do candidato
        const response = await fetch(`/api/vaga/candidato?usuarioId=${params.id}`);
        if (!response.ok) throw new Error("Erro ao buscar vaga");
        const data = await response.json();
        setcandidato(data);

        // Cursos vinculados
        const responseCursos = await fetch(`/api/cursos/usuario?id=${params.id}`);
        const dataCursos = await responseCursos.json();
        setCurso(dataCursos);

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
      {candidato && (
        <HeroSection
          capaImage={candidato?.userCapaImage}
          perfilImage={candidato?.userPerfilImage}
          candidato={candidato}
        />
      )}
      <div className="container mx-auto px-4 pb-4 md:px-16 pt-8">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          {candidato?.nome}
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-10">

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="font-medium text-xl text-gray-800 mb-4">
                Sobre Mim:
              </h2>
              <p className="text-gray-600">{candidato?.sobre}</p>
            </div>
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
