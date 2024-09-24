'use client'
import { useEffect, useState } from "react";
import Spinner from "../../_components/spinner";
import VagaCard from "../../_components/vagaCard";
import CursoTagSearch from "./_components/cursoTagSeach";

export default function CursoPage(){
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 500); 
    
        return () => clearTimeout(timer);
      }, []);
      
      const vagas = [
        {
          id: 0,
          titulo: "Programador JAVA",
          empresa: "IFSC - Tubarão",
          local: "Tubarão",
          modalidade: "Presencial",
          senioridade: "Pleno",
          contratacao: "CLT",
        },
        {
          id: 1,
          titulo: "Programador PHP",
          empresa: "IFSC - Tubarão",
          local: "Tubarão",
          modalidade: "Híbrido",
          senioridade: "Junior",
          contratacao: "CLT",
        },
      ];
    
      const filteredVagas = vagas;  
    
    return(
        <div className="mx-auto flex flex-col mt-24">
      <div className="flex flex-row ml-4">
        <h1>
          <strong>Cursos</strong> / Cursos disponíveis
        </h1>
      </div>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Cursos</h2>
          <div className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col">
            {loading ? (
              <Spinner />
            ) : (
              filteredVagas.map((vaga) => (
                <VagaCard key={vaga.id} vaga={vaga} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    )
}