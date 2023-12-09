import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import "./AddClassAndSection.css";
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
    className: "",
    noOfSections: 0,
    optionalSubjects: [],
    subjects: [],
  };
  const [classAndSectionData, setClassAndSectionData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const subjectList = [
    "English",
    "Kannada",
    "Marathi",
    "Physics",
    "Chemistry",
    "Biology",
    "Maths",
    "English",
    "Kannada",
    "Marathi",
    "Physics",
    "Chemistry",
    "Biology",
    "Maths",
  ];
  const optionalSubjectList = ["Sanskrit", "Bengal", "French", "Kashmir"];

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
  const handleInputChange1 = (e) => {
    const { name, checked } = e.target;

    setClassAndSectionData((prevStudentData) => ({
      ...prevStudentData,
      subjects: checked
        ? [...prevStudentData.subjects, name]
        : prevStudentData.subjects.filter((subject) => subject !== name),
    }));
  };
  const handleInputChange2 = (e) => {
    const { name, checked } = e.target;

    setClassAndSectionData((prevStudentData) => ({
      ...prevStudentData,
      optionalSubjects: checked
        ? [...prevStudentData.optionalSubjects, name]
        : prevStudentData.optionalSubjects.filter(
            (subject) => subject !== name
          ),
    }));
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
    if (!classAndSectionData.className || !classAndSectionData.noOfSections) {
      setError(true);
    } else {
      try {
        console.log(classAndSectionData);
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
        {isUpdateOn ? "Update Class" : "Add Class"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={classAndSectionData.className}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                No. of sections
              </label>
              <input
                type="text"
                name="noOfSections"
                value={classAndSectionData.noOfSections}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="subject-addition">
            <div className="subjects-add">
              <p>Add Subjects*</p>
              {subjectList?.map((subject) => (
                <div key={subject} className="subject-add-check">
                  <label className="block text-[15px] font-medium text-[#333333]">
                    {subject}
                  </label>
                  <input
                    type="checkbox"
                    name={subject}
                    checked={classAndSectionData.subjects.includes(subject)}
                    onChange={handleInputChange1}
                    className="mt-1 p-2 w-4 h-4 block w-half"
                  />
                </div>
              ))}
            </div>
            <div className="subjects-add">
              <p>Add Optional Subjects*</p>
              {optionalSubjectList?.map((optionalSubject) => (
                <div key={optionalSubject} className="subject-add-check">
                  <label className="block text-[15px] font-medium text-[#333333]">
                    {optionalSubject}
                  </label>
                  <input
                    type="checkbox"
                    name={optionalSubject}
                    checked={classAndSectionData.optionalSubjects.includes(
                      optionalSubject
                    )}
                    onChange={handleInputChange2}
                    className="mt-1 p-2 w-4 h-4 block w-half"
                  />
                </div>
              ))}
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
                setClassAndSectionData(inticalData);
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
