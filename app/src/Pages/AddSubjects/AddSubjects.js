import React, { useState } from "react";
import AddSubjectData from "../../Database/AddSubjects";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import Modal from "../../Components/AddSubject_Modal"; // Import the Modal component
import "./AddSubject.css";

const AddSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectAdded, setSubjectAdded] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubjectAdded = () => {
    setSubjectAdded(true);
    setTimeout(() => {
      setSubjectAdded(false);
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div className="mt-4 w-full">
      <div className="mt-5 max-w-full">
        <div className="flex justify-around">
          <div className="add-optional-sub-table">
            <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
              Add Subjects
            </h1>
            <DynamicTable data={AddSubjectData} rowHeight={100} action={true} />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
              <AddButton buttonText={"Add subject"} onClickButton={openModal} />
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubjectAdded={handleSubjectAdded} />
      {subjectAdded && (
        <div className="text-green-500 text-center mt-2">Subject has been successfully added!</div>
      )}
    </div>
  );
};

export default AddSubject;
