'use client'
import { signOut } from "next-auth/react";

export default function LogoutComp() {
  return <a onClick={()=>{signOut()}}>Sair</a>;
}
