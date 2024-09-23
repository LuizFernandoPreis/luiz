import Image from "next/image";
import { useState } from "react";

interface CursoCardProps {
  src: string;
  hintText: string;
  homologado: boolean;
}

export default function CursoCard({ src, hintText, homologado }: CursoCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="relative min-w-32 min-h-32"
      onMouseEnter={() => setShowTooltip(true)} 
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Image
        src={`/icons/${src}`}
        alt="Curso Image"
        fill
        className="object-cover rounded"
      />
      {showTooltip && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded">
          {hintText}
        </div>
      )}
      {showTooltip && (
        <div
          className={`absolute bottom-1 right-1 px-2 py-1 text-sm font-semibold rounded ${
            homologado ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {homologado ? "Homologado" : "Não Homologado"}
        </div>
      )}
    </div>
  );
}
