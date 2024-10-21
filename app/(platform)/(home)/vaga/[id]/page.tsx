'use client'
import { useEffect, useState } from "react";
import HeroSection from "../_components/vagaHero";
import { Empresa, Vaga } from "@prisma/client";

export default function Page({ params }: { params: { id: string } }) {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/vaga?id=${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVaga(data.vaga.data);

        const responseEmpresa = await fetch(`/api/empresa?cnpj=${data.vaga.data.empresaId}`);
        if (!responseEmpresa.ok) {
          throw new Error("Network response was not ok");
        }
        const dataEmpresa = await responseEmpresa.json();
        setEmpresa(dataEmpresa);
        
        
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    {empresa && <HeroSection empresa={empresa} />}
    </>
  );
}
