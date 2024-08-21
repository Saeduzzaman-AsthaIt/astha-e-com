import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

interface CartState {
    cartItems: Set[],
    addToCart: (item: Set) => void,
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
            addToCart: (item: Set) => set((state: any) => ({
                cartItems: [...state.cartItems, item]
            })),
            removeFromCart: (id: string) => set((state: any) => ({
                cartItems: state.cartItems.filter((item: Set) => item.id !== id)
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