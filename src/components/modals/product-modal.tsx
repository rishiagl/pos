import { Fragment, useEffect, useRef, useState } from "react";
import { ProductType } from "../Product";
import Select from "react-select";
import { getProduct } from "../../external/Product";
import { useAuth0 } from "@auth0/auth0-react";
import { ItemType } from "../../pages/home-page";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  itemList: ItemType[];
  setitemList: (ItemTypeList: ItemType[]) => void;
};

export function AddProductModal(props: Props) {
  const [product, setProduct] = useState<ProductType>();
  const [description, setDescription] = useState<string>();
  const [qty, setQty] = useState<number>();
  const [rate, setRate] = useState<number>();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);

  const cancelButtonRef = useRef(null);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProduct(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setAllProducts(data);
      }

      if (error) {
        console.log("External API not working");
      }
    };

    getProducts();
    setProduct(undefined);
    setQty(undefined);
    setRate(undefined);
    setDescription(undefined);

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, props.show]);

  const handleClose = () => props.setShow(false);

  function HandleSubmit() {
    if (
      product != undefined &&
      qty != undefined &&
      qty > 0 &&
      rate != undefined &&
      rate > 0
    ) {
      props.setitemList([
        ...props.itemList,
        {
          product: product,
          description: description || "",
          qty: qty,
          rate: rate,
        },
      ]);
      
      handleClose();
    }
  }

  function onProductSelect(product: ProductType) {
    setProduct(product);
  }
  function PropToSelectList(products: ProductType[]) {
    return products.map((opt: ProductType) => ({
      label: opt!.name,
      value: opt,
    }));
  }

  return (
    <>
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex flex-col bg-slate-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="m-2">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        Add Product
                      </Dialog.Title>
                    </div>
                    <div className="m-2">
                      {/* <form> */}
                        <div className="flex flex-col mt-2">
                          <Select
                            options={PropToSelectList(allProducts)}
                            onChange={(opt) => onProductSelect(opt!.value)}
                            className="rounded border"
                          />{" "}
                          &nbsp;
                          <div className="flex flex-row mb-2">
                            <div className="w-1/3">ID:</div>
                            <div className="w-2/3">{product?.id}</div>
                          </div>
                          <div className="flex flex-row mb-2">
                            <div className="w-1/3">Name:</div>
                            <div className="w-2/3">{product?.name}</div>
                          </div>
                          <div className="flex flex-row mb-2">
                            <div className="w-1/3">HSN:</div>
                            <div className="w-2/3">{product?.hsn}</div>
                          </div>
                          <div className="flex flex-row mb-2">
                            <div className="w-1/3">Tax Rate:</div>
                            <div className="w-2/3">{product?.tax_rate}</div>
                          </div>
                        </div>
                        <div className="flex flex-row mb-2">
                          <label className="form-label w-1/3">Description:</label>
                          <input
                            className="form-control w-2/3 rounded-lg border p-1"
                            type="text"
                            id="description"
                            value={description}
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
                            required
                          ></input>
                        </div>
                        <div className="flex flex-row mb-2">
                          <label className="form-label w-1/3">Qty:</label>
                          <input
                            className="form-control w-2/3 rounded-lg border p-1"
                            type="number"
                            id="qty"
                            value={qty}
                            onChange={(event) =>
                              setQty(parseInt(event.target.value))
                            }
                            required
                          ></input>
                        </div>
                        <div className="flex flex-row mb-2">
                          <label className="form-label w-1/3">Rate:</label>
                          <input
                            className="form-control w-2/3 rounded-lg border p-1"
                            type="number"
                            id="rate"
                            value={rate}
                            onChange={(event) =>
                              setRate(parseInt(event.target.value))
                            }
                            required
                          ></input>
                        </div>
                        <div className="flex flex-row justify-between mt-8">
                        <button
                          type="button"
                          className="bg-slate-200 rounded-lg px-4 py-2"
                          onClick={() => {
                            props.setShow(false);
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-main text-white rounded-lg px-4 py-2"
                          onClick={() => HandleSubmit()}
                        >
                          Submit
                        </button>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
