"use client";
import { action } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import CursoCard from "../(home)/cursos/_components/cursoCard";
import Curso from "../(home)/cursos/types/cursoType";
import Spinner from "../_components/spinner";
import { set } from "zod";

export default function FavoritosPage() {
  const [loading, setLoading] = useState(true);
  const [cursosApp, setcursosApp] = useState<Curso[]>([]);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!session.data?.user?.id) {
        router.push("/auth/login");
      } else {
        const cursos = await fetch(
          "/api/cursos/fav?id=" + session.data.user.id
        );
        const data = await cursos.json();
        setcursosApp(data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-4/5 mx-auto p-4">
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-4">Meus Favoritos</h2>

        <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-wrap gap-4 justify-center">
          {loading ? (
            <Spinner />
          ) : (
            cursosApp.map((curso: Curso, index) => (
              <CursoCard key={index} curso={curso} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
