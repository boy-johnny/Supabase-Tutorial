import Link from "next/link"


export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-neutral-800 text-neutral-200 h-12 px-8">
        <Link href={"/posts"} className="text-white text-2xl font-bold">Posts</Link>
        <div className="flex items-center gap-4">
          <Link href={"/login"} className="text-white hover:text-gray-300">Login</Link>
          <Link href={"/signup"} className="text-white hover:text-gray-300">Signup</Link>
        </div>
      </nav>
    )
}