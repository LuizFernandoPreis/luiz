"use client";

import { useState } from "react";

export default function CursoTagSearch() {
  // Estado para armazenar as tags selecionadas
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Função para lidar com o clique e seleção
  const handleClick: React.MouseEventHandler<HTMLParagraphElement> = (
    event
  ) => {
    const clickedTag = event.currentTarget.textContent || "";

    // Adiciona ou remove a tag do array de tags selecionadas
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(clickedTag)
        ? prevSelectedTags.filter((tag) => tag !== clickedTag)
        : [...prevSelectedTags, clickedTag]
    );
  };

  const contratoTag = ["PJ", "CLT"];
  const modalidateTag = ["Presencial", "Híbrido", "Remoto"];
  const SenioridadeTag = ["Trainee", "Estágio", "Junior", "Pleno", "Senior"];

  const renderTags = (tags: string[]) => {
    return tags.map((tag, i) => (
      <div
        className={`shadow-md rounded w-max px-1 mt-2 flex align-center justify-center ${
          selectedTags.includes(tag) ? "bg-alternate" : "bg-mercury"
        } hover:bg-alternate`}
        key={i}
      >
        <p
          className="text-gray-700 cursor-pointer"
          id={String(i)}
          onClick={handleClick}
        >
          {tag}
        </p>
      </div>
    ));
  };

  return (
    <div className="mb-4 md:w-1/4 md:block">
      <h2 className="text-2xl font-bold mb-4">Tags de Busca</h2>
      <div className="bg-white shadow-md p-4 rounded">
        <h3 className="font-semibold">Tipo de Contrato</h3>
        <div className="flex flex-row gap-4">{renderTags(contratoTag)}</div>
        <h3 className="font-semibold mt-8">Modalidade</h3>
        <div className="flex flex-wrap gap-4">
          {renderTags(modalidateTag)}
        </div>
        <h3 className="font-semibold mt-8">Senioridade</h3>
        <div className="flex flex-wrap gap-4">
          {renderTags(SenioridadeTag)}
        </div>
      </div>
    </div>
  );
}
