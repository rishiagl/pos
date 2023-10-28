import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClickNegative: () => void;
  onClickPositive: () => void;
  tittle: string;
  description: string;
};
export default function ActionDialog(props: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex flex-col bg-slate-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="m-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {props.tittle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {props.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between m-4">
                  <button
                    type="button"
                    className="bg-slate-200 rounded-lg px-4 py-2"
                    onClick={() => {
                      props.setOpen(false);
                      props.onClickNegative();
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-main text-white rounded-lg px-4 py-2"
                    onClick={() => props.onClickPositive()}
                  >
                    Proceed
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
