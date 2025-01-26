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
    salario: "A combinar",
    empImage: "",
    empCapaImage: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    formData.empImage = session?.data?.user?.image || "";
    formData.empCapaImage = session?.data?.user?.capaImage || "";

    const data = await fetch("/api/vaga", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-8">
      <h1 className="text-center w-full font-bold text-2xl mt-2">
        Cadastre sua Vaga
      </h1>
      <div className="flex justify-center w-full">
        <form
          className="flex flex-col bg-mercury mt-8 rounded-md p-4 sm:p-8 w-full sm:w-2/3 gap-6 sm:gap-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <input
                id="titulo"
                name="titulo"
                type="text"
                className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                placeholder="Titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                id="local"
                name="local"
                type="text"
                className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                placeholder="Local"
                value={formData.local}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col gap-2 md:w-2/3">
              <textarea
                id="requisitos"
                name="requisitos"
                className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm whitespace-pre-wrap"
                placeholder="Requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col md:w-1/3 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <select
                    id="modalidade"
                    name="modalidade"
                    className="bg-mercuryDark focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                    value={formData.modalidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Modalidade</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <select
                    id="senioridade"
                    name="senioridade"
                    className="bg-mercuryDark focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                    value={formData.senioridade}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Senioridade
                    </option>
                    <option value="Trainee">Trainee</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Junior">Junior</option>
                    <option value="Pleno">Pleno</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <select
                    id="contatacao"
                    name="contatacao"
                    className="bg-mercuryDark focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                    value={formData.contatacao}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Contratação
                    </option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Estágio">Estágio</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <select
                  id="salario"
                  name="salario"
                  className="bg-mercuryDark focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                  value={formData.salario}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Salário
                  </option>
                  <option value="A Combinar">A Combinar</option>
                  <option value="Até R$1000">Até R$1000</option>
                  <option value="R$1000 - R$2000">R$1000 - R$2000</option>
                  <option value="R$2000 - R$3000">R$2000 - R$3000</option>
                  <option value="R$3000 - R$5000">R$3000 - R$5000</option>
                  <option value="R$6000 - R$10000">R$6000 - R$10000</option>
                  <option value="R$10000 - R$20000">R$10000 - R$20000</option>
                  <option value=">Maior que R$20000">Maior que R$20000</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <textarea
              id="descricao"
              name="descricao"
              className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm whitespace-pre-wrap"
              placeholder="Descrição"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="bg-alternate text-white rounded p-2 w-full sm:w-2/5 hover:bg-alternateDark"
            >
              Criar Vaga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
