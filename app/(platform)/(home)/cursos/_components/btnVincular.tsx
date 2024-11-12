"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function BtnVincular({ id }: { id: number }) {
  const [isAdded, setIsAdded] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/cursos/usuario?id=${userId}&cursoId=${id}`
        );

        if (!response.ok) throw new Error("Erro ao verificar candidato");

        const data = await response.json();
        setIsAdded(!!data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    if (userId) fetchData();
  }, [userId, id]);

  async function candidatar() {
    if (!isAdded) {
      try {
        const response = await fetch("/api/cursos/usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuarioId: userId, cursoId: id }),
        });

        if (!response.ok) throw new Error("Erro ao se candidatar");

        const data = await response.json();
        setIsAdded(true);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }else{
      const response = await fetch("/api/cursos/usuario", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuarioId: userId, cursoId: id }),
      });

      if (!response.ok) throw new Error("Erro ao se candidatar");

      const data = await response.json();
      console.log(data);
      setIsAdded(false);
    }
  }

  return (
    <div className="flex items-center justify-center md:justify-end">
      <button
        onClick={candidatar}
        className="bg-btn text-white text-xl px-6 py-3 rounded-lg shadow-md hover:bg-mercuryDark transition"
      >
        {isAdded ? "Desvincular curso!" : "Vincular curso a minha conta!"}
      </button>
    </div>
  );
}
