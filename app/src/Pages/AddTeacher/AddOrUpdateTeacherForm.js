import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import {
  addTeacherToDatabase,
  updateTeacherInDatabase,
  getTeacherDataFromDd,
} from "../../api/TeacherMaster/AddTeacher";
import "./AddTeacherForm.css";
import { getAllTransportSlabs } from "../../api/TransportMaster/AddStopAndFees";

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

    personalDetails: {
      dob: "",
      fatherName: "",
      motherName: "",
      spouseName: "",
      sex: "",
      cast: "",
      castCategory: "",
      bloodGroup: "",
    },

    addressDetails: {
      address: "",
      city: "",
      zipCode: "",
      state: "",
      homeTelephoneNo: "",
    },

    salaryDetails: {
      basic: "",
      acNo: "",
      lic: "",
      loan: "",
      pfApplied: "",
      pfNo: "",
      previousYearSalary: "",
      salaryAmount: "",
    },

    experienceDetails: {
      completionYear: "",
      joiningDate: "",
      serviceInYears: "",
      confirmationDate: "",
      experienceSummary: "",
      oldPFNo: "",
      previousJob: "",
      dateOfLeaving: "",
      dateOfConfirmation: "",
      lastJobSalary: "",
      reasonForLeaving: "",
    },
    assignClasses: {
      class: "",
      subject: "",
    }
  };

  const [teacherData, setTeacherData] = useState(inticalteacherData);

  const [error, setError] = useState(false);
  const [transportOptions, setTransportOptions] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);
  const [docIdforUpdate, setDocIdforUpdate] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch teacher data from Firebase when the modal is opened for update

      getTeacherData(DocId);
    }
    getTransportSlabs();
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

  const getTransportSlabs = async () => {
    await getAllTransportSlabs().then((data) => {
      console.log(transportOptions);
      setTransportOptions(data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      personalDetails: {
        ...teacherData.personalDetails,
        [name]: value,
      },
    });
  };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      salaryDetails: {
        ...teacherData.salaryDetails,
        [name]: value,
      },
    });
  };
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      addressDetails: {
        ...teacherData.addressDetails,
        [name]: value,
      },
    });
  };
  const handleInputChange4 = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      experienceDetails: {
        ...teacherData.experienceDetails,
        [name]: value,
      },
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTeacherInDatabase(DocId, teacherData);

      setConfirmationMessage(response.message);

      setTeacherData(inticalteacherData);

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
    // console.log(teacherData);
    try {
      const response = await addTeacherToDatabase(teacherData);
      setTeacherData(inticalteacherData);
      setConfirmationMessage(response.message);
    } catch (error) {
      console.error("Error adding teacher data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleTeacherAdded();
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
        {isUpdateOn ? "Update Teacher" : "Add Teacher"}
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
                  value={teacherData.firstName}
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
                  value={teacherData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Employee I'D*
                </label>
                <input
                  type="text"
                  name="teacherId"
                  value={teacherData.teacherId}
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
                  value={teacherData.transportSlab}
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
                  value={teacherData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mail I’D*
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={teacherData.emailId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Designation*
                </label>
                <input
                  type="text"
                  name="designation"
                  value={teacherData.designation}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Class Teacher*
                </label>
                <select
                  name="classTeacher"
                  value={teacherData.classTeacher}
                  onChange={handleInputChange}
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
                Salary Details*
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
                Experience Details*
              </div>
              <div
                onClick={() => setActiveCom(5)}
                className={activeCom === 5 ? "active-component" : ""}
              >
                Assign Classes*
              </div>
            </div>
            <div className={activeCom === 1 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Father Name*
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={teacherData.personalDetails.fatherName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mother Name*
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={teacherData.personalDetails.motherName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Spouse Name*
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    value={teacherData.personalDetails.spouseName}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    DOB*
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={teacherData.personalDetails.dob}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Sex*
                  </label>
                  <select
                    name="sex"
                    value={teacherData.personalDetails.sex}
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
                    Cast*
                  </label>
                  <select
                    name="cast"
                    value={teacherData.personalDetails.cast}
                    onChange={handleInputChange1}
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
                    Cast Category*
                  </label>
                  <select
                    name="castCategory"
                    value={teacherData.personalDetails.castCategory}
                    onChange={handleInputChange1}
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
                    Blood Group*
                  </label>
                  <select
                    name="bloodGroup"
                    value={teacherData.personalDetails.bloodGroup}
                    onChange={handleInputChange1}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">--- Select ---</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B+">B-</option>
                    <option value="B+">AB+</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={activeCom === 2 ? "component-card" : "hidden-card"}>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Salary Amount*
                  </label>
                  <input
                    type="number"
                    name="salaryAmount"
                    value={teacherData.salaryDetails.salaryAmount}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    bank A/C No*
                  </label>
                  <input
                    type="number"
                    name="acNo"
                    value={teacherData.salaryDetails.acNo}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Basic
                  </label>
                  <input
                    type="text"
                    name="basic"
                    value={teacherData.salaryDetails.basic}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous Year Salary
                  </label>
                  <input
                    type="number"
                    name="previousYearSalary"
                    value={teacherData.salaryDetails.previousYearSalary}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    PF Applied*
                  </label>
                  <select
                    name="pfApplied"
                    value={teacherData.salaryDetails.pfApplied}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="bus">--- Select ---</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    PF No*
                  </label>
                  <input
                    type="number"
                    name="pfNo"
                    value={teacherData.salaryDetails.pfNo}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    LIC
                  </label>
                  <input
                    type="text"
                    name="lic"
                    value={teacherData.salaryDetails.lic}
                    onChange={handleInputChange2}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Loan
                  </label>
                  <input
                    type="text"
                    name="loan"
                    value={teacherData.salaryDetails.loan}
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
                    Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    value={teacherData.addressDetails.address}
                    onChange={handleInputChange3}
                    required
                    rows="3"
                    cols="22"
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    city
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={teacherData.addressDetails.city}
                    onChange={handleInputChange3}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    ZIP Code*
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    value={teacherData.addressDetails.zipCode}
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
                    value={teacherData.addressDetails.state}
                    onChange={handleInputChange3}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Home Telephone
                  </label>
                  <input
                    type="number"
                    name="homeTelephoneNo"
                    value={teacherData.addressDetails.homeTelephoneNo}
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
                    Completion year
                  </label>
                  <input
                    type="number"
                    name="completionYear"
                    value={teacherData.experienceDetails.completionYear}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Service in Year
                  </label>
                  <input
                    type="number"
                    name="serviceInYears"
                    value={teacherData.experienceDetails.serviceInYears}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date Of Joining
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={teacherData.experienceDetails.joiningDate}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Confirmation
                  </label>
                  <input
                    type="date"
                    name="dateOfConfirmation"
                    value={teacherData.experienceDetails.dateOfConfirmation}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Experience summery
                  </label>
                  <input
                    type="text"
                    name="experienceSummary"
                    value={teacherData.experienceDetails.experienceSummary}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Old PF No.
                  </label>
                  <input
                    type="number"
                    name="oldPFNo"
                    value={teacherData.experienceDetails.oldPFNo}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Previous Job
                  </label>
                  <input
                    type="text"
                    name="previousJob"
                    value={teacherData.experienceDetails.previousJob}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Leaving
                  </label>
                  <input
                    type="date"
                    name="dateOfLeaving"
                    value={teacherData.experienceDetails.dateOfLeaving}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Last Job Salary
                  </label>
                  <input
                    type="number"
                    name="lastJobSalary"
                    value={teacherData.experienceDetails.lastJobSalary}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Reason For Leaving
                  </label>
                  <input
                    type="text"
                    name="reasonForLeaving"
                    value={teacherData.experienceDetails.reasonForLeaving}
                    onChange={handleInputChange4}
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
                    Select Class
                  </label>
                  <input
                    type="text"
                    name="completionYear"
                    value={teacherData.experienceDetails.completionYear}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Select Subject.
                  </label>
                  <input
                    type="text"
                    name="oldPFNo"
                    value={teacherData.experienceDetails.oldPFNo}
                    onChange={handleInputChange4}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                setTeacherData(inticalteacherData);
                setIsModalOpen(false);
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>

        {confirmationMessage && (
          <div className="text-green-500 mt-4 text-center">
            {confirmationMessage}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddOrUpdateTeacherForm;
