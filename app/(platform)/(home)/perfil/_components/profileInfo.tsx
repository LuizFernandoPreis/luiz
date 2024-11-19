"use client";
import { Usuario } from "@prisma/client";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserUpdateModal from "./userUpdateModal";
import ModalUpdatePerfilImage from "./modalUpdatePerfil";

export default function ProfileInfo({ user }: { user: Usuario }) {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModalImageOpen, setIsModalImageOpen] = useState(false); 
  const [isModalCapaOpen, setIsModalCapaOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full gap-16 p-4 md:p-0 align-center justify-center">
      <div
        className="bg-mercury w-full h-60 md:h-60 md:w-1/4 p-2 rounded cursor-pointer"
        onClick={() => setIsModalImageOpen(true)}
      >
        <div className="relative h-full w-full">
          <Image
            src={
              user.userPerfilImage
                ? user.userPerfilImage + `?cache-buster=${Date.now()}`
                : "/icons/userPlaceHolder.jpeg"
            }
            alt="Imagem de Perfil"
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      <div className="bg-mercury rounded md:w-1/2 h-[50%] md:h-60 p-2 flex flex-col md:flex-row gap-2">
        <div className="bg-white shadow-md p-4 rounded md:w-1/3 h-full flex flex-col space-y-4 overflow-hidden">
          <h1 className="text-2xl text-start font-semibold">{user?.nome}</h1>
          <p className="text-md text-start">Cidade: {user.cidade}</p>
          <p className="text-md text-start">Curso: {user.curso}</p>
          <p className="text-md text-start">
            Situação:{" "}
            {user.sit == "S"
              ? "Aberto a oportunidades"
              : "Não aberto a oportunidades"}
          </p>
        </div>

        <div className="bg-white shadow-md p-4 rounded md:w-2/3 h-full flex flex-col space-y-4 overflow-hidden">
          <div className="flex justify-between">
            <h1 className="text-2xl text-start font-semibold">Sobre mim</h1>
            <span
              className="hover:bg-mercury p-2 rounded-lg cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit />
            </span>
          </div>

          <p className="text-md text-start overflow-auto">{user.sobre}</p>
        </div>
      </div>

      {isModalImageOpen && (
        <ModalUpdatePerfilImage
          userId={user.id}
          isOpen={isModalImageOpen} 
          onClose={() => setIsModalImageOpen(false)} 
        />
      )}

      {isModalOpen && (
        <UserUpdateModal
          user={user}
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
