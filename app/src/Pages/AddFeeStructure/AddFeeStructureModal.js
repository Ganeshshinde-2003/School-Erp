import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import "../AddTeacher/AddTeacherForm.css";
import AddButton from "../../Components/AddButton";
import FeeSlabNamePopUp from "./FeeSlabNamePopup";
import AddTextField from "../../Components/AddTextField";
import {
  addFeeStructure,
  getSpecificFeeStructure,
  isDocpresentInDb,
  slabarrayfromactualdb,
  updateFeeStructure,
} from "../../api/FeeStructure/AddFeeStructure";
import { documentId } from "firebase/firestore";
import { Oval } from "react-loader-spinner";

const AddOrUpdateFeeSlab = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleFeeSlabAdded,
}) => {
  const initialData = {
    slabName: "",
    applicableFees: [],
  };

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [activeCom, setActiveCom] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newSlabName, setNewSlabName] = useState("");
  const [trackActiveCom, setTrackActiveCom] = useState(1);
  const [feeSlabArray, setFeeSlabArray] = useState([]);
  const [applicationFee, setApppicaiontFee] = useState(0);
  const [feeStructureData, setFeeStructureData] = useState({});
  const [feeSlabs, setFeeSlabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getFeeSlabData(DocId);

    }
  }, [isModalOpen, isUpdateOn]);

  const getFeeSlabData = async (DocId) => {

    try {
      setIsLoading(true);
      const feeStruct = await getSpecificFeeStructure(DocId);
      console.log(feeStruct);
      setApppicaiontFee(feeStruct?.applicationFee);
      
      const neweStruct = transformDataToArray(feeStruct);
      console.log(neweStruct);
    
      const feeSlabs = await slabarrayfromactualdb(DocId);
      
      // Map feeSlabs with data from neweStruct or set initialData if not present
      const updatedFeeSlabArray = feeSlabs.map((slabName) => ({
        slabName,
        data: neweStruct.find(item => item.slabName === slabName)?.data || { ...initialData }
      }));
    
      setFeeSlabArray(updatedFeeSlabArray);
      console.log(updatedFeeSlabArray);
    } catch (error) {
      console.error("Error fetching feeStruct data", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const transformDataToArray = (originalData) => {
    const transformedData = [];

    for (const slabName in originalData) {
      if (slabName !== 'className' && slabName !== 'applicationFee' && slabName !== 'createdAt') {
        const slabData = originalData[slabName];
        const slabObject = {
          slabName: slabName,
          data: {
            applicableFees: [],
          },
        };

        if (slabData && typeof slabData === 'object' && Object.keys(slabData).length > 0) {
          for (const key in slabData) {
            slabObject.data.applicableFees.push({
              [key]: slabData[key],
            });
          }
        }

        transformedData.push(slabObject);
      }
    }

    return transformedData;
  }



  const handleInputChange = (e, index, classIndex) => {
    const updatedArray = [...feeSlabArray];
    const firstKey = Object.keys(
      feeSlabArray[index].data.applicableFees[classIndex]
    )[0];
    feeSlabArray[index].data.applicableFees[classIndex][firstKey] =
      e.target.value;

    setFeeSlabArray(updatedArray);
    console.log(updatedArray);

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
    console.log(updatedArray);
  };

  // const handleUpdate = async () => {
  //   try {
  //     const response = await updateFeeStructure(DocId, feeSlabArray);

  //     setConfirmationMessage(response.message);
  //     setFeeSlabArray(
  //       feeSlabs.map((slabName) => ({ slabName, data: { ...initialData } }))
  //     );

  //     setTimeout(() => {
  //       setConfirmationMessage(null);
  //       setIsModalOpen(false);
  //       handleFeeSlabUpdated();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error updating feeStruct data", error);
  //   }
  // };

  const handleAdd = async () => {
    try {
      const response = await addFeeStructure(feeStructureData);
      setConfirmationMessage(response.message);
      setApppicaiontFee(0);

    } catch (error) {
      console.error("Error updating feeStruct data", error);
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
      {isLoading ? (
        <Oval
          height={80}
          width={80}
          color="#343dff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#343fff"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) :
        <>
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
                                value={Object.values(classObj)[0]}
                                onChange={(e) => {
                                  handleInputChange(e, index2, classIndex);
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
              <div className="add-feeStruct-btn addTeacher-buttons">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
                >
                  {"Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApppicaiontFee(0);
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
        </>
      }
    </Modal>
  );
};

export default AddOrUpdateFeeSlab;
