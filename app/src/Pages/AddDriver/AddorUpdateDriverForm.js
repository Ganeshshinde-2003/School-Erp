import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addDriverDataToDb,
  getSpecificDriverDataFromDb,
  updateDriverDataToDatabase,
} from "../../api/TransportMaster/AddDriver";
import { getAllVehiclesName } from "../../api/TransportMaster/AddVehicle";
const initialDriverData = {
  firstName: "",
  lastName: "",
  dob: "",
  driverVehicle: "",
  driverId: 0,
  mobileNo: "",
  driverSalary: 0,
  bloodGroup: "",
  bankAccountNumber: "",
};

const AddOrUpdateDriverForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleDriverAdded,
  handleDriverUpdated,
}) => {
  const [driverData, setDriverData] = useState(initialDriverData);
  const [error, setError] = useState(false);
  const [allotVechle,SetAllotVechle] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      // Fetch subject data from Firebase when the modal is opened for update
      getDriverData(DocId);
    }
    getAllVechles();
  }, [isModalOpen, isUpdateOn]);

  const getDriverData = async (DocId) => {
    try {
      const subject = await getSpecificDriverDataFromDb(DocId);

      if (subject) {
        setDriverData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const getAllVechles = async () => {
    await getAllVehiclesName().then((data) => {
      console.log(allotVechle);
      SetAllotVechle(data);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData({
      ...driverData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateDriverDataToDatabase(DocId, driverData);

      setConfirmationMessage(response.message);
      setDriverData(initialDriverData);
      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleDriverUpdated();
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addDriverDataToDb(driverData);

      setConfirmationMessage(response.message);
      alert(response.message);
      setDriverData(initialDriverData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleDriverAdded();
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
                  value={driverData.firstName}
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
                  value={driverData.lastName}
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
                  name="driverId"
                  value={driverData.driverId}
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
                   name="driverVehicle"
                   value={driverData.driverVehicle}
                   onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">--- Select ---</option>
                  {allotVechle.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Bank Account No*
                </label>
                <input
                  type="number"
                  name="bankAccountNumber"
                  value={driverData.bankAccountNumber}
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
                  type="number"
                  name="mobileNo"
                  value={driverData.mobileNo}
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
                  name="bloodGroup"
                  value={driverData.bloodGroup}
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
                  type="number"
                  name="driverSalary"
                  value={driverData.driverSalary}
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
                  type="date"
                  name="dob"
                  value={driverData.dob}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setDriverData(initialDriverData);
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
