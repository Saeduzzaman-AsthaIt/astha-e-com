import { useItemSet } from "@/hooks/useItemSet";
import useCartStore from "@/stores/cart_store";
import { Alert, Button, Modal, Spin } from "antd";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";

const QuickView = ({itemName, hideQuickView, isModalVisible: isModalOpen} : {itemName: string, isModalVisible: boolean, hideQuickView: () => void}) => {
  console.log("QuickView Called");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: itemSet, error: fetchByIdError } = useItemSet(itemName);
  
  const resetModal = () => {
    hideQuickView();
    setIsLoading(false);
    setError("");
  }

  const onModalCancel = () => {
    resetModal();
  }
  
  const addToCart = useCartStore((state) => state.addToCart);

  const onAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>, itemSet: Set | null | undefined) => {
    e.preventDefault();
    resetModal();
    if(itemSet) {
        addToCart(itemSet);
    }
  }
  
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
              <h3>{itemSet?.id}</h3>
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