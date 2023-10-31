import { Fragment, useState } from "react";
import { AddProductModal } from "./modals/product-modal";
import { ItemType } from "../pages/home-page";
import AddNewProductModal from "./modals/new-product-modal";

export type ProductType = {
  id: number;
  name: string;
  hsn: string;
  tax_rate: number;
};

type Props = {
  itemList: ItemType[];
  setitemList: (itemList: ItemType[]) => void;
};

export default function Product(props: Props) {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddNewProductModal, setShowAddNewProductModal] = useState(false);

  return (
    <Fragment>
      <AddNewProductModal
        show={showAddNewProductModal}
        setShow={setShowAddNewProductModal}
      ></AddNewProductModal>
      <AddProductModal
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        itemList={props.itemList}
        setitemList={props.setitemList}
      ></AddProductModal>
      <div className="flex flex-col justify-between w-full h-full">
        <div>
          {/* Header */}
          <div className="flex justify-between mb-2">
            <h4>Products</h4>
            <button
              className="py-0.5 px-2 rounded text-white bg-main"
              onClick={() => setShowAddNewProductModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:overflow-y-auto space-y-2 m-1">
            {props.itemList.map((ItemType) => (
              <div className="flex pt-2 pl-2 pr-2 w-full justify-between rounded-lg bg-slate-100">
                <div className="w-7/12">
                  <p className="truncate">
                    <span className="font-semibold">Name: </span>
                    {ItemType.product.name}
                  </p>
                  <p className="truncate">
                    <span className="font-semibold">Description: </span>
                    {ItemType.description}
                  </p>
                </div>
                <div className="w-4/12">
                  <span className="font-semibold truncate">
                    {ItemType.qty} * {ItemType.rate}
                  </span>
                </div>
                <div className="w-1/12">
                  <button
                    className="py-0.5 px-1"
                    onClick={() => {
                      props.setitemList(
                        props.itemList.filter(
                          (p) => p.product !== ItemType.product
                        )
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-red-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="pl-5 mt-2 py-2 pr-4 py-1 bg-main rounded-lg text-white"
            onClick={() => setShowAddProductModal(true)}
          >
            Add To Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mx-1 w-6 h-6 inline"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
