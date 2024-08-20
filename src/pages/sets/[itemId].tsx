import fetchSetByName, { updateSetItem } from "@/api/item-set-api";
import { useItemSet } from "@/hooks/useItemSet";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

// {
//     queryKey: ["item", itemId],
//     queryFn: () => fetSetById(itemId),
//     initialData: dehydratedState?.queries[0]?.state.data,
//     enabled: !!itemId
// }

const ItemInSet = ({ itemId: itemName, dehydratedState }: { itemId: string, dehydratedState: any}) => {
    const queryClient = new QueryClient();
    console.log("Inside ItemInSet --- ");
    console.log(itemName ? itemName : "undefined item id");
    const initialData = dehydratedState?.queries.find((query: any) => query.queryKey[1] === itemName)?.state.data;
    const {data: itemSet, error, isLoading} = useItemSet(itemName, initialData);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [existingName, setExistingName] = useState(itemSet?.name);
    const [editedName, setEditedName] = useState(itemSet?.name);

    if(!itemSet) {
        console.log("Inside ItemInSet --- no itemset");
        return <p></p>
    }

    // The followings are not necessary
    if (isLoading) return <div>Loading post...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const onEditButtonClick = () => {
        setIsModalVisible(true);
    }
    const onModalCancel = () => {
        setIsModalVisible(false);
        setEditedName(existingName);
    }
    const updateName = async () => {
        setIsModalVisible(false);
        // setExistingName(editedName);
        // TODO: update database too

        try {
            itemSet.name = editedName || "";
            updateSetItem(existingName || "", itemSet);
            await queryClient.invalidateQueries({
                queryKey: ["item", itemName]
            })
        } catch(e) {
            console.error("Failed to update item name!", e);
        }
    }

    const {
        // id,
        // images,
        // images,
        // legalities,
        // legalities,
        name,
        // printedTotal,
        // ptcgoCode,
        // releaseDate,
        // series,
        // total,
        // updatedAt,
        age,
        _id
    } = itemSet

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                {/* <img
                    src={images?.logo}
                    alt={name}
                    className="rounded-lg w-full h-auto object-cover"
                /> */}
                </div>
                <div className="w-full md:w-2/3 md:ml-6 mt-6 md:mt-0">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Name: {name}</h1>
                        <button
                        onClick={onEditButtonClick}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                        Edit
                        </button>
                    </div>
                <p className="text-gray-600 mt-2">ID: {_id}</p>
                <p className="text-gray-600 mt-2">Name: {name}</p>
                <p className="text-gray-600 mt-2">Age: {age}</p>
                {/* <p className="text-gray-600 mt-2">Series: {series}</p>
                <p className="text-gray-600 mt-2">Release Date: {releaseDate}</p>
                <p className="text-gray-600 mt-2">Total Printed: {printedTotal}</p>
                <p className="text-gray-600 mt-2">PTCGO Code: {ptcgoCode}</p>
                <p className="text-gray-600 mt-2">Total: {total}</p>
                <p className="text-gray-600 mt-2">Updated At: {updatedAt}</p> */}
        
                {/* <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Legalities</h2>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                    {Object.keys(legalities).map((key) => (
                        <li key={key}>
                        {key}: {legalities[key]}
                        </li>
                    ))}
                    </ul>
                </div> */}
                </div>
            </div>
            </div>


            <Modal
                title="Item Quick View"
                open={isModalVisible}
                onCancel={onModalCancel}
                footer={[
                    <Button type="primary" key="" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {updateName()}}>
                        Update
                    </Button>,
                    <Button type="primary" key="" onClick={onModalCancel}>
                        Cancel
                    </Button>                    
                ]}
            >
                <input className="border" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            </Modal>
        </>
    );
}

export default ItemInSet;

export const getStaticProps = async ({params}: { params: ParsedUrlQuery }) => {
    console.log("Inside getStaticProps --- ");
    console.log(params);
    try {
        const itemName = Array.isArray(params.itemId) ? params.itemId[0] : params.itemId;
        if(!itemName) {
            throw Error("Item Id missing");
        }
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery({
          queryKey: ["item", params.itemId],
          queryFn: () => fetchSetByName(itemName)
        });
      
        return {
          props: {
            // itemSet: queryClient.getQueriesData({ queryKey: ["item"] }),
            itemId: itemName,
            dehydratedState: dehydrate(queryClient),
          },
          revalidate: 10 // ISR
        };
    } catch(e) {
        return {
            notFound: true
        }
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await PokemonTCG.getAllSets();
    const paths = data.slice(0, 5).map(item => ({params: {itemId: item.id}}));
    console.log("Inside getStaticPaths --- ");
    console.log(paths);
    return {
        paths,
        fallback: true
    };
}