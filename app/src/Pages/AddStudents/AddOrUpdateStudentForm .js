import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "./AddStudentForm.css";
import { addStudentToDatabase,updateStudentInDatabase, getStudentDatabase, getStudentFromDatabase } from "../../api/student";

const AddOrUpdateStudentForm  = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId, 
  handleSubjectAdded,
  handleSubjectUpdated,
}) => {
  const [studentData, setStudentData] = useState({
    Attendance_percent:"",
    Attended:"",
    Class:"",
    ClassId:"",
    Division:"",
    Name:"",
    RollNo:"",
    // TotalClasses:"",
    // absent:"",
    // password:"",
    subjects: [],
  });

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch subject data from Firebase when the modal is opened for update
      getStudentData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getStudentData = async (DocId) => {
    try {
      const subject = await getStudentFromDatabase(DocId);

      if (subject) {
        setStudentData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateStudentInDatabase(DocId, studentData);


      setConfirmationMessage(response.message);

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
      !studentData.Class ||
      !studentData.ClassId ||
      !studentData.Attended
    ) {
      setError(true);
    } else {

      try {
        const response = await addStudentToDatabase(studentData);

          setStudentData({
          Attendance_percent: "",
          Attended: "",
          Class: "",
          ClassId: "",
          Division: "",
          Name: "",
          RollNo: "",
          TotalClasses: "",
          absent: "",
          password: "",
          subjects: [],
        });


        // Show a confirmation message
        if (response.status) {
          setConfirmationMessage(response.message);
        }

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
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </span>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isUpdateOn ? "Update Subject" : "Add Subject"}
      </h2>

      <form>
        {Object.entries(studentData).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key.replace(/_/g, ' ')} {/* Format key to display as label */}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        ))}
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

export default AddOrUpdateStudentForm ;
