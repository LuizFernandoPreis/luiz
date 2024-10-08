import { dashboardRoute } from "@/lib/routes";
import Link from "next/link";
import { Menu } from "./menu";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth-config";
import { isAdmin, isLoggedIn } from "@/lib/auth/session-user";

export const Header = async () => {
  const session = await getServerSession(authConfig);
  const isloged = await isLoggedIn();

  return (
    <header className="sticky top-0 z-50 bg-mercury shadow-sm">
      <Menu>
        {isloged ? (
          <li className="group">
            <Link href="/favoritos">Favoritos</Link>
            <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
          </li>
        ) : (
          <></>
        )}

        <li className="group">
          <Link href="/cursos">Cursos</Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li>
        {session?.user?.papel == "administrador" ||
        session?.user?.papel == "J" ? (
          <li className="group">
            <Link href={"/vaga/cadastrar"}>Cadastrar Vagas</Link>
            <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
          </li>
        ) : (
          <li className="group">
            <Link href={"/empresa"}>Sou Empresa</Link>
            <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
          </li>
        )}
        <li className="group">
          <Link href="/perfil">Perfil</Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li>
      </Menu>
    </header>
  );
};
