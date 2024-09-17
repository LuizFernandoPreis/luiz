import Link from "next/link"

export const Sidebar = async () =>{
    return (
        <div className="flex min-h-screen bg-alternate w-16 ">
            <li className="group">
          <Link href="/ecommerce" target="_blank">
            E-commerce
          </Link>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
        </li>
        </div>
    )
}