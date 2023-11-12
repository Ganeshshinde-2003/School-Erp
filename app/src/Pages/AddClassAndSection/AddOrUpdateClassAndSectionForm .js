import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addClassAndSectionsToDatabase,
  getClassAndSectionsDataFromDb,
  updateClassAndSectionsDatabase,
} from "../../api/ClassMaster/AddClassAndSection";

const AddOrUpdateClassAndSectionForm = ({
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
  };
  const [classAndSectionData, setClassAndSectionData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getSubjectData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getSubjectData = async (DocId) => {
    try {
      const subject = await getClassAndSectionsDataFromDb(DocId);

      if (subject) {
        setClassAndSectionData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassAndSectionData({
      ...classAndSectionData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateClassAndSectionsDatabase(
        DocId,
        classAndSectionData
      );

      setConfirmationMessage(response.message);

      setClassAndSectionData(inticalData);

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleSubjectUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    if (!classAndSectionData.subjectCode || !classAndSectionData.subjectName) {
      setError(true);
    } else {
      try {
        const response = await addClassAndSectionsToDatabase(
          classAndSectionData
        );
        // Show a confirmation message
        setConfirmationMessage(response.message);

        setClassAndSectionData(inticalData);
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
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {isUpdateOn ? "Update Subject" : "Add Subject"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Code
              </label>
              <input
                type="text"
                name="subjectCode"
                value={classAndSectionData.subjectCode}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Name
              </label>
              {/* <input
                type="text"
                name="subjectName"
                value={classAndSectionData.subjectName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /> */}
              <select
                type="text"
                name="subjectName"
                value={classAndSectionData.subjectName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="bus">--- Select ---</option>
                <option value="Pysics">Pysics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Maths">Maths</option>
              </select>
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Subject Total Marks
              </label>
              <input
                type="number"
                name="subjectTotalMarks"
                value={classAndSectionData.subjectTotalMarks}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setClassAndSectionData({
                  subjectTotalMarks: 100,
                  subjectName: "",
                  subjectCode: "",
                });
                setIsModalOpen(false);
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>

      {confirmationMessage && (
        <div className="text-green-500 mt-4 text-center">
          {confirmationMessage}
        </div>
      )}
    </Modal>
  );
};

export default AddOrUpdateClassAndSectionForm;


// import { getSubjectsNameFromDb } from "../../api/ClassMaster/Addsubject";

// const [subjectsName,setSubjectsName]=useState(null)
// async() => {
//   await getSubjectsNameFromDb()
//    .then((data) => {
//     setSubjectsName(data);
//     console.log("response",subjectsName);

//   })