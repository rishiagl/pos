import { Fragment, useEffect, useRef, useState } from "react";
import { addNewProduct } from "../../external/Product";
import { useAuth0 } from "@auth0/auth0-react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function AddNewProductModal(props: Props) {
  const [name, setName] = useState<string>();
  const [hsn, setHsn] = useState<string>();
  const [tax_rate, setTax_rate] = useState<number>();

  const cancelButtonRef = useRef(null);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    setName(undefined);
    setHsn(undefined);
    setTax_rate(undefined);
  }, [props.show]);

  const handleClose = () => props.setShow(false);

  async function HandleSubmit() {
    if (
      name != undefined &&
      hsn != undefined &&
      tax_rate != undefined &&
      tax_rate >= 0
    ) {
      const accessToken = await getAccessTokenSilently();
      await addNewProduct(accessToken, { id: 0, name, hsn, tax_rate });
      handleClose();
    }
  }

  return (
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="m-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 mb-5"
                    >
                      Add New Product
                    </Dialog.Title>
                  </div>
                  <div className="m-2">
                    <div className="flex flex-row mb-3">
                      <label className="form-label w-1/3">Name:</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control rounded border p-1 w-2/3"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      ></input>
                    </div>

                    <div className="flex flex-row mb-3">
                      <label className="form-label w-1/3">HSN:</label>
                      <input
                        className="form-control rounded border p-1 w-2/3"
                        type="text"
                        id="hsn"
                        maxLength={8}
                        value={hsn}
                        onChange={(event) => setHsn(event.target.value)}
                      ></input>
                    </div>

                    <div className="flex flex-row mb-3">
                      <label className="form-label w-1/3">Tax Rate:</label>
                      <input
                        className="form-control rounded border p-1 w-2/3"
                        type="number"
                        id="tax_rate"
                        value={tax_rate}
                        onChange={(event) =>
                          setTax_rate(parseInt(event.target.value))
                        }
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
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
