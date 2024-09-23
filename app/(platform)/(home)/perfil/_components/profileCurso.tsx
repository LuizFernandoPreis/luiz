"use client";
import { useEffect, useState } from "react";
import CursoCard from "./cursoCard";
import Spinner from "@/app/(platform)/_components/spinner";

const listaCurso = [
  { image: "udemy.png", title: "Iniciando no PHP", homologado: true },
  { image: "alura.jpeg", title: "Trilha do dev Web", homologado: true },
  { image: "udemy.png", title: "JSP avançado", homologado: false },
  { image: "alura.jpeg", title: "Back-end developer", homologado: true },
  { image: "udemy.png", title: "SpringBoot Initializer", homologado: false },
];

export default function ProfileCurso() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full h-max flex items-center justify-center mt-4 mx-auto flex-col">
      <h1 className="text-2xl text-start font-semibold mb-4">Cursos</h1>
      <div className="bg-mercury w-[79.5%] flex rounded p-8 justify-center">
        <div className="relative flex flex-wrap gap-4 justify-center">
          {loading ? <Spinner /> :listaCurso.map((src) => {
            return (
              <div>
                <CursoCard
                  src={src.image}
                  hintText={src.title}
                  homologado={src.homologado}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
