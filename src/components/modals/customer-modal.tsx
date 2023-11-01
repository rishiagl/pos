import { Fragment, useEffect, useRef, useState } from "react";
import { addNewCustomer } from "../../external/Customer";
import { useAuth0 } from "@auth0/auth0-react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

export default function CustomerModal(props: Props) {
  const [name, setName] = useState<string>();
  const [phone_no, setPhone_No] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [state, setState] = useState<string>();
  const [pincode, setPincode] = useState<string>();

  const cancelButtonRef = useRef(null);

  const handleClose = () => props.setShow(false);

  useEffect(() => {
    setName(undefined);
    setAddress(undefined);
    setPhone_No(undefined);
    setState(undefined);
    setPincode(undefined);
  }, [props.show]);

  const { getAccessTokenSilently } = useAuth0();

  async function HandleSubmit() {
    if (
      name != undefined &&
      phone_no != undefined &&
      address != undefined &&
      state != undefined &&
      pincode?.length == 6
    ) {
      const accessToken = await getAccessTokenSilently();
      await addNewCustomer(accessToken, {
        id: 0,
        name,
        phone_no,
        address,
        state,
        pincode,
      });
      handleClose();
    }
  }

  function PropToSelectStateList() {
    let state = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttarakhand",
      "Uttar Pradesh",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ];

    return state.map((opt: string) => ({
      label: opt,
      value: opt,
    }));
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex flex-col bg-slate-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="m-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Add New Customer
                    </Dialog.Title>
                  </div>
                  <div className="m-2">
                      <div className="flex flex-row mb-4">
                        <label className="form-label w-1/3">Phone No: </label>
                        <input
                          type="text"
                          id="phone_no"
                          className="border rounded w-2/3 p-1"
                          maxLength={10}
                          value={phone_no || ""}
                          onChange={(event) => setPhone_No(event.target.value)}
                          required
                        ></input>
                      </div>

                      <div className="flex flex-row mb-4">
                        <label className="form-label w-1/3">Name:</label>
                        <input
                          className="form-control border rounded w-2/3 p-1"
                          type="text"
                          id="name"
                          maxLength={20}
                          value={name || ""}
                          onChange={(event) => setName(event.target.value)}
                          required
                        ></input>
                      </div>

                      <div className="flex flex-row mb-4">
                        <label className="form-label w-1/3">Address:</label>
                        <input
                          className="form-control border rounded w-2/3 p-1"
                          type="text"
                          id="address"
                          maxLength={50}
                          value={address || ""}
                          onChange={(event) => setAddress(event.target.value)}
                          required
                        ></input>
                      </div>

                      <div className="flex flex-row mb-4">
                        <label className="form-label w-1/3">State:</label>
                        <Select
                          options={PropToSelectStateList()}
                          onChange={(opt) => setState(opt!.value)}
                          className="w-2/3 border rounded"
                        />
                      </div>

                      <div className="flex flex-row mb-4">
                        <label className="form-label w-1/3">pincode:</label>
                        <input
                          className="form-control border rounded w-2/3 p-1"
                          type="text"
                          id="pincode"
                          maxLength={6}
                          minLength={6}
                          value={pincode || ""}
                          onChange={(event) => setPincode(event.target.value)}
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
                  </div>
                </div>
                {/* <div className="bg-gray-50 px-4 py-3 flex flex-row justify-between sm:px-6">
                  <button
                    type="button"
                    className="bg-gray-300 rounded px-4 py-2"
                    onClick={() => {
                      props.setShow(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
