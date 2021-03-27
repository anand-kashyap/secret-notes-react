import React from 'react';

const RingButton = ({ disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="text-white text-md tracking-wide py-3 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-200 hover:bg-blue-700 transform transition hover:scale-105 motion-reduce:transform-none w-full self-center mt-4"
    >
      Add
    </button>
  );
};

export default RingButton;
