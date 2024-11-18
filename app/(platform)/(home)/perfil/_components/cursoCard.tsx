"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import Curso from "../../cursos/types/cursoType";

type cardProps = {
    curso: Curso,
    isEdit: boolean
}
export default function VagaCard({ curso, isEdit }: cardProps) {
  const { data: session } = useSession();
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAdded = async () => {
    };
    fetchAdded();
  }, []);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    if (session) {
      router.push(`/cursos/${curso.id}`);
    } else {
      router.push("/auth/login");
    }
  };

  const handleFavorite: React.MouseEventHandler<HTMLSpanElement> = async () => {
    if (session) {
      if(!isAdded){
        setIsAdded(!isAdded);
        const response = await fetch(`/api/cursos`, {method:'POST', body: JSON.stringify({id: curso.id})});
        return;
      }
      setIsAdded(!isAdded);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex w-60 h-80 shadow-md rounded-md p-0.5 transition-transform duration-300 hover:scale-105 cursor-pointer">
      <div className="bg-mercury w-full h-40 rounded relative p-0.5" onClick={handleClick}>
        <div className="h-full w-full">
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
          <p className="font-medium">
            Preço: {curso.price_detail.price_string}
          </p>
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
      {
        isEdit ? <span
        className={`flex p-1 right-2 top-2 ${
          isAdded ? "bg-yellow-100" : "bg-white"
        } rounded-lg absolute hover:bg-yellow-100`}
        onClick={handleFavorite}
      >
        <CirclePlus />
      </span> : <></>
      }
      
    </div>
  );
}
