import React, { useState } from "react";
import AddButton from "../../Components/AddButton";
import AddStudentForm from "./AddStudentApplicationForm";
import "../../Pages/AddStudents/AddStudent.css";

import {
  addStudentByApplicationToDatabase,
} from "../../api/StudentMaster/AddStudentByApplication";

const AddStudentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentAdded, setstudentAdded] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleSubjectAdded = () => {
    setstudentAdded(true);
    setTimeout(() => {
      setstudentAdded(false);
      setDataChanged(true);
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div className="mt-4 w-full flex items-center justify-center">
      <div className="mt-5 max-w-full">
        <p className="h-16 text-center font-bold text-white flex items-center justify-center">
          <AddButton buttonText={"Add subject"} onClickButton={openModal} />
        </p>
      </div>
      <AddStudentForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
        DocId={docId}
      />
      {studentAdded && (
        <div className="text-green-500 text-center mt-2">
          Subject has been successfully added!
        </div>
      )}
    </div>
  );
};

export default AddStudentPage;
