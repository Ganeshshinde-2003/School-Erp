import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import {
  getexpenseDataFromDb,
  addSubjectToDatabase,
  updateSubjectInDatabase,
} from "../../api/ClassMaster/Addsubject";
import "../AddTeacher/AddTeacherForm.css";
import {
  addExpenseDataToDb,
  getExpenseDataFromDatabase,
  getSpecificExpenseDataFromDb,
  updateExpenseDataToDatabase,
} from "../../api/ExpenseAdding/AddExpense";

const AddOrUpdateExpenseForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleExpenseAdded,
  handleExpenseUpdated,
}) => {
  const inticalData = {
    expenseName: "",
    amount: 0,
    description: "",
  };
  const [expenseData, setExpenseData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getexpenseData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getexpenseData = async (DocId) => {
    try {
      const subject = await getSpecificExpenseDataFromDb(DocId);

      if (subject) {
        setExpenseData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateExpenseDataToDatabase(DocId, expenseData);

      setConfirmationMessage(response.message);

      setExpenseData(inticalData);

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleExpenseUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addExpenseDataToDb(expenseData);
      // Show a confirmation message
      setConfirmationMessage(response.message);

      setExpenseData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleExpenseAdded();
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
                Expense Name*
              </label>
              <input
                type="text"
                name="expenseName"
                value={expenseData.expenseName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Expense Amount*
              </label>
              <input
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <label className="block text-sm w-[200px] font-medium text-gray-700">
                Description
              </label>
              <textarea
                type="text"
                rows="6"
                name="description"
                value={expenseData.description}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                setExpenseData(inticalData);
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

export default AddOrUpdateExpenseForm;
