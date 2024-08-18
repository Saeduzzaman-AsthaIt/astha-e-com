import ItemCard from "@/components/itemCard";
import QuickView from "@/components/quickView";
import { ItemSet, QuickViewProps } from "@/models/models";
import { dehydrate, QueryClient, useQuery, HydrationBoundary } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const fetchSets = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();
  // TODO: get new to old here
  return data.slice(0, 10);
};

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState<ItemSet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onQuickViewClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    showModal(id);
  }
  const showModal = async (id: number) => {
      setIsModalVisible(true);
      setIsLoading(true);
      setError("");

      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
          const data = await response.json();
          setItem(data);
      } catch (e) {
          setError("Failed to fetch Item");
      } finally {
          setIsLoading(false);
      }
  }

  const resetModal = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    setError("");
  }

  const onModalCancel = () => {
    resetModal();
  }

  const onItemAddedToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetModal();
  }

  const quickViewProps: QuickViewProps = {
    isModalVisible,
    item,
    isLoading,
    error,
    onModalCancel,
    onItemAddedToCart: onItemAddedToCart
  }

  const {data} = useQuery({
    queryKey: ["sets"],
    queryFn: fetchSets
  });
  
  const memoizedItems = useMemo(() => {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 list-none">
        {data?.map((itemSet: ItemSet) => (
          <li key={itemSet.id} className="mb-2 flex">
            <Link href={`/sets/${itemSet.id}`} className="text-blue-500 hover:underline">
              <ItemCard itemSet={itemSet} onQuickViewClick={onQuickViewClick} />
            </Link>
          </li>
        ))}
      </ul>
    )
  }, [data]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sets List</h1>
      {data && memoizedItems}
      {isModalVisible && <QuickView props={quickViewProps} />}
    </div>
  );
};

export default ItemsSets;
