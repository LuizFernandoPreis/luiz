import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./_components/header";
import { isLoggedIn } from "@/lib/auth/session-user";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogged = await isLoggedIn()
  return (
    <html lang="en">
      <body className={inter.className}>
         {isLogged ? <Header /> : <></>}
        {children}
        </body>
    </html>
  );
}
