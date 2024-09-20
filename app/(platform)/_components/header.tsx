import { dashboardRoute } from '@/lib/routes'
import Link from 'next/link'
import { Menu } from './menu'

export const Header = async () => {

  return (
    <header className="sticky top-0 z-50 bg-mercury shadow-sm">
      <Menu>
         <li className="group">
          <Link href="/categorias">Favoritos</Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li> 
        <li className="group">
          <Link href="/categorias">Cursos</Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li> 
        <li className="group">
          <Link href="/categorias">Perfil</Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li> 
      </Menu>
    </header>
  )
}
