import { Empresa } from "@prisma/client";

type HeroSectionProps = {
  empresa: Empresa; // Corrigido para ser um tipo
};

export default function HeroSection({ empresa }: HeroSectionProps) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 -z-10 opacity-50" />
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(/icons/ifsc.capa2.jpg)`,
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center w-[300px] h-[300px] max-md:mx-auto rounded-md translate-x-8 md:left-12"
        style={{
          top: "60%",
          transform: "translateY(-50%)",
          backgroundImage: `url(/icons/ifsc.jpg)`,
        }}
      />
      <div className="absolute z-10 top-3 md:top-20 text-white p-4 text-center bg-black bg-opacity-50 rounded-md">
        <h1 className="text-4xl font-bold">{empresa.nome}</h1>
        <p className="text-xl">{empresa.descricao}</p>
      </div>
    </div>
  );
}