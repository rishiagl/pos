import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import CustomerModal from "./modals/customer-modal";
import { getCustomer } from "../external/Customer";
import { useAuth0 } from "@auth0/auth0-react";
import profilepic from "../assets/user-profile.jpg"

export type CustomerType = {
  name?: string;
  phone_no?: string;
  address?: string;
  state?: string;
  pincode?: string;
};

interface Props {
  customer: CustomerType;
  setCustomer: (customer: CustomerType) => void;
}

export default function Customer(props: Props) {
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    const getCustomers = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getCustomer(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setCustomers(data);
      }

      if (error) {
        console.log("External API not working");
      }
    };

    getCustomers();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, showCustomerModal]);

  function PropToSelectList(customers: CustomerType[]) {
    return customers.map((opt: CustomerType) => ({
      label: opt!.phone_no,
      value: opt,
    }));
  }

  return (
    <Fragment>
      <CustomerModal
        show={showCustomerModal}
        setShow={setShowCustomerModal}
      ></CustomerModal>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between mb-2">
          <h4>Customer</h4>
          <button
            className="py-0.5 px-2 rounded text-white bg-main"
            onClick={() => setShowCustomerModal(true)}
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
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        </div>

        <Select
          options={PropToSelectList(customers)}
          onChange={(opt) => props.setCustomer(opt!.value)}
          className="rounded m-1"
        />

        <div className="flex justify-center m-2 w-full">
          <img
            className="w-40 h-40 rounded-full"
            src={profilepic}
            alt="Rounded avatar"
          ></img>
        </div>
        <div className="flex flex-col justify-between bg-slate-100 rounded p-2 font-semibold m-1">
          <div className="flex flex-row w-full pb-1">
            <div className="w-1/5">Name</div>
            <div className="w-4/5">: {props.customer.name}
            </div>
          </div>
          <div className="flex flex-row w-full pb-1">
            <div className="w-1/5">Phone No</div>
            <div className="w-4/5">: {props.customer.phone_no}
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="w-1/5">Address</div>
            <div className="w-4/5 text-ellipsis overflow-hidden">: {props.customer.address}, {props.customer.state} - {props.customer.pincode}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
