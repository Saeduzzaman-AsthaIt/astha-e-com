import ItemCard from "@/components/itemCard";
import QuickView from "@/components/quickView";
import { ItemSet } from "@/models/models";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useItemSet } from "@/hooks/useItemSet";
import { fetchSets } from "@/api/item-set-api";

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
  const [itemName, setItemName] = useState("");

  const onQuickViewClick = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    setItemName(name);
  }

  // TODO: please use staleTime for updated data or recovery on failure

  const {data: itemsSets} = useQuery({
    queryKey: ["sets"],
    queryFn: fetchSets
  });
  
  const memoizedItems = useMemo(() => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 list-none">
        {itemsSets?.map((itemSet: ItemSet) => (
          <li key={itemSet._id} className="mb-2 flex">
            <Link href={`/sets/${itemSet.name}`} className="text-blue-500 hover:underline">
              <ItemCard itemSet={itemSet} onQuickViewClick={onQuickViewClick} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }, [itemsSets]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sets List</h1>
      {itemsSets && memoizedItems}
      {itemName && <QuickView itemName={itemName} />}
    </div>
  );
};

export default ItemsSets;
