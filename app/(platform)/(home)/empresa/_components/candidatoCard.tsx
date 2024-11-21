'use client'
import { GraduationCap, Pin, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "../../cursos/types/canditato";

export function CandidatoCard({candidato}: {candidato: User}) {
    const handleClick = ()=>{
        window.location.href = `/empresa/vaga/candidato/${candidato.id}`
    }
    return(
        <div className="flex-1">
        <div
          className="bg-white shadow-md p-4 rounded mb-4 w-full flex flex-col md:flex-row w-dvw-50 hover:bg-alternate cursor-pointer"
          onClick={()=>{handleClick()}}
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
    )
}