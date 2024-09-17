import { isLoggedIn } from '@/lib/auth/session-user'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from './_components/footer'
import { Unauthenticated } from './_components/unauthenticated'

export const metadata: Metadata = { title: 'Autenticação' }

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const isLogged = await isLoggedIn()

  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center bg-alternate/30">
        <div className="m-4 flex w-full max-w-md flex-col gap-y-4 rounded-xl bg-white p-8 shadow">
          {isLogged ? <Unauthenticated /> : children}
        </div>
      </main>
      <Footer />
    </>
  )
}
