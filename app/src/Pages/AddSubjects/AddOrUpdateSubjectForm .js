import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import { getSubjectDataFromDb, addSubjectToDatabase, updateSubjectInDatabase } from "../../api/ClassMaster/Addsubject";
import "./AddSubjectForm.css";

const AddOrUpdateSubjectForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleSubjectAdded,
  handleSubjectUpdated,
}) => {
  const inticalData = {
    subjectTotalMarks: 100,
    subjectName: "",
    subjectCode: "",
  }
  const [subjectData, setSubjectData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getSubjectData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getSubjectData = async (DocId) => {
    try {
      const subject = await getSubjectDataFromDb(DocId);

      if (subject) {
        setSubjectData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateSubjectInDatabase(DocId, subjectData);
      
      setConfirmationMessage(response.message);

      setSubjectData(inticalData);

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleSubjectUpdated();
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };


  const handleAdd = async () => {
    if (
      !subjectData.subjectCode ||
      !subjectData.subjectName
    ) {
      setError(true);
    } else {

      try {
        const response = await addSubjectToDatabase(subjectData);
        // Show a confirmation message
        setConfirmationMessage(response.message);

        setSubjectData(inticalData);
        

      } catch (error) {
        console.error("Error updating subject data", error);

      }
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleSubjectAdded();
      }, 2000); // Hide the message after 2 seconds
    }
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )
      }

      <span
        className="close absolute top-0 right-0 m-2 text-gray-600 cursor-pointer"
        onClick={() => {
          setSubjectData(inticalData);
          console.log("close modal");
          setIsModalOpen(false)
        }}
      >
        &times;
      </span>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isUpdateOn ? "Update Subject" : "Add Subject"}
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject Code
          </label>
          <input
            type="text"
            name="subjectCode"
            value={subjectData.subjectCode}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject Name
          </label>
          <input
            type="text"
            name="subjectName"
            value={subjectData.subjectName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
          Subject Total Marks
          </label>
          <input
            type="text"
            name="subjectTotalMarks"
            value={subjectData.subjectTotalMarks}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="add-subject-btn">
          <button
            type="button"
            onClick={isUpdateOn ? handleUpdate : handleAdd}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdateOn ? "Update Subject" : "Add Subject"}
          </button>
        </div>
      </form>

      {confirmationMessage && (
        <div className="text-green-500 mt-4 text-center">
          {confirmationMessage}
        </div>
      )}
    </Modal>
  );
};

export default AddOrUpdateSubjectForm;
