import { useRouter } from "next/router";

const ItemInSet = () => {
    const {query} = useRouter();
    const {itemId} = query;
    return (
        <div>This is Item (Component) of the SET {itemId}</div>
    )
}

export default ItemInSet;