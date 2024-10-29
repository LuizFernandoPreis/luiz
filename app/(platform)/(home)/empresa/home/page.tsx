"use client";
import { Empresa, Vaga } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import VagaCard from "../../vaga/_components/vagaCard";

export default function Home() {
  const session = useSession();
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [formData, setFormData] = useState<Empresa>({
    nome: "",
    cnpj: "",
    descricao: "",
    usuarioId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Dados da empresa
      const emp = await fetch(`/api/empresa/?id=${session?.data?.user?.id}`);
      const data = await emp.json();
      setFormData(data);

      // Vagas
      const vagas = await fetch(`/api/empresa/vaga/?cnpj=${data.cnpj}`);
      const vagasData = await vagas.json();
      console.log(vagasData);
      setVagas(vagasData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex w-full justify-center mt-2">
        <h1 className="font-semibold text-2xl"> Minha Empresa</h1>
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col bg-mercury mt-8 rounded-md p-8 w-2/3 gap-4 shadow-md"
          action=""
        >
          <div className="flex gap-2 w-full">
            <h1>Nome: </h1>
            <input
              className="w-full rounded"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 w-full">
            <h1>CNPJ: </h1>
            <input
              className="w-full rounded"
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <h1>Descrição: </h1>
            <textarea
              className="w-full rounded"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="flex w-full flex-col justify-center mt-8">
        <h1 className="font-semibold text-2xl text-center"> Minhas Vagas</h1>
        <div className="flex justify-center">   
          <div className="bg-mercury w-2/3 rounded-md min-h-16">
            {vagas.map((vaga)=>{
              return(
              <>
              <VagaCard key={vaga.id} vaga={vaga} />
              </>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}