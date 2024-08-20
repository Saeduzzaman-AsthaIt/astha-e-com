import { ItemSet } from "@/models/models"
import { useQuery } from "@tanstack/react-query"
import fetchSetByName from "@/api/item-set-api"

export const useItemSet = (itemId: string, initialData?: ItemSet) => {
    return useQuery<ItemSet, Error>({
        queryKey: ["item", itemId],
        queryFn: () => fetchSetByName(itemId),
        initialData,
        enabled: !!itemId
    })
}