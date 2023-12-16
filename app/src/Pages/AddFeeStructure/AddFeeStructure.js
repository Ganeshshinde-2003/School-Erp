import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddFeeStructureModal from "./AddFeeStructureModal";
import {
  deleteFeeSlabData,
  getFeeSlabDataFromDatabase,
} from "../../api/FeeStructure/AddFeeSlab";
import { getFeeStructureDataTable } from "../../api/FeeStructure/AddFeeStructure";

const AddFeeSlab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeSlabUpdate, setFeeSlabUpdate] = useState(false);

  const [feeSlabData, setFeeSlabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getFeeStructureDataTable()
      .then((data) => {
        setFeeSlabData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setFeeSlabUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      const response = await deleteFeeSlabData(documentId);
      console.log("Delete document with ID:", documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }
  };

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleFeeSlabAdded = () => {
    setDataChanged(true);
  };

  return (
    <div className="mt-4 w-full">
      <div className="mt-5 max-w-full">
        <div className="flex justify-around">
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
          ) : (
            <div className="add-optional-sub-table">
              <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
                Add Fee Structure
              </h1>
              <DynamicTable
                data={feeSlabData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
              />
            </div>
          )}
        </div>
      </div>
      <AddFeeStructureModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFeeSlabAdded={handleFeeSlabAdded}
        DocId={docId}
        isUpdateOn={feeSlabUpdate}
      />
    </div>
  );
};

export default AddFeeSlab;
