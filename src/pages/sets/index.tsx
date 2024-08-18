import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Link from "next/link";

export interface ItemSet {
  id: number;
  name: string;
}

const fetchSets = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
};

const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["sets"],
    queryFn: fetchSets,
  });

  return {
    props: {
      sets: queryClient.getQueriesData({ queryKey: ["sets"] }),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

const ItemsSets = ({ sets }: { sets: ItemSet[] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sets List</h1>
      <ul>
        {sets.map((set) => (
          <li key={set.id} className="mb-2">
            <Link href={`/sets/${set.id}`}>
              <a className="text-blue-500 hover:underline">{set.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsSets;
