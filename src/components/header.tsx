import Link from "next/link";

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
          {/* Cart Icon */}
          <Link href="/cart" className="text-white text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m4.6 8l-1.5 5m0 0h6l-1.5-5m-4.5 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
              />
            </svg>
          </Link>

          {/* Login Link */}
          <Link href="/login" className="text-white text-lg">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
