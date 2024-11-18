import ProfileInfo from "./_components/profileInfo";
import ProfileCurso from "./_components/profileCurso";
import { action } from "@/actions";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth-config";
import HeroSection from "./_components/perfilHero";

export default async function Perfil() {
  const session = await getServerSession(authConfig);
  const user = await action
    .usuario()
    .find({ where: { id: session?.user?.id } });

  return (
    <div className="min-h-screen flex flex-col">
      {user.data ? (
        <>
          <HeroSection user={user.data}>
            <ProfileInfo user={user.data} />
          </HeroSection>
          <ProfileCurso />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
