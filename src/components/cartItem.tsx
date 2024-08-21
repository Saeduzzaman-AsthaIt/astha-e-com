import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

interface CartItemProps {
    cartItem: Set,
    onRemove: (id: string) => void
}

const CartItem = ({cartItem, onRemove}: CartItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm">
            <div>
                <h3 className="text-lg font-semibold">{cartItem.name}</h3>
                <p className="text-gray-600">${cartItem.id}</p>
            </div>
            <button
                onClick={() => onRemove(cartItem.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Remove
            </button>
        </div>
    )
}

export default CartItem;