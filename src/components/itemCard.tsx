import Image from 'next/image';
import { QueryClient } from '@tanstack/react-query';
import { Set } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export default function ItemCard({itemSet, showQuickViewForItem}: {itemSet: Set, showQuickViewForItem: (name: string) => void}) {
  console.log(`Rony Sarker - ${itemSet.id}`);

  const onQuickViewClick = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault();
    showQuickViewForItem(name);
  }
  return (
    <div className="flex flex-col h-full min-h-[300px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="p-4 flex-grow">
        {/* Product Image */}
        <div className="relative w-full h-48 mb-4">
          <Image
            src={itemSet.images.logo} // Replace with your product image path
            alt="Product Image"
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg"
          />
        </div>

        {/* Product Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {itemSet.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.491 9.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
          </svg>
          <span className="ml-2 text-gray-600">Total</span>
          <span className="ml-1 text-gray-500">({itemSet.total})</span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mb-4">{itemSet.releaseDate}</p>

        {/* Free Delivery */}
        {itemSet.legalities?.unlimited?.toLowerCase() === "legal" ? <p className="text-sm text-green-600 mb-2">Legal</p>
        : <p className="text-sm text-red-600 mb-2">Illegal</p>}

        {/* Product Details */}
        <ul className="text-sm text-gray-600 mb-4">
          <li>ID: {itemSet.id}</li>
          <li>Series: {itemSet.series}</li>
          <li>Updated On: {itemSet.updatedAt}</li>
        </ul>

        {/* Add to Cart Button */}
        <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300" onClick={(e: React.MouseEvent<HTMLButtonElement>) => onQuickViewClick(e, itemSet.id)}>
          Quick View
        </button>
      </div>
    </div>
  );
}
