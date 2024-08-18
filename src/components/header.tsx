import Link from "next/link";
import CartIcon from "./cartIcon";

export default function Header() {
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
          <Link href="/login" className="text-white text-lg">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
