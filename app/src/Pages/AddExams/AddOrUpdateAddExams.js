import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";

import {
  addExamToDatabase,
  getSpecificExamData,
  updateExamInDatabase,
} from "../../api/ExamAddtion/AddExam";
import { getAllOptionalSubjectsName } from "../../api/ClassMaster/AddOptionalSubject";
import { getAllclassesAndSubjects } from "../../api/ClassMaster/AddClassAndSection";

const AddOrUpdateFeeSlab = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleExamAdded,
  handleFeeSlabUpdated,
}) => {
  const initiaclData = {
    examName: "",
    totalExamMarksReduced: 0,
    classesAndSubjects: [],
    freezeDate: null,
  };
  const [examData, setExamData] = useState(initiaclData);
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [classesAndSubjectsData, setClassesAndSubjectData] = useState([]);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getExamData(DocId);
    }
    getClassesAndSubjects();
  }, [isModalOpen, isUpdateOn]);

  const getClassesAndSubjects = async () => {
    await getAllclassesAndSubjects().then((data) => {
      setClassesAndSubjectData(data);
    });
  };

  const getExamData = async (DocId) => {
    try {
      const subject = await getSpecificExamData(DocId);
      console.log(subject);
      setExamData(subject);
      console.log(examData);
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;

    if (name) {
      setExamData((prevData) => {
        const [subject, className] = name.split("-");

        const updatedSubjects = prevData.classesAndSubjects.map((classInfo) => {
          const {
            className: currentClassName,
            subjects,
            optionalSubjects,
          } = classInfo;

          if (currentClassName === className) {
            return {
              className: currentClassName,
              subjects: subjects.includes(subject)
                ? subjects.filter(
                    (selectedSubject) => selectedSubject !== subject
                  )
                : checked && !optionalSubjects.includes(subject)
                ? [...subjects, subject]
                : subjects,
              optionalSubjects: optionalSubjects.includes(subject)
                ? optionalSubjects.filter(
                    (selectedSubject) => selectedSubject !== subject
                  )
                : checked
                ? [...optionalSubjects, subject]
                : optionalSubjects,
            };
          }

          return classInfo;
        });

        const classInfo = updatedSubjects.find(
          ({ className: currentClassName, subjects, optionalSubjects }) =>
            currentClassName === className &&
            (subjects.includes(subject) || optionalSubjects.includes(subject))
        );

        if (!classInfo && checked) {
          // If the classInfo does not exist, add a new entry
          updatedSubjects.push({
            className,
            subjects: checked ? [subject] : [],
            optionalSubjects: checked ? [] : [],
          });
        }

        return {
          ...prevData,
          classesAndSubjects: updatedSubjects,
        };
      });
    } else {
      setExamData({
        ...examData,
        [name]: value,
      });
    }

    console.log(examData);
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateExamInDatabase(DocId, examData);

      setConfirmationMessage(response.message);
      setExamData(initiaclData);
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleFeeSlabUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addExamToDatabase(examData);

      setConfirmationMessage(response.message);

      setExamData(initiaclData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleExamAdded();
    }, 2000);
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
        {isUpdateOn ? "Update Exam Selection" : "Exam Selection"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <div className="select-form-container">
                <label className="block text-sm font-medium text-[#333333]">
                  Exam Name*
                </label>
                <input
                  type="text"
                  name="examName"
                  value={examData.examName}
                  onChange={handleInputChange1}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="select-form-container">
                <label className="block text-sm font-medium text-[#333333]">
                  Evaluated for*
                </label>
                <input
                  type="number"
                  name="totalExamMarksReduced"
                  value={examData.totalExamMarksReduced}
                  onChange={handleInputChange1}
                  className="mt-1 p-2 block w-[100%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="select-form-container">
                <label className="block text-sm font-medium text-[#333333]">
                  Freeze Date*
                </label>
                <input
                  type="date"
                  name="freezeDate"
                  value={examData.freezeDate}
                  onChange={handleInputChange1}
                  className="mt-1 p-2 block w-[100%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="form-first second-form">
              <div className="select-form-container">
                <div className="checkbox-container-exam">
                  <label className="block text-[17px] font-bold text-[#333333] text-center exam-label">
                    Select Classes and Subjects
                  </label>
                  {classesAndSubjectsData.map((classInfo) => (
                    <div
                      key={classInfo.className}
                      className="checbox-many-exam"
                    >
                      <label className="block text-[15px] font-bold text-[#333333]">
                        {`Class: ${classInfo.className}`}
                      </label>
                      <div className="flex gap-8">
                        {classInfo.subjects.map((subject) => (
                          <div key={subject}>
                            <label className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                name={`${subject}-${classInfo.className}`}
                                checked={examData.applicableClasses?.includes(
                                  `${subject}-${classInfo.className}`
                                )}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-4 h-4 block w-half"
                              />
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div>
                        {classInfo.optionalSubjects.map((optionalSubject) => (
                          <div key={optionalSubject}>
                            <label className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                name={`${optionalSubject}-${classInfo.className}`}
                                checked={examData.applicableClasses?.includes(
                                  `${optionalSubject}-${classInfo.className}`
                                )}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-4 h-4 block w-half"
                              />
                              {optionalSubject}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                setExamData(initiaclData);
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

export default AddOrUpdateFeeSlab;
