import React from 'react';

const Modal = ({ show = false }) => {
  return (
    <>
      {show && (
        <div className="w-full h-full absolute bg-gray-100 top-0 left-0 z-10">
          <div className="flex flex-col px-5 py-3 bg-red-200 modal">
            <div className="font-lg">Test Modal</div>
            <div>lorem ipsum</div>
            <div>
              <button>Cancel</button>
              <button>Okay</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
