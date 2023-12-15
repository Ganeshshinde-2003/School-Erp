import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addFeeSlabToDb,
  getFeeSlabDataFromDatabase,
  getSpecificFeeSlabDataFromDb,
  updateFeeSlabToDatabase,
} from "../../api/FeeStructure/AddFeeSlab";
import AddButton from "../../Components/AddButton";
import FeeSlabNamePopUp from "./FeeSlabNamePopup";
import AddTextField from "../../Components/AddTextField";
import {
  addFeeStructure,
  updateFeeStructure,
} from "../../api/FeeStructure/AddFeeStructure";

const AddOrUpdateFeeSlab = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleFeeSlabAdded,
  handleFeeSlabUpdated,
}) => {
  const initialData = {
    slabName: "",
    applicableFees: [],
  };

  const feeSlabs = [
    "Regular Fee",
    "Sports quota",
    "Free Quota",
    "Discount Quota",
  ];

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newSlabName, setNewSlabName] = useState("");
  const [trackActiveCom, setTrackActiveCom] = useState(1);
  const [feeSlabArray, setFeeSlabArray] = useState([]);
  const [fieldValue, setFieldValue] = useState("");
  const [applicationFee, setApppicaiontFee] = useState(0);
  const [feeStructureData, setFeeStructureData] = useState({});

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getFeeSlabData(DocId);
    } else {
      setFeeSlabArray(
        feeSlabs.map((slabName) => ({ slabName, data: { ...initialData } }))
      );
    }
  }, [isModalOpen, isUpdateOn]);

  const getFeeSlabData = async (DocId) => {
    try {
      const subject = await getSpecificFeeSlabDataFromDb(DocId);

      if (subject) {
        setFeeSlabArray(
          feeSlabs.map((slabName) => ({
            slabName,
            data: subject[slabName] ?? { ...initialData },
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e, index, classIndex) => {
    const updatedArray = [...feeSlabArray];
    const firstKey = Object.keys(
      feeSlabArray[index].data.applicableFees[classIndex]
    )[0];
    feeSlabArray[index].data.applicableFees[classIndex][firstKey] = fieldValue;
    setFeeSlabArray(updatedArray);

    const transformedData = {
      className: DocId,
      applicationFee: applicationFee,
    };

    updatedArray.forEach((entry) => {
      const slabName = entry.slabName;
      const applicableFees = entry.data.applicableFees;

      transformedData[slabName] = {};

      applicableFees.forEach((fee) => {
        const [key] = Object.keys(fee);
        transformedData[slabName][key] = fee[key];
      });
    });

    console.log(transformedData);
    setFeeStructureData(transformedData);
  };

  const handleAddSlab = () => {
    const activeIndex = activeCom - 1;
    const updatedArray = [...feeSlabArray];
    const slabData = updatedArray[activeIndex].data;
    const newClass = { [newSlabName]: "" };

    slabData.applicableFees = [...(slabData.applicableFees || []), newClass];

    setNewSlabName("");
    setFeeSlabArray(updatedArray);
    setIsModalOpen2(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await updateFeeStructure(DocId, feeSlabArray);

      setConfirmationMessage(response.message);
      setFeeSlabArray(
        feeSlabs.map((slabName) => ({ slabName, data: { ...initialData } }))
      );

      setTimeout(() => {
        setConfirmationMessage(null);
        setIsModalOpen(false);
        handleFeeSlabUpdated();
      }, 2000);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await addFeeStructure(feeStructureData);
      setConfirmationMessage(response.message);
    } catch (error) {
      console.error("Error updating subject data", error);
    }

    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleFeeSlabAdded();
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
        {isUpdateOn ? "Add Fee Structure" : "Add Fee Structure"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Admission Fees*
                </label>
                <input
                  type="Number"
                  name="applicationFee"
                  value={applicationFee}
                  onChange={(e) => setApppicaiontFee(e.target.value)}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="addTeacher-components">
            <div className="components-name">
              {feeSlabArray.map((slab, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setActiveCom(index + 1);
                    setTrackActiveCom(index + 1);
                  }}
                  className={activeCom === index + 1 ? "active-component" : ""}
                >
                  {slab.slabName}
                </div>
              ))}
            </div>
            {feeSlabArray.map((slab, index2) => (
              <div
                key={index2}
                className={
                  activeCom === index2 + 1
                    ? "component-card component-card-two"
                    : "hidden-card"
                }
              >
                {activeCom === index2 + 1 && (
                  <div className="applicable-classes">
                    <ul>
                      {slab.data.applicableFees.map((classObj, classIndex) => (
                        <li key={classIndex}>
                          <AddTextField
                            label={Object.keys(classObj)[0]}
                            onChange={(e) => {
                              handleInputChange(e, index2, classIndex);
                              setFieldValue(e.target.value);
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <AddButton
                  buttonText={"Add a Slab"}
                  onClickButton={() => setIsModalOpen2(true)}
                />
              </div>
            ))}
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleAdd : handleUpdate}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {isUpdateOn ? "Add" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFeeSlabArray(
                  feeSlabs.map((slabName) => ({
                    slabName,
                    data: { ...initialData },
                  }))
                );
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
      <FeeSlabNamePopUp
        isModalOpen2={isModalOpen2}
        setIsModalOpen2={setIsModalOpen2}
        newSlabName={newSlabName}
        setNewSlabName={setNewSlabName}
        activeCom={trackActiveCom}
        onAddSlab={handleAddSlab}
      />
    </Modal>
  );
};

export default AddOrUpdateFeeSlab;
