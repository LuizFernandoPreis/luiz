import { BookCheck } from "lucide-react";
import HeroSection from "./_components/empHero";

export default async function Empresa() {
  return (
    <div>
      <HeroSection />
      <div className="flex min-h-40 bg-mercury justify-center gap-4 flex-col md:flex-row">
        <div className="flex flex-col md:w-60 mt-4">
          <div className="flex">
            <BookCheck />
            <h1 className="font-bold text-lg">Totalmente de graça!</h1>
          </div>
          <div className="p-2">
            <p>
              Cadastre sua empresa na plataforma sem custos extras, otimizando
              seu processo seletivo!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:w-60 mt-4">
          <div className="flex">
            <BookCheck />
            <h1 className="font-bold text-lg">Candidatos Qualificados!</h1>
          </div>
          <div className="p-2">
            <p>
              Receba candidatos qualificados de acordo com o conhecimento
              requerido!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:w-60 mt-4">
          <div className="flex">
            <BookCheck />
            <h1 className="font-bold text-lg">Otimize seu Tempo!</h1>
          </div>
          <div className="p-2">
            <p>
              Otimize seu tempo com as ferramentas fornecidas pela plataforma!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 bg-mercury p-8 mb-16">
        <div className="flex flex-col justify-center w-full">
          <div>
            <h1 className="font-bold text-3xl text-center mt-2">
              Como Funciona?
            </h1>
            <div className="flex flex-col gap-4 mt-8">
              <div className="shadow-md ml-[600px] rounded-lg p-4 w-fit bg-white">
                <h1 className="font-bold">1° Passo:</h1>
                <p>Cadastrar a oportunidade no site</p>
              </div>
              <div className="flex justify-end">
                <div className="shadow-md rounded-lg mr-[600px] p-4 w-fit bg-white">
                  <h1 className="font-bold">2° Passo:</h1>
                  <p>Vincular cursos com os conhecimentos requeridos</p>
                </div>
              </div>
              <div>
                <div className="shadow-md rounded-lg ml-[600px] p-4 w-fit bg-white">
                  <h1 className="font-bold">3° Passo:</h1>
                  <p>Esperar para que candidatos qualificados se inscrevam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}