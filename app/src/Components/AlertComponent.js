import React, { useState } from 'react';

const AlertComponent = ({ onConfirm, onCancel }) => {

  const closeAlert = () => {
    console.log("cancle ");
    onCancel();
  };

  const handleConfirm = () => {
    console.log("cnf ");
    onConfirm();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-12 rounded shadow-md">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
        <div className="flex space-x-4">
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={closeAlert}
            className="border border-black text-black px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
