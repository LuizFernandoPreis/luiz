"use client";

import { Usuario } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import ModalUpdateCapaImage from "./modalUpdateCapa";

type HeroProps = {
  children: React.ReactNode;
  user: Usuario;
};

export default function HeroSection({ children, user }: HeroProps) {
  const [isModalCapaOpen, setIsModalCapaOpen] = useState(false);

  const backgroundImage = user.userCapaImage || "/icons/capaPlaceholder.png";

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[300px]">
      <Image
        src={backgroundImage + `?cache-buster=${Date.now()}`}
        alt="Capa do usuário"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 -z-20 opacity-50"
        onClick={() => setIsModalCapaOpen(true)}
        priority 
      />
      {isModalCapaOpen && (
        <ModalUpdateCapaImage
          userId={user.id}
          isOpen={isModalCapaOpen}
          onClose={() => setIsModalCapaOpen(false)}
        />
      )}

      {children}
    </div>
  );
}