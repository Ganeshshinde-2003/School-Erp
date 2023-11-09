import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import { addTeacherToDatabase,  updateTeacherInDatabase, getTeacherDataFromDd } from "../../api/TeacherMaster/AddTeacher";

import "./AddTeacherForm.css";

const AddOrUpdateTeacherForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleTeacherAdded,
  handleTeacherUpdated,
}) => {
   const inticalteacherData = {
    teacherId: "",
    designation: "",
    emailId: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    classTeacher: "",
    transportSlab: "",

    personalDetailsData: {
        dob: new Date(),
        fatherName: "",
        motherName: "",
        spouseName: "",
        sex: "",
        cast: "",
        castCategory: "",
        bloodGroup: "",
    },

    addressDetailsData: {
        address: "",
        city: "",
        zipCode: "",
        state: "",
        homeTelephoneNo: "",
    },

    salaryDetailsData: {
        basic: "",
        acNo: "",
        lic: "",
        loan: "",
        pfApplied: "",
        pfNo: "",
        previousYearSalary: "",
        salaryAmount: "",
    },

    experienceDetailsData: {
        completionYear: "",
        joiningDate: new Date(),
        serviceInYears: "",
        confirmationDate: new Date(),
        experienceSummary: "",
        oldPFNo: "",
        previousJob: "",
        dateOfLeaving: new Date(),
        dateOfConfirmation: new Date(),
        lastJobSalary: "",
        reasonForLeaving: "",
    },
};


  const [teacherData, setTeacherData] = useState(inticalteacherData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch teacher data from Firebase when the modal is opened for update
      getTeacherData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getTeacherData = async (DocId) => {
    try {
      const teacher = await getTeacherDataFromDd(DocId);

      if (teacher) {
        setTeacherData(teacher);
      }
    } catch (error) {
      console.error("Error fetching teacher data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTeacherInDatabase(DocId, teacherData);

      setConfirmationMessage(response.message);

      setTeacherData({
        teacherName: "",
        teacherId: "",
        teacherSubject: "",
      });

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleTeacherUpdated();
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error("Error updating teacher data", error);
    }
  };

  const handleAdd = async () => {
    if (!teacherData.teacherName || !teacherData.teacherId || !teacherData.teacherSubject) {
      setError(true);
    } else {
      try {
        const response = await addTeacherToDatabase(teacherData);

        setTeacherData({
          teacherName: "",
          teacherId: "",
          teacherSubject: "",
        });

        // Show a confirmation message
        setConfirmationMessage(response.message);
      } catch (error) {
        console.error("Error adding teacher data", error);
      }
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleTeacherAdded();
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

      <span
        className="close absolute top-0 right-0 m-2 text-gray-600 cursor-pointer"
        onClick={() => {
          setTeacherData({
            teacherName: "",
            teacherId: "",
            teacherSubject: "",
          });
          setIsModalOpen(false);
        }}
      >
        &times;
      </span>
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isUpdateOn ? "Update Teacher" : "Add Teacher"}
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Teacher Name
          </label>
          <input
            type="text"
            name="teacherName"
            value={teacherData.teacherName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Teacher ID
          </label>
          <input
            type="text"
            name="teacherId"
            value={teacherData.teacherId}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Teacher Subject
          </label>
          <input
            type="text"
            name="teacherSubject"
            value={teacherData.teacherSubject}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="add-teacher-btn">
          <button
            type="button"
            onClick={isUpdateOn ? handleUpdate : handleAdd}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isUpdateOn ? "Update Teacher" : "Add Teacher"}
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

export default AddOrUpdateTeacherForm;
