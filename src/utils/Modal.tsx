import React from 'react';
import { createPortal } from 'react-dom';
import { usePortal } from '~/utils';

interface IModal {
  show?: boolean;
  closeModal: () => void;
}

const Portal = (props: any) => {
  const target = usePortal('modal');
  return createPortal(props.children, target as HTMLElement);
};

const Modal = ({ show = false, closeModal }: IModal) => {
  return (
    <Portal>
      {show && (
        <div className="overlay" onClick={() => closeModal()}>
          <div
            className="flex flex-col px-5 py-3 bg-white shadow-lg rounded modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-lg">Test Modal</div>
            <div>lorem ipsum</div>
            <div className="flex justify-end ">
              <button
                className="text-md border border-gray-200 tracking-wide px-5 py-2 rounded-md focus:outline-none hover:bg-gray-300 mr-2"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button className="text-md focus:outline-none text-white tracking-wide px-5 py-2 rounded-md bg-red-500 hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
