import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
// ... (existing imports)

const FeeSlabNamePopUp = ({
    isModalOpen2,
    setIsModalOpen2,
    newSlabName,
    setNewSlabName,
    activeCom,
    onAddSlab,
  }) => {
    if (!isModalOpen2) return null;
    console.log(newSlabName);
    console.log(activeCom);
  
    return (
      <Modal setShowModal={setIsModalOpen2}>
        <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
          Add Fee Description
        </h2>
        <div className="addTeacher-form">
          <form>
            <div className="addTeacher-main-form">
              <div className="form-first">
                <div>
                  <label className="block text-[18px] font-medium text-[#333333]">
                    Enter the slab name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={newSlabName}
                    onChange={(e) => setNewSlabName(e.target.value)}
                    required
                    className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="addTeacher-buttons">
              <button
                type="button"
                onClick={() => {
                  onAddSlab();  {/* Call onAddSlab here */}
                  setIsModalOpen2(false);
                }}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewSlabName("");
                  setIsModalOpen2(false);
                }}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };
  
  export default FeeSlabNamePopUp;
  