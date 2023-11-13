import React, { useState } from 'react';
import Modal from '../Components/Modal';

const AlertComponent = ({ alertMessage, cnfBttonText, onConfirm, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeAlert = () => {
    console.log("cancel ",isModalOpen);
    onCancel();
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("confirm ");
    setIsModalOpen(false);
    onConfirm();
  };

  const messageToDisplay = alertMessage || "Are you sure you want to delete?";
  const subMessageToDisplay = "Once clicked on below option can't be changed";
  const buttonTextToDisplay = cnfBttonText || "Delete";
  const buttonColorClass = cnfBttonText === "Approve" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";


  return (
    <Modal setShowModal={setIsModalOpen}>
        <div className="bg-white p-12 rounded-lg shadow-md w-[500px]">
          <p className="text-lg font-semibold mb-2">{messageToDisplay}</p>
          <p className="text-sm text-gray-500 mb-4">{subMessageToDisplay}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleConfirm}
              className={`${buttonColorClass} text-white px-8 py-3 rounded transition duration-300`}
              >
              {buttonTextToDisplay}
            </button>
            <button
              onClick={closeAlert}
              className="border border-black text-black px-8 py-3 rounded hover:bg-gray-200 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
    </Modal>
  );
};

export default AlertComponent;
