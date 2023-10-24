import React, { useState } from "react";
import AddSubjectData from "../../Database/AddTeacher";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddTeacher.css";
import AddSubjectForm from "./AddTeacherForm";

const AddTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectAdded, setSubjectAdded] = useState(false);

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
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
      <AddSubjectForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
      />
      {subjectAdded && (
        <div className="text-green-500 text-center mt-2">
          Subject has been successfully added!
        </div>
      )}
    </div>
  );
};

export default AddTeacher;
