'use client';
import ProfileInfo from "./_components/profileInfo";
import ProfileCurso from "./_components/profileCurso";
import HeroSection from "./_components/perfilHero";
import { useApp } from "../../contexts/ctxHome";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Perfil() {
  const [user, setUser] = useState<any>();
  const session = useSession();
  const { isUpdate } = useApp();

  // Fetch user data
  const fetchData = async () => {
    if (session.data?.user?.id) {
      let res = await fetch("/api/usuario?id=" + session.data.user.id);
      res = await res.json();
      setUser(res);
    }
  };

  // Call fetchData when the component is mounted
  useEffect(() => {
    fetchData();
  }, [session.data?.user?.id]);

  return (
    <div className="min-h-screen flex flex-col">
      {user?.data ? (
        <>
          <HeroSection user={user.data}>
            <ProfileInfo user={user.data} />
          </HeroSection>
          {!isUpdate ? <ProfileCurso /> : <> </>}
          
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
