import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import "./AddStudentApplication.css";

import {
  addStudentByApplicationToDatabase,
  getApplicantStudentFromDatabase,
} from "../../api/StudentMaster/AddStudentByApplication.js";

const AddStudentForm = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    applicationNo: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    joiningClass: "",
    dob: "",
    previousschoolTCNo: "",
    applicationFees: "",
    paymentmode: "",
    upitransactionNo: "",
    aadharNo: "",
  });

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addStudentByApplicationToDatabase(formData);

    console.log(response);
    setIsModalOpen(false);

    setFormData({
      applicationNo: "",
      firstName: "",
      lastName: "",
      mobileNo: "",
      joiningClass: "",
      dob: "",
      previousschoolTCNo: "",
      applicationFees: "",
      paymentmode: "",
      upitransactionNo: "",
      aadharNo: "",
      feeSlabApplingFor: "",
    });
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
        Add Application
      </h2>
      <div className="addTeacher-form ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="addTeacher-main-form">
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Mobile No*
                  </label>
                  <input
                    type="number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Date of Birth*
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Application Number*
                  </label>
                  <input
                    type="text"
                    name="applicationNo"
                    value={formData.applicationNo}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Adhar Number*
                  </label>
                  <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Joining Class*
                  </label>
                  <input
                    type="text"
                    name="joiningClass"
                    value={formData.joiningClass}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    TC No*
                  </label>
                  <input
                    type="text"
                    name="previousschoolTCNo"
                    value={formData.previousschoolTCNo}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Application Fees*
                  </label>
                  <input
                    type="text"
                    name="applicationFees"
                    value={formData.applicationFees}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Payment Mode*
                  </label>
                  <input
                    type="text"
                    name="paymentmode"
                    value={formData.paymentmode}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    UPI Transaction(No)*
                  </label>
                  <input
                    type="text"
                    name="upitransactionNo"
                    value={formData.upitransactionNo}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Fee Slab Appling For*
                  </label>
                  <input
                    type="text"
                    name="feeSlabApplingFor"
                    value={formData.feeSlabApplingFor}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 mr-2  rounded"
            >
              Add Student
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Close Modal
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
export default AddStudentForm;
