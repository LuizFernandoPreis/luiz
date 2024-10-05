import Image from "next/image";
import ProfileInfo from "./_components/profileInfo";
import ProfileCurso from "./_components/profileCurso";
import { action } from "@/actions";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth-config";

export default async function Perfil() {
  const session = await getServerSession(authConfig)
  const user = await action.usuario().find({where: {id: session?.user?.id}})
  
  return (
    <div className="min-h-screen flex mt-8 flex-col">
      {user.data ? <ProfileInfo user={user.data}/> : <></>}
      <ProfileCurso />
    </div>
  );
}
