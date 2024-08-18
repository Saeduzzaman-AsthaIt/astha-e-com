import useCartStore from "@/stores/cart_store";
import { ItemSet } from "@/models/models";
import CartItem from "@/components/cartItem"

const Cart = () => {
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const cartItems = useCartStore((state) => state.cartItems);
    return (
        <div>

            {cartItems.length === 0 ? <p>No item in Cart</p>
            :(cartItems.map((cartItem: ItemSet) => {
                return <CartItem cartItem={cartItem} onRemove={removeFromCart} />
            }))}
        </div>
    )
}

export default Cart;