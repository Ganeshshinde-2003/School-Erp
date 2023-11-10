import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "./AddStudentForm.css";
import "../AddTeacher/AddTeacherForm.css";
import {
  addStudentToDatabase,
  updateStudentInDatabase,
  getStudentDatabase,
  getStudentFromDatabase,
} from "../../api/student";

const AddOrUpdateStudentForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleSubjectAdded,
  handleSubjectUpdated,
}) => {
  const [studentData, setStudentData] = useState({
    Attendance_percent: "",
    Attended: "",
    Class: "",
    ClassId: "",
    Division: "",
    Name: "",
    RollNo: "",
    // TotalClasses:"",
    // absent:"",
    // password:"",
    subjects: [],
  });

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);

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
    if (!studentData.Class || !studentData.ClassId || !studentData.Attended) {
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
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {isUpdateOn ? "Update Student" : "Add Student"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Student I'D*
                </label>
                <input
                  type="text"
                  name="teacherId"
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Transport Slab*
                </label>
                <select
                  name="transportSlab"
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mobile No*
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Add Date*
                </label>
                <input
                  type="text"
                  placeholder="(DD/MM/YYYY)"
                  name="emailId"
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Joning Class*
                </label>
                <select
                  name="classTeacher"
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  <option value="bus">Class A</option>
                  <option value="car">Class B</option>
                  <option value="bike">Class C</option>
                </select>
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Fee Slab*
                </label>
                <select
                  name="classTeacher"
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  <option value="bus">Class A</option>
                  <option value="car">Class B</option>
                  <option value="bike">Class C</option>
                </select>
              </div>
            </div>
            <div className="form-first">
              <div>
                <label
                  htmlFor="fileInput"
                  className="mt-1 p-2 w-half text-[20px] font-bold block h-[200px] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                  style={{ color: "#333333" }}
                >
                  Photo+
                </label>

                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="addTeacher-components">
            <div className="components-name">
              <div
                onClick={() => setActiveCom(1)}
                className={activeCom === 1 ? "active-component" : ""}
              >
                Personal Details*
              </div>
              <div
                onClick={() => setActiveCom(2)}
                className={activeCom === 2 ? "active-component" : ""}
              >
                Take Ad Fees*
              </div>
              <div
                onClick={() => setActiveCom(3)}
                className={activeCom === 3 ? "active-component" : ""}
              >
                Address Details*
              </div>
              <div
                onClick={() => setActiveCom(4)}
                className={activeCom === 4 ? "active-component" : ""}
              >
                Demography*
              </div>
              <div
                onClick={() => setActiveCom(5)}
                className={activeCom === 5 ? "active-component" : ""}
              >
                Optional Subjects*
              </div>
              <div
                onClick={() => setActiveCom(6)}
                className={activeCom === 6 ? "active-component" : ""}
              >
                Student History*
              </div>
            </div>
            <div className={activeCom === 1 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Gender*
                  </label>
                  <input
                    type="text"
                    name="completionYear"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Caste
                  </label>
                  <input
                    type="text"
                    name="serviceInYears"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father’s Name*
                  </label>
                  <input
                    type="text"
                    name="joiningDate"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother’s Name*
                  </label>
                  <input
                    type="text"
                    name="dateOfConfirmation"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Aadhar No*
                  </label>
                  <input
                    type="text"
                    name="experienceSummary"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="experienceSummary"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    name="oldPFNo"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Guardian No.*
                  </label>
                  <input
                    type="text"
                    name="previousJob"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    TC No.
                  </label>
                  <input
                    type="text"
                    name="dateOfLeaving"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="lastJobSalary"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Single girl child
                  </label>
                  <input
                    type="text"
                    name="reasonForLeaving"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Email id
                  </label>
                  <input
                    type="text"
                    name="reasonForLeaving"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 2 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Taken Ad Fees*
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mode of payment*
                  </label>
                  <input
                    type="text"
                    name="previousYearSalary"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] text-center font-medium text-[#333333]">
                    Cheque no. or DD no.
                    <br /> (if cheque or DD)
                  </label>
                  <input
                    type="text"
                    name="pfNo"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] text-center font-medium text-[#333333]">
                    UPI transaction No. <br />
                    (if UPI)
                  </label>
                  <input
                    type="text"
                    name="lic"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] text-center font-medium text-[#333333]">
                    Unique Number <br />
                    (of other payments)
                  </label>
                  <input
                    type="text"
                    name="loan"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 3 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Home Address
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    State
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father’s No.
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    City*
                  </label>
                  <input
                    type="text"
                    name="dob"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 4 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Religion
                  </label>
                  <input
                    type="text"
                    name="completionYear"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Caste
                  </label>
                  <input
                    type="text"
                    name="serviceInYears"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father’s Occupation
                  </label>
                  <input
                    type="text"
                    name="joiningDate"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother’s Occupation
                  </label>
                  <input
                    type="text"
                    name="dateOfConfirmation"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Parents income
                  </label>
                  <input
                    type="text"
                    name="experienceSummary"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother Tongue
                  </label>
                  <input
                    type="text"
                    name="oldPFNo"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Birth place
                  </label>
                  <input
                    type="text"
                    name="previousJob"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="dateOfLeaving"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 5 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Hindi
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Sanskrit
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    German
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    French
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 6 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous School Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous school TC No.
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous class Percentage
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Important Docs Taken
                  </label>
                  <input
                    type="checkbox"
                    name="basic"
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button onClick={isUpdateOn ? handleUpdate : handleAdd}>
              {isUpdateOn ? "Update" : "Save & Continue"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTeacherData(inticalteacherData);
                setIsModalOpen(false);
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
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

export default AddOrUpdateStudentForm;
