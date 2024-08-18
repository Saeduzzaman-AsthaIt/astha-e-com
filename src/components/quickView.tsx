import { ItemSet, QuickViewProps } from "@/models/models";
import useCartStore from "@/stores/cart_store";
import { Alert, Button, Modal, Spin } from "antd";

const QuickView = ({props}:{props: QuickViewProps}) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const onAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>, itemSet: ItemSet | null | undefined) => {
        props?.onItemAddedToCart(e);
        if(itemSet) {
            addToCart(itemSet);
        }
    }
    return (
        <>
          <Modal
            title="Item Quick View"
            open={props?.isModalVisible}
            onCancel={props?.onModalCancel}
            footer={
                <Button type="primary" key="" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {onAddToCartClick(e, props?.item)}}>
                  Add to Cart
                </Button>
              }
          >
            {props?.isLoading ? (
              <Spin tip="Loading..." />
            ) : props?.error ? (
              <Alert message={props?.error} type="error" />
            ) : props?.item ? (
              <div>
                <h3>{props?.item?.url}</h3>
                <p>{props?.item?.title}</p>
                <p>Price: ${props?.item?.thumbnailUrl}</p>
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