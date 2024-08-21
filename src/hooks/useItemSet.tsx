import { useQuery } from "@tanstack/react-query"
import fetchSetById from "@/api/item-set-api"
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk"

export const useItemSet = (itemId: string, initialData?: Set) => {
    return useQuery<Set, Error>({
        queryKey: ["item", itemId],
        queryFn: () => fetchSetById(itemId),
        initialData,
        enabled: !!itemId
    })
}