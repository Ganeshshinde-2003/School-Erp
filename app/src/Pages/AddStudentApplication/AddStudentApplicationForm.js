import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddStudents/AddStudentForm.css";
import "../AddTeacher/AddTeacherForm.css";

import {
    addStudentByApplicationToDatabase,
    getApplicantStudentFromDatabase,
}from "../../api/StudentMaster/AddStudentByApplication.js";

const AddStudentForm =  ({
    isModalOpen,
    setIsModalOpen,
  }) => {
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
        <div className="addTeacher-form">
        <form onSubmit={handleSubmit} className="flex">
        <div className="addTeacher-main-form">
            <div className="flex-1 mr-4">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <br></br>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            </label>
            <br></br>
            <br></br>
            <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <br></br>
          <label>
             Date of Birth:
            <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
            />
            </label>
            <br></br>
            <br></br>
            <label>
                Application Number:
                <input
                type="text"
                name="applicationNo"
                value={formData.applicationNo}
                onChange={handleChange}
                />
                </label>
                <br></br>
                <br></br>
                <label>
                    Adhar Number:
                    <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    />
                </label>
            </div>
                <div>
                    <label>
                        Joining Class:
                        <input
                        type="text"
                        name="joiningClass"
                        value={formData.joiningClass}
                        onChange={handleChange}
                        />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        TC No:
                        <input
                        type="text"
                        name="previousschoolTCNo"
                        value={formData.previousschoolTCNo}
                        onChange={handleChange}
                        />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                    Application Fees Collected:
                    <input
                    type="text"
                    name="applicationFees"
                    value={formData.applicationFees}
                    onChange={handleChange}
                    />
                </label>
                <br></br>
                <br></br>
                <label>
                    Payment Mode:
                    <input
                    type="text"
                    name="paymentmode"
                    value={formData.paymentmode}
                    onChange={handleChange}
                    />
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                        UPI Transaction No. (if UPI):
                        <input
                        type="text"
                        name="upitransactionNo"
                        value={formData.upitransactionNo}
                        onChange={handleChange}
                        />
                    </label>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 mr-2" >
            Add Student
          </button>
          <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
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
