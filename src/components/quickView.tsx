import { useItemSet } from "@/hooks/useItemSet";
import { ItemSet } from "@/models/models";
import useCartStore from "@/stores/cart_store";
import { Alert, Button, Modal, Spin } from "antd";
import { useState } from "react";

const QuickView = ({itemName} : {itemName: string}) => {
  console.log("QuickView Called");
  const [isModalOpen, setIsModalOpen] = useState(!!itemName);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: itemSet, error: fetchByIdError } = useItemSet(itemName);
  
  const resetModal = () => {
    setIsModalOpen(false);
    setIsLoading(false);
    setError("");
  }

  const onModalCancel = () => {
    resetModal();
  }
  
  const addToCart = useCartStore((state) => state.addToCart);

  const onAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>, itemSet: ItemSet | null | undefined) => {
    e.preventDefault();
    resetModal();
    if(itemSet) {
        addToCart(itemSet);
    }
  }

  // useEffect(() => {
  //   if(fetchByIdError) {
  //     setIsLoading(false);
  //     setError("Failed to fetch data");
  //     console.log("Failed to fetch data by id");
  //   }
  // }, [fetchByIdError]);

  // useEffect(() => {
  //   if(itemSet) {
  //     setIsLoading(false);
  //     setItem(itemSet);
  //     console.log("Fetch data by id Success");
  //   }
  // }, [itemSet]);
  
  return (
      <>
        <Modal
          title="Item Quick View"
          open={isModalOpen}
          onCancel={onModalCancel}
          footer={
              <Button type="primary" key="" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {onAddToCartClick(e, itemSet)}}>
                Add to Cart
              </Button>
            }
        >
          {isLoading ? (
            <Spin tip="Loading..." />
          ) : error ? (
            <Alert message={error} type="error" />
          ) : itemSet ? (
            <div>
              <h3>{itemSet?._id}</h3>
              <p>{itemSet?.name}</p>
              <p>Price: ${itemSet?.series}</p>
              {/* Include more details as needed */}
            </div>
          ) : (
            <p>No product details available.</p>
          )}
        </Modal>
      </>
  );
}

export default QuickView;