"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Curso from "../types/cursoType";
import { Review } from "../types/reviewType";
import ReviewCard from "../_components/reviewCard";

export default function CursoPage({ params }: { params: { id: string } }) {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`/api/cursos/?id=${params.id}`);
        const data = await response.json();
        setCurso(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o curso:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/cursos/review/?id=${params.id}`);
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error("Erro ao buscar as avaliações:", error);
      }
    };
    fetchReviews();
    fetchCurso();
  }, [params.id]);

  if (isLoading || !curso) return <div>Carregando...</div>;

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 mb-16 w-full">
        <div className="absolute inset-0 -z-10 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center w-full"
          style={{
            backgroundImage: `url(${curso.image_480x270})`,
            backgroundAttachment: "fixed",
            filter: "grayscale(70%)",
          }}
        ></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-6xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
              {curso.title}
            </h2>
            <p className="mt-6 leading-8 text-4xl text-gray-300 drop-shadow-lg">
              {"Aprimore suas habilidades com o melhor conteúdo online."}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={`https://www.udemy.com${curso.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-btn text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-mercuryDark transition"
            >
              Vincular curso a minha conta
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-4 md:px-16 pt-8">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          Instrutores
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {curso.visible_instructors.map((instrutor) => (
                  <div
                    key={instrutor.url}
                    className="flex flex-col items-center"
                  >
                    <Image
                      src={instrutor.image_100x100}
                      alt={instrutor.display_name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <h3 className="text-xl font-medium text-gray-800 mt-2">
                      {instrutor.display_name}
                    </h3>
                    <p className="text-gray-600">{instrutor.job_title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center md:justify-start items-center mt-8 md:mt-0">
              <a
                href={`https://www.udemy.com${curso.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-btn text-white px-6 py-3 rounded-lg hover:bg-mercuryDark transition text-center md:w-auto w-full"
              >
                Ver Curso na Udemy
              </a>
            </div>
          </div>
        </div>
        <h1 className="text-center text-3xl font-semibold text-gray-800 my-8">
          Reviews
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-10 flex flex-wrap gap-8 justify-center">
          {reviews.length > 0 &&
            reviews.map((review, i) => (
              <ReviewCard key={i} id={i} review={review} />
            ))}
        </div>
      </div>
    </>
  );
}
