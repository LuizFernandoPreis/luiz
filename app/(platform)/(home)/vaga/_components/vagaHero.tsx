"use client";
import { Empresa } from "@prisma/client";
import { useEffect, useState } from "react";

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
      <div className="absolute inset-0 -z-10 opacity-50" />
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${capaImage})`,
          backgroundAttachment: "fixed",
        }}
      />

      <div className="flex flex-col w-full h-full p-4">
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

        <div className="flex justify-start align-bottom mt-8 mb-20 md:mb-4 w-full h-full">
          <div
            className="bg-cover bg-center w-[300px] h-[300px] max-md:mx-auto rounded-md"
            style={{
              backgroundImage: `url(${perfilImage})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
