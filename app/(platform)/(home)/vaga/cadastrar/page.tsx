"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VagaForm() {
  const session = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: "",
    local: "",
    modalidade: "",
    senioridade: "",
    contatacao: "",
    descricao: "",
    empresaId: "",
    requisitos: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = await fetch('/api/vaga', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const vaga = await data.json();
    router.push(`/vaga/cadastrar/${vaga.vaga.data.id}`);
  };    

  useEffect(() => {
    const fetchData = async () => {
        const emp = await fetch(`/api/empresa/?id=${session?.data?.user?.id}`);
        const data = await emp.json();
        setFormData((prevData) => ({ ...prevData, empresaId: data.cnpj }));
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      <h1 className="text-center w-full font-bold text-2xl mt-2">Cadastre sua Vaga</h1>
      <div className="flex justify-center">
        <form
          className="flex flex-col bg-mercury mt-8 rounded-md p-8 w-2/3 gap-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 w-full">
            <label htmlFor="titulo">Título:</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              className="w-full rounded"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-2 w-full">
            <label htmlFor="local">Local:</label>
            <input
              id="local"
              name="local"
              type="text"
              className="w-full rounded"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex gap-2 w-1/3">
              <label htmlFor="modalidade">Modalidade:</label>
              <select
                id="modalidade"
                name="modalidade"
                className="w-full rounded"
                value={formData.modalidade}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-mercury" disabled>
                  Selecione
                </option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
              </select>
            </div>

            <div className="flex gap-2 w-1/3">
              <label htmlFor="senioridade">Senioridade:</label>
              <select
                id="senioridade"
                name="senioridade"
                className="w-full rounded"
                value={formData.senioridade}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-mercury" disabled>
                  Selecione
                </option>
                <option value="Trainee">Trainee</option>
                <option value="Estágio">Estágio</option>
                <option value="Junior">Junior</option>
                <option value="Pleno">Pleno</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            <div className="flex gap-2 w-1/3">
              <label htmlFor="contatacao">Contratação:</label>
              <select
                id="contatacao"
                name="contatacao"
                className="w-full rounded"
                value={formData.contatacao}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-mercury" disabled>
                  Selecione
                </option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 w-full">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              name="descricao"
              className="w-full rounded"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-2 w-full">
            <label htmlFor="requisitos">Requisitos:</label>
            <textarea
              id="requisitos"
              name="requisitos"
              className="w-full rounded"
              value={formData.requisitos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="bg-alternate text-white rounded p-2 w-2/5 hover:bg-alternateDark"
            >
              Criar Vaga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
