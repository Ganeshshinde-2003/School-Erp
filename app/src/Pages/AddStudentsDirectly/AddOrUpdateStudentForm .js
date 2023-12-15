import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "./AddStudentForm.css";
import "../AddTeacher/AddTeacherForm.css";
import {
  addStudentDirectlyToDatabase,
  getStudentDataFromDd,
  updateStudentDirectlyToDatabase,
} from "../../api/StudentMaster/AddStudentDirectly";
import { getAllOptionalSubjectsName } from "../../api/ClassMaster/AddOptionalSubject";
import { getAllTransportSlabs } from "../../api/TransportMaster/AddStopAndFees";
import { getAllFeeSlab } from "../../api/FeeStructure/AddFeeSlab";
import { getAllclassNames } from "../../api/ClassMaster/AddClassAndSection";
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
    isSinglegirlchild: null,
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

const AddOrUpdateStudentForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleStudentUpdated,
}) => {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [optionalSubjectsName, setOptionalSubjectsName] = useState([]);
  const [transportOptions, setTransportOptions] = useState([]);
  const [classOptions,setClassOptions] = useState([]);
  const [feeOptions,setFeeOptions] = useState([]);
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getStudentData(DocId);
    }
    getOptionalSubjects();
    getTransportSlabs();
    getClasses();
    getFeeSlabs();
  }, [isModalOpen, isUpdateOn]);

  const getStudentData = async (DocId) => {
    try {
      const subject = await getStudentDataFromDd(DocId);

      if (subject) {
        setStudentData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const getOptionalSubjects = async () => {
    await getAllOptionalSubjectsName().then((data) => {
      setOptionalSubjectsName(data);
    });
  };

  const getTransportSlabs = async () => {
    await getAllTransportSlabs().then((data) => {
      console.log(transportOptions);
      setTransportOptions(data);
    });
  };

  const getClasses = async () => {
    await getAllclassNames().then((data) => {
      console.log(classOptions);
      setClassOptions(data);
    });
  };

  const getFeeSlabs = async () => {
    await getAllFeeSlab().then((data) => {
      console.log(feeOptions);
      setFeeOptions(data);
    });
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
      const response = await updateStudentDirectlyToDatabase(
        DocId,
        studentData
      );

      setConfirmationMessage(response.message);

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleStudentUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addStudentDirectlyToDatabase(studentData);
      setConfirmationMessage(response.message);
      setStudentData(initialStudentData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
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
                  Student I'D*
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
                  Transport Slab*
                </label>
                <select
                  name="transportSlab"
                  value={studentData.transportSlab}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  {transportOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mobile No*
                </label>
                <input
                  type="number"
                  name="mobileNo"
                  value={studentData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Add Date*
                </label>
                <input
                  type="date"
                  name="admissionDate"
                  value={studentData.admissionDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Joning Class*
                </label>
                <select
                  name="joiningClass"
                  value={studentData.joiningClass}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Fee Slab*
                </label>
                <select
                  name="feeslab"
                  value={studentData.feeslab}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  {feeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
                  <select
                    name="gender"
                    value={studentData.personalDetails.gender}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">--- Select ---</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Caste
                  </label>
                  <input
                    type="text"
                    name="cast"
                    value={studentData.personalDetails.cast}
                    onChange={handleInputChange1}
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
                    name="fatherName"
                    value={studentData.personalDetails.fatherName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother's Name*
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={studentData.personalDetails.motherName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Aadhar No*
                  </label>
                  <input
                    type="number"
                    name="aadharNo"
                    value={studentData.personalDetails.aadharNo}
                    onChange={handleInputChange1}
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
                    name="bloodGroup"
                    value={studentData.personalDetails.bloodGroup}
                    onChange={handleInputChange1}
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
                    name="guardianName"
                    value={studentData.personalDetails.guardianName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Guardian No.*
                  </label>
                  <input
                    type="number"
                    name="guardianNo"
                    value={studentData.personalDetails.guardianNo}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    TC No.
                  </label>
                  <input
                    type="number"
                    name="telephoneNo"
                    value={studentData.personalDetails.telephoneNo}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={studentData.personalDetails.dob}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Single girl child
                  </label>
                  <input
                    type="text"
                    name="isSinglegirlchild"
                    value={studentData.personalDetails.isSinglegirlchild}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Email id
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={studentData.personalDetails.emailId}
                    onChange={handleInputChange1}
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
                    name="admissonFeeStatus"
                    checked={studentData.takeAdmissionfees.admissonFeeStatus}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mode of payment*
                  </label>
                  <input
                    type="text"
                    name="modeOfPayment"
                    value={studentData.takeAdmissionfees.modeOfPayment}
                    onChange={handleInputChange2}
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
                    name="chequeNo"
                    value={studentData.takeAdmissionfees.chequeNo}
                    onChange={handleInputChange2}
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
                    type="number"
                    name="upitransactionNo"
                    value={studentData.takeAdmissionfees.upitransactionNo}
                    onChange={handleInputChange2}
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
                    type="number"
                    name="otherUniqeNo"
                    value={studentData.takeAdmissionfees.otherUniqeNo}
                    onChange={handleInputChange2}
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
                    name="homeAddress"
                    value={studentData.addressDetails.homeAddress}
                    onChange={handleInputChange3}
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
                    name="state"
                    value={studentData.addressDetails.state}
                    onChange={handleInputChange3}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father’s No.
                  </label>
                  <input
                    type="number"
                    name="fatherMobileNo"
                    value={studentData.addressDetails.fatherMobileNo}
                    onChange={handleInputChange3}
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
                    name="city"
                    value={studentData.addressDetails.city}
                    onChange={handleInputChange3}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    ZIP Code
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    value={studentData.addressDetails.zipCode}
                    onChange={handleInputChange3}
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
                    name="religion"
                    value={studentData.demography.religion}
                    onChange={handleInputChange4}
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
                    name="cast"
                    value={studentData.demography.cast}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father’s Occupation
                  </label>
                  <input
                    type="number"
                    name="fatherOccupation"
                    value={studentData.demography.fatherOccupation}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother’s Occupation
                  </label>
                  <input
                    type="number"
                    name="motherOccupation"
                    value={studentData.demography.motherOccupation}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Parents income
                  </label>
                  <input
                    type="number"
                    name="parentIncome"
                    value={studentData.demography.parentIncome}
                    onChange={handleInputChange4}
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
                    name="motherTongue"
                    value={studentData.demography.motherTongue}
                    onChange={handleInputChange4}
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
                    name="birthplace"
                    value={studentData.demography.birthplace}
                    onChange={handleInputChange4}
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
                    name="nationality"
                    value={studentData.demography.nationality}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className={activeCom === 5 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                {optionalSubjectsName?.map((subject) => (
                  <div key={subject}>
                    <label className="block text-[18px] font-medium text-[#333333]">
                      {subject}
                    </label>
                    <input
                      type="checkbox"
                      name={subject}
                      checked={studentData.optionalSubjects.includes(subject)}
                      onChange={handleInputChange5}
                      className="mt-1 p-2 w-8 h-8 block w-half "
                    />
                  </div>
                ))}
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
                    name="previousSchoolName"
                    value={studentData.studentHistory.previousSchoolName}
                    onChange={handleInputChange6}
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous school TC No.
                  </label>
                  <input
                    type="number"
                    name="PreviousschoolTCNo"
                    value={studentData.studentHistory.PreviousschoolTCNo}
                    onChange={handleInputChange6}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous class Percentage
                  </label>
                  <input
                    type="number"
                    name="previousClassPercentage"
                    value={studentData.studentHistory.previousClassPercentage}
                    onChange={handleInputChange6}
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
                    name="importantDocsTaken"
                    checked={studentData.studentHistory.importantDocsTaken}
                    onChange={handleInputChange6}
                    required
                    className="mt-1 p-2 w-8 h-8 block w-half"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStudentData(initialStudentData);
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
