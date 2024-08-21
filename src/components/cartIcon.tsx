import useCartStore from "@/stores/cart_store";
import Link from "next/link"

const CartIcon = () => {
  const cartItemCount = useCartStore((state) => state.cartItems.length);
  return (
      <div className="relative inline-block">
            {/* Cart Icon */}
        <Link href="/cart" className="text-white text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {cartItemCount}
        </span>
      </div>
  );
}

export default CartIcon;