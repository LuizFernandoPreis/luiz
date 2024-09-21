import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./(platform)/_components/header";
import { cn } from "@/lib/utlis";
import { twCenMT } from "@/lib/meta/fonts";
import { authConfig } from "@/lib/auth/auth-config";
import { getServerSession } from "next-auth";
import { AuthProvider } from "./contexts/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mercury Surge",
  description: "Sistema Web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <AuthProvider session={session}>
      <html lang="pt">
        <body
          className={cn(
            "flex h-full min-h-screen flex-col bg-white text-primary",
            twCenMT.className
          )}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
