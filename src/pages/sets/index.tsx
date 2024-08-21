import ItemCard from "@/components/itemCard";
import QuickView from "@/components/quickView";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { fetchSets } from "@/api/item-set-api";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["sets"],
    queryFn: fetchSets,
  });

  return {
    props: {
      // TODO: do not set sets here, rather implement a custom hook to get data in the component
      // sets: queryClient.getQueriesData({ queryKey: ["sets"] }),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

const ItemsSets = () => {
  console.log("Inside ItemsSets");
  const [itemName, setItemName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showQuickViewForItem = (name: string) => {
    setIsModalVisible(true);
    setItemName(name);
  }

  const hideQuickView = () => {
    setIsModalVisible(false);
  }

  // TODO: please use staleTime for updated data or recovery on failure

  const {data: itemsSets} = useQuery({
    queryKey: ["sets"],
    queryFn: fetchSets
  });
  
  const memoizedItems = useMemo(() => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 list-none">
        {itemsSets?.map((itemSet: Set) => (
          <li key={itemSet.id} className="mb-2 flex">
            <Link href={`/sets/${itemSet.id}`} className="text-blue-500 hover:underline">
              <ItemCard itemSet={itemSet} showQuickViewForItem={showQuickViewForItem} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }, [itemsSets]);
  const memoizedQuickView = useMemo(() => {
    return <QuickView itemName={itemName} hideQuickView={hideQuickView} isModalVisible={isModalVisible} />
  }, [isModalVisible]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sets List</h1>
      {itemsSets && memoizedItems}
      {isModalVisible && memoizedQuickView}
    </div>
  );
};

export default ItemsSets;
