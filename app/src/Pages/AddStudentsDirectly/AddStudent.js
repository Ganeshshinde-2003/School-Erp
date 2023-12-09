import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddStudent.css";
import { Oval } from "react-loader-spinner";
import AddOrUpdateStudentForm from "./AddOrUpdateStudentForm ";
import {
  studentDataTest,
  updateStudentDirectlyToDatabase,
} from "../../api/StudentMaster/AddStudentDirectly";
import {
  addNonTeachingStaffToDb,
  deleteStaffData,
  getSpecificStaffDataFromDb,
  getStaffDataFromDatabase,
  testStaffData,
  updateStaffToDatabase,
} from "../../api/StaffManagement/AddNonTeachingStaff";

const AddStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState(false);
  const [docId, setDocId] = useState(null);

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setStudentUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      const response = await documentId;
      console.log("Delete document with ID:", documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }
  };

  const openModal = async () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleStudentAdded = () => {};

  const handleStudentUpdated = () => {
    setStudentUpdate(false);
    setDataChanged(true);
  };

  return (
    <div className="mt-4 w-full flex items-center justify-center">
      <div className="mt-5 max-w-full">
        <p className="h-16 text-center font-bold text-white flex items-center justify-center">
          <AddButton buttonText={"Add Student"} onClickButton={openModal} />
        </p>
      </div>
      <AddOrUpdateStudentForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleStudentAdded={handleStudentAdded}
        handleStudentUpdated={handleStudentUpdated}
        DocId={docId}
        isUpdateOn={studentUpdate}
      />
    </div>
  );
};

export default AddStudent;
