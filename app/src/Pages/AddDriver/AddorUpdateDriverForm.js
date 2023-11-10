import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addStudentDirectlyToDatabase,
  updateStudentDirectlyToDatabase,
} from "../../api/StudentMaster/AddStudentDirectly";
const initialStudentData = {
  studentId: "",
  firstName: "",
  lastName: "",
  mobileNo: null,
  transportSlab: "",
  admissionDate: null,
  joiningClass: "",
  feeslab: "",

  personalDetails: {
    gender: "",
    cast: "",
    fatherName: "",
    motherName: "",
    aadharNo: null,
    bloodGroup: "",
    guardianName: "",
    guardianNo: null,
    telephoneNo: null,
    dob: null,
    isSinglegirlchild: false,
    emailId: "",
  },

  addressDetails: {
    homeAddress: "",
    city: "",
    zipCode: "",
    state: "",
    fatherMobileNo: "",
  },

  takeAdmissionfees: {
    admissonFeeStatus: false,
    makeOfPayment: null,
    payableAmount: null,
    modeOfPayment: "",
    chequeNo: "",
    upitransactionNo: "",
    otherUniqeNo: "",
  },

  demography: {
    religion: "",
    cast: "",
    fatherOccupation: "",
    motherOccupation: "",
    parentIncome: null,
    motherTongue: "",
    birthplace: "",
    nationality: "",
  },

  studentHistory: {
    previousSchoolName: "",
    PreviousschoolTCNo: "",
    previousClassPercentage: "",
    importantDocsTaken: false,
  },

  optionalSubjects: [],
};

const AddOrUpdateDriverForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleSubjectAdded,
  handleSubjectUpdated,
}) => {
  const [studentData, setStudentData] = useState(initialStudentData);
  const subjects = ["Hindi", "Sanskrit", "German", "French"];
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);
  const [docIdforUpdateStudent, setDocIdforUpdateStudent] = useState(null);

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
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      personalDetails: {
        ...studentData.personalDetails,
        [name]: value,
      },
    });
  };
  const handleInputChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      takeAdmissionfees: {
        ...prevStudentData.takeAdmissionfees,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      addressDetails: {
        ...studentData.addressDetails,
        [name]: value,
      },
    });
  };
  const handleInputChange4 = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      demography: {
        ...studentData.demography,
        [name]: value,
      },
    });
  };
  const handleInputChange5 = (e) => {
    const { name, checked } = e.target;

    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      optionalSubjects: checked
        ? [...prevStudentData.optionalSubjects, name]
        : prevStudentData.optionalSubjects.filter(
            (subject) => subject !== name
          ),
    }));
  };
  const handleInputChange6 = (e) => {
    console;
    const { name, value, type, checked } = e.target;

    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      studentHistory: {
        ...prevStudentData.studentHistory,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
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
    try {
      let response;
      if (activeCom === 1) {
        response = await addStudentDirectlyToDatabase(studentData);
        setDocIdforUpdateStudent(response.docId);
      } else {
        response = await updateStudentDirectlyToDatabase(
          docIdforUpdateStudent,
          studentData
        );
      }

      if (activeCom > 6) {
        setStudentData(initialStudentData);
      }
      setConfirmationMessage(response.message);
      alert(response.message);
      setActiveCom(activeCom + 1);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      if (activeCom > 6) {
        setIsModalOpen(false);
        handleSubjectAdded();
      }
    }, 2000); // Hide the message after 2 seconds
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
        {isUpdateOn ? "Update Driver" : "Add Driver"}
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
                  value={studentData.firstName}
                  onChange={handleInputChange}
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
                  value={studentData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Driver I'D*
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={studentData.studentId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Allot Vehicle*
                </label>
                <select
                  name="transportSlab"
                  value={studentData.transportSlab}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Bank Account No*
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  value={studentData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
                  value={studentData.mobileNo}
                  onChange={handleInputChange}
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
                  name="admissionDate"
                  value={studentData.admissionDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Salary*
                </label>
                <input
                  type="text"
                  name="admissionDate"
                  value={studentData.admissionDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Date of Birth*
                </label>
                <input
                  type="text"
                  name="admissionDate"
                  placeholder="DD/MM/YYYY"
                  value={studentData.admissionDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
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
          <div className="addTeacher-buttons">
            <button onClick={isUpdateOn ? handleUpdate : handleAdd}>
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStudentData(inticalteacherData);
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

export default AddOrUpdateDriverForm;
