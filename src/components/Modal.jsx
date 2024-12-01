import React, { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef(({ title, message, buttons = [] }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 w-full h-full inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-4 py-2 rounded ${
                button.color || "bg-blue-500"
              } text-white hover:opacity-90`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Modal;
