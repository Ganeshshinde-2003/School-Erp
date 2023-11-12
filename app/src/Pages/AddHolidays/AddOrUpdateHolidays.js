import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  AddHolidayAndEventsToDb,
  getHolidayAndEventsData,
} from "../../api/AddHoliday/AddHoliday";

const AddOrUpdateHolidayForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleHolidayAdded,
  handleHolidayUpdated,
}) => {
  const inticalData = {
    eventName: "",
    isHoliday: "",
    startDate: "",
    endDate: "",
  };
  const [holidayData, setHolidayData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getholidayData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getholidayData = async (DocId) => {
    try {
      const subject = await getHolidayAndEventsData(DocId);

      if (subject) {
        setHolidayData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHolidayData({
      ...holidayData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {};

  const handleAdd = async () => {
    try {
      const response = await AddHolidayAndEventsToDb(holidayData);
      // Show a confirmation message
      setConfirmationMessage(response.message);

      setHolidayData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleHolidayAdded();
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
        {isUpdateOn ? "Update Holidays/Event" : "Add Event/Holidays"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Event Name*
              </label>
              <input
                type="text"
                name="eventName"
                value={holidayData.eventName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Holiday?*
              </label>
              <select
                type="text"
                name="isHoliday"
                value={holidayData.isHoliday}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Start Date*
              </label>
              <input
                type="date"
                name="startDate"
                value={holidayData.startDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-[100%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                End Date*
              </label>
              <input
                type="date"
                name="endDate"
                value={holidayData.endDate}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-[100%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
                setHolidayData(inticalData);
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

export default AddOrUpdateHolidayForm;
