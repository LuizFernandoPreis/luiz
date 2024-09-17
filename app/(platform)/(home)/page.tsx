import { isLoggedIn } from "@/lib/auth/session-user";
import { Sidebar } from "../_components/sidebar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/auth-config";


export default async function Home() {
  const isLogged = await isLoggedIn()
  const session = await getServerSession(authConfig)
    return (
      <main className="flex min-h-screen flex-col  justify-between">
        {isLogged ? <p>logado como {session?.user?.name}</p> : <></>}
      </main>
    );
  }
  