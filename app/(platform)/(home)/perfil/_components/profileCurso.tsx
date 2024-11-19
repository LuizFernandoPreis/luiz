"use client";
import { useEffect, useState } from "react";
import CursoCard from "./cursoCard";
import Spinner from "@/app/(platform)/_components/spinner";
import { useSession } from "next-auth/react";
import Curso from "../../cursos/types/cursoType";


export default function ProfileCurso() {
  const [loading, setLoading] = useState(true);
  const [cursoIds, setCursoIds] = useState<Curso[]>([]);

  const session = useSession();
  useEffect(() => {

    const fetchData = async ()=>{
      const response = await fetch(`/api/cursos/usuario?id=${session.data?.user?.id}`);
      const data = await response.json();

      setCursoIds(data);
    }

    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full h-max flex items-center justify-center mt-4 mb-8 md:mb-0 mx-auto flex-col">
      <h1 className="text-2xl text-start font-semibold mb-4">Cursos</h1>
      <div className="bg-mercury w-[79.5%] flex rounded p-8 justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {loading ? (
            <Spinner />
          ) : (
            cursoIds.map((src, i) => {
              return (
                <div key={i}>
                  <CursoCard
                    key={i}
                    curso={src}
                    isEdit={false}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
