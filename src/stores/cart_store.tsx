import create from "zustand";
import { ItemSet } from "@/models/models";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

interface CartState {
    cartItems: ItemSet[],
    addToCart: (item: ItemSet) => void,
    removeFromCart: (id: string) => void,
    cartItemCount: () => void
}

type CartPersist = (
    config: (set: any, get: any) => CartState,
    options: PersistOptions<CartState>
) => (set: any, get: any, api: any) => CartState

const useCartStore = create<CartState>(
    (persist as CartPersist)(
        (set, get) => ({
            cartItems: [],
            addToCart: (item: ItemSet) => set((state: any) => ({
                cartItems: [...state.cartItems, item]
            })),
            removeFromCart: (id: string) => set((state: any) => ({
                cartItems: state.cartItems.filter((item: ItemSet) => item._id !== id)
            })),
            cartItemCount: () => get().cartItems.length
        }),
        {
            name: "cart-store",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useCartStore;