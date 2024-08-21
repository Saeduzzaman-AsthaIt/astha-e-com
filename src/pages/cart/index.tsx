import useCartStore from "@/stores/cart_store";
import CartItem from "@/components/cartItem"
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

const Cart = () => {
    console.log("Inside Cart");
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const cartItems = useCartStore((state) => state.cartItems);
    return (
        <div>

            {cartItems.length === 0 ? <p>No item in Cart</p>
            :(cartItems.map((cartItem: Set) => {
                return <CartItem key={cartItem.id} cartItem={cartItem} onRemove={removeFromCart} />
            }))}
        </div>
    )
}

export default Cart;