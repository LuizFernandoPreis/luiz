import { Empresa } from "@prisma/client";
import Image from "next/image";

type HeroSectionProps = {
  empresa: Empresa;
  perfilImage: string | undefined;
  capaImage: string | undefined;
};

export default function HeroSection({ empresa, perfilImage, capaImage }: HeroSectionProps) {

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[500px] max-h-[500px] flex items-center justify-center">
      <Image
        src={capaImage + `?cache-buster=${Date.now()}` || "/icons/ifsc.jpg"}
        alt="Imagem de Capa"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 -z-20 opacity-50"
        priority
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
          <div className="relative w-[300px] h-[300px] max-md:mx-auto rounded-md overflow-hidden">
            <Image
              src={perfilImage + `?cache-buster=${Date.now()}` || "/icons/ifsc.jpg"}
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
