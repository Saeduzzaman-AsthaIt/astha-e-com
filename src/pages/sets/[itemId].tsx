import fetchSetByName, { updateSetItem, fetchUpdatedSetByName } from "@/api/item-set-api";
import { useItemSet } from "@/hooks/useItemSet";
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import Custom404 from "../404";

// {
//     queryKey: ["item", itemId],
//     queryFn: () => fetSetById(itemId),
//     initialData: dehydratedState?.queries[0]?.state.data,
//     enabled: !!itemId
// }

const ItemInSet = ({ itemId: itemName, dehydratedState }: { itemId: string, dehydratedState: any}) => {
    const queryClient = useQueryClient();
    console.log("Inside ItemInSet --- ");
    console.log(itemName ? itemName : "undefined item id");
    const initialData = dehydratedState?.queries.find((query: any) => query.queryKey[1] === itemName)?.state.data;
    
    // Fetch from PokemonTCG
    const {data: itemSet, error, isLoading} = useItemSet(itemName, initialData);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [existingName, setExistingName] = useState(itemSet?.name);

    // Fetch updated item
    const {data: updatedItemSet, error: errorOnUpdatedItem, isLoading: isLoadingOnUpdatedItem} = useQuery({
        queryKey: ["updatedItem", itemSet?.id],
        queryFn: () => fetchUpdatedSetByName(itemSet?.id || ""),
        enabled: !!existingName,
        staleTime: 0
    });
    
    const [editedName, setEditedName] = useState(updatedItemSet?.updatedName || itemSet?.name);
    // const [updatedName, setUpdatedName] = useState(editedName);
    const [inputError, setInputError] = useState("");

    useEffect(() => {
        if(updatedItemSet?.updatedName) {
            setEditedName(updatedItemSet?.updatedName);
        }
    }, [itemSet, updatedItemSet]);

    const mutation = useMutation({
        mutationFn: ({itemName, itemSetToBeUpdated}: {itemName: string, itemSetToBeUpdated: any}) => updateSetItem(itemName, itemSetToBeUpdated),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["updatedItem", itemSet?.id]
            });
            setIsModalVisible(false);
        }
    });

    if(!itemSet) {
        console.log("Inside ItemInSet --- no itemset");
        return <Custom404 />; // Show 404 page when itemSet is not found
    }

    // The followings are not necessary
    if (isLoading) return <div>Loading post...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const onEditButtonClick = () => {
        setIsModalVisible(true);
    }
    const onModalCancel = () => {
        setIsModalVisible(false);
        setEditedName(itemSet?.name);
        setInputError("");
    }

    const validateInput = () => {
        let errorMessage = "";
        if(!editedName) {
            errorMessage = "Rquired";
        }
        if(existingName === editedName) {
            errorMessage = "Unchanged";
        }
        
        if(errorMessage) {
            setInputError(errorMessage);
            return false;
        }

        return true;
    }

    const onUpdateButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if(!validateInput()) { return; }
        setInputError("");
        // mutation.mutate({itemName: "Legendary Collection", itemSetToBeUpdated: {name: editedName}});
        // mutation.mutate({itemName: editedName || "", itemSetToBeUpdated: {name: editedName}});
        // mutation.mutate({itemName: existingName || "", itemSetToBeUpdated: {name: editedName}});
        mutation.mutate({itemName: itemSet.id, itemSetToBeUpdated: {updatedName: editedName}});
    }

    let newName = updatedItemSet?.updatedName || itemSet?.name;

    const {
        id,
        images,
        legalities,
        name,
        printedTotal,
        ptcgoCode,
        releaseDate,
        series,
        total,
        updatedAt,
    } = itemSet;

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                <img
                    src={images?.logo}
                    alt={name}
                    className="rounded-lg w-full h-auto object-cover"
                />
                </div>
                <div className="w-full md:w-2/3 md:ml-6 mt-6 md:mt-0">
                    <div className="flex items-center justify-between">
                        {/* <h1 className="text-2xl font-bold text-gray-800">Name: {updatedName}</h1> */}
                        <h1 className="text-2xl font-bold text-gray-800">Name: {newName}</h1>
                        <button
                        onClick={onEditButtonClick}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                        Edit
                        </button>
                    </div>
                <p className="text-gray-600 mt-2">ID: {id}</p>
                <p className="text-gray-600 mt-2">Name: {name}</p>
                {/* <p className="text-gray-600 mt-2">Age: {age}</p> */}
                <p className="text-gray-600 mt-2">Series: {series}</p>
                <p className="text-gray-600 mt-2">Release Date: {releaseDate}</p>
                <p className="text-gray-600 mt-2">Total Printed: {printedTotal}</p>
                <p className="text-gray-600 mt-2">PTCGO Code: {ptcgoCode}</p>
                <p className="text-gray-600 mt-2">Total: {total}</p>
                <p className="text-gray-600 mt-2">Updated At: {updatedAt}</p>
        
                {/* <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Legalities</h2>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                    {legalities && Object.keys((legalities: Legalities)).map((key) => (
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
                // onOk={onUpdateButtonClick}
                footer={[
                    <Button type="primary" key="update" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {onUpdateButtonClick(e)}}>
                        Update
                    </Button>,
                    <Button type="primary" key="cancel" onClick={onModalCancel}>
                        Cancel
                    </Button>                    
                ]}
            >
                <input className="border" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                {inputError && <p className="text-red-500">{inputError}</p>}
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

        const itemSet = queryClient.getQueryData(["item", itemName]);
        
        if (!itemSet) {
            return { notFound: true }; // Trigger 404 page if no data
        }
      
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