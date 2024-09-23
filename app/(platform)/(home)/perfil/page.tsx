import Image from "next/image";
import ProfileInfo from "./_components/profileInfo";
import ProfileCurso from "./_components/profileCurso";

export default function Perfil() {
  return (
    <div className="min-h-screen flex mt-8 flex-col">
      <ProfileInfo />
      <ProfileCurso />
    </div>
  );
}
