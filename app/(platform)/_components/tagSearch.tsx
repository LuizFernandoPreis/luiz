"use client";

import { useState } from "react";
import { useApp } from "../contexts/ctxHome";

export default function TagSearch() {
  const { setTagSearch } = useApp();

  // Estado para armazenar as tags selecionadas para cada categoria
  const [selectedTags, setSelectedTags] = useState({
    contrato: "",
    modalidade: "",
    senioridade: "",
  });

  // Listas de tags para cada categoria
  const contratoTags = ["PJ", "CLT", "Estágio"];
  const modalidadeTags = ["Presencial", "Híbrido", "Remoto"];
  const senioridadeTags = ["Trainee", "Estágio", "Junior", "Pleno", "Senior"];

  // Atualiza as tags selecionadas e notifica o contexto
  const handleClick = (category: keyof typeof selectedTags, tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = { ...prevSelectedTags, [category]: tag === prevSelectedTags[category] ? "" : tag };

      // Atualiza o estado global com os filtros ativos
      const params = new URLSearchParams();
      if (updatedTags.contrato) params.append("contratacao", updatedTags.contrato);
      if (updatedTags.modalidade) params.append("modalidade", updatedTags.modalidade);
      if (updatedTags.senioridade) params.append("senioridade", updatedTags.senioridade);

      setTagSearch(params.toString());
      return updatedTags;
    });
  };

  // Função genérica para renderizar tags de uma categoria
  const renderTags = (tags: string[], category: keyof typeof selectedTags) => {
    return tags.map((tag, i) => (
      <div
        className={`shadow-md rounded w-max px-2 py-1 mt-2 flex align-center justify-center cursor-pointer ${
          selectedTags[category] === tag ? "bg-alternate text-white" : "bg-mercury text-gray-700"
        } hover:bg-alternate hover:text-white`}
        key={i}
        onClick={() => handleClick(category, tag)}
      >
        <p>{tag}</p>
      </div>
    ));
  };

  return (
    <div className="mb-4 md:min-w-64 md:w-1/4 md:block">
      <h2 className="text-2xl font-bold mb-4">Tags de Busca</h2>
      <div className="bg-white shadow-md p-4 rounded">
        <h3 className="font-semibold">Tipo de Contrato</h3>
        <div className="flex flex-row gap-4">{renderTags(contratoTags, "contrato")}</div>
        <h3 className="font-semibold mt-8">Modalidade</h3>
        <div className="flex flex-wrap gap-4">{renderTags(modalidadeTags, "modalidade")}</div>
        <h3 className="font-semibold mt-8">Senioridade</h3>
        <div className="flex flex-wrap gap-4">{renderTags(senioridadeTags, "senioridade")}</div>
      </div>
    </div>
  );
}
