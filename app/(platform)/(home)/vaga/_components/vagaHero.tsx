"use client";

import { Empresa } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

type HeroSectionProps = {
  empresa: Empresa;
};

export default function HeroSection({ empresa }: HeroSectionProps) {
  const [perfilImage, setPerfilImage] = useState("/icons/ifsc.jpg");
  const [capaImage, setCapaImage] = useState("/icons/ifsc.capa2.jpg");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`/api/usuario/images/?id=${empresa.usuarioId}`);
        const user = await userResponse.json();
        setPerfilImage(user.perfil || "/icons/ifsc.jpg");
        setCapaImage(user.capa || "/icons/ifsc.capa2.jpg");
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };

    fetchData();
  }, [empresa.usuarioId]);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[500px] max-h-[500px] flex items-center justify-center">
      {/* Imagem de Capa */}
      <Image
        src={capaImage}
        alt="Imagem de Capa"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 -z-20 opacity-50"
        priority
      />

      <div className="flex flex-col w-full h-full p-4">
        {/* Informações da Empresa */}
        <div className="flex justify-center mt-20 md:mt-8">
          <div className="bg-black bg-opacity-50 rounded-md p-4">
            <h1 className="text-4xl font-bold text-white text-center">
              {empresa.nome}
            </h1>
            <p className="text-xl text-white text-center">
              {empresa.descricao}
            </p>
          </div>
        </div>

        {/* Imagem de Perfil */}
        <div className="flex justify-start align-bottom mt-8 mb-20 md:mb-4 w-full h-full">
          <div className="relative w-[300px] h-[300px] max-md:mx-auto rounded-md overflow-hidden">
            <Image
              src={perfilImage}
              alt="Imagem de Perfil"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
