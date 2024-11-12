"use client";
import { Usuario } from "@prisma/client";
import { useState } from "react";
import ModalUpdateCapaImage from "./modalUpdateCapa";
type heroProps = {
  children: React.ReactNode;
  user: Usuario;
};
export default function HeroSection({ children, user }: heroProps) {
  const [isModalCapaOpen, setIsModalCapaOpen] = useState(false);
  return (
    <div
      className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[300px]"
      
    >
      <div className="absolute inset-0 -z-10 opacity-50" onClick={() => setIsModalCapaOpen(true)}></div>
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: `${
            user.userCapaImage
              ? `url(${user.userCapaImage})`
              : `url(/icons/capaPlaceholder.png)`
          }`,
          backgroundAttachment: "fixed",
        }}
      >
       
      </div> 
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
