"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Curso from "../types/cursoType";

export default function VagaCard({ curso }: { curso: Curso }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    if (session) {
      router.push(`/curso/${curso.id}`);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex w-60 h-80 shadow-md rounded-md p-0.5 transform transition-transform duration-300 hover:scale-105">
      <div className="bg-mercury w-full h-40 rounded relative p-0.5">
        <div className="relative h-full w-full">
          <Image
            src={`${curso.image_480x270}`}
            alt="Hero Image"
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="p-2 flex flex-col h-full justify-between">
          <h1 className="font-bold line-clamp-2 overflow-hidden text-ellipsis">
            {curso.title}
          </h1>
          <p>{curso.visible_instructors[0].name}</p>
          <p className="font-medium">Preço: {curso.price_detail.price_string}</p>
          <div className="mt-auto flex justify-end">
            <a
              href={`https://www.udemy.com${curso.url}`}
              className="bg-mercury p-2 w-2/3 rounded-lg hover:bg-alternate text-center"
            >
              Visitar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
