'use client'

import { cn } from '@/lib/utlis'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const Menu = ({ children: items }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between">
      <Link href="/" className="px-6 py-4">
        <Image 
          src="/icons/logosemfundo1.png"
          alt="Logo"
          width={300} // Aumentei a largura da logo
          height={0} // Manter a altura como 0 para manter a proporção
        />
      </Link>

      <ul
        className={cn(
          'flex w-full items-center justify-end gap-x-16 bg-mercury p-4 text-center uppercase max-lg:sr-only',
          !isMenuOpen && 'max-lg:sr-only',
        )}
      >
        {items}
      </ul>

      <div className="mx-4 flex gap-x-4">
        <button
          className="rounded-full p-2 *:size-6 lg:sr-only"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-black/50 lg:sr-only',
          !isMenuOpen && 'sr-only',
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={cn(
          'fixed right-px top-0 flex h-full w-full max-w-80 flex-col gap-y-8 bg-white p-4 shadow-lg lg:sr-only',
          !isMenuOpen && 'sr-only',
        )}
      >
        <div className="flex w-full justify-between">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/icons/dark-gray.png"
              alt="Logo"
              width={80} 
              height={0} 
            />
          </Link>

          <button
            className="rounded-full *:size-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <XIcon />
          </button>
        </div>

        <ul
          className="no-scrollbar flex h-full snap-y flex-col gap-y-4 overflow-y-scroll text-center uppercase *:rounded *:bg-mercury/50 *:px-8 *:py-2"
          onClick={(e) => {
            if (e.target instanceof HTMLAnchorElement) setIsMenuOpen(false)
          }}
        >
          {items}
        </ul>
      </div>
    </nav>
  )
}
