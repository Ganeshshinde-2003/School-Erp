import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import { addNoticeToDatabase } from "../../api/AddNotice/AddNotice";

const AddOrUpdateNoticeForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleNoticeAdded,
  handleNoticeUpdated,
}) => {
  const inticalData = {
    noticeTo: "",
    noticeDescription: "",
  };
  const [noticeData, setNoticeData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getnoticeData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getnoticeData = async (DocId) => {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {};

  const handleAdd = async () => {
    try {
      const response = await addNoticeToDatabase(noticeData);

      // Show a confirmation message
      setConfirmationMessage(response.message);

      setNoticeData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }

    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleNoticeAdded();
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
        {isUpdateOn ? "Update Expense" : "Add Expense"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Notice To*
              </label>
              <select
                type="text"
                name="noticeTo"
                value={noticeData.noticeTo}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="Pysics">Pysics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Maths">Maths</option>
              </select>
            </div>
            <div className="flex justify-between">
              <label className="block text-sm w-[200px] font-medium text-gray-700">
                Notice Description*
              </label>
              <textarea
                type="text"
                rows="6"
                name="noticeDescription"
                value={noticeData.noticeDescription}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-[92%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                setNoticeData(inticalData);
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

export default AddOrUpdateNoticeForm;
