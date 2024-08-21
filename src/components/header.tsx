import Link from "next/link";
import CartIcon from "./cartIcon";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const {data: session} = useSession();
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Home Link */}
        <Link href="/" className="text-white text-lg font-bold">
          Home
        </Link>

        {/* Cart Icon and Login Link */}
        <div className="flex items-center space-x-4">
          <CartIcon />
          {/* Login Link */}
          {/* <Link href="/login" className="text-white text-lg">
            Login
          </Link> */}
          <span className="text-white text-lg">
            {session ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign in</button>}
          </span>
        </div>
      </div>
    </header>
  );
}
