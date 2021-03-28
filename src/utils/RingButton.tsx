import React from 'react';

const RingButton = ({
  disabled = false,
  label = 'Add',
  type = 'submit',
  className = 'bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-200 hover:bg-blue-700 text-white',
  ...props
}) => {
  return (
    <button
      type={type as any}
      disabled={disabled}
      className={`text-md tracking-wide py-3 rounded-md focus:outline-none transform transition hover:scale-105 motion-reduce:transform-none w-full self-center mt-4 disabled:opacity-50 disabled:scale-100 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default RingButton;
