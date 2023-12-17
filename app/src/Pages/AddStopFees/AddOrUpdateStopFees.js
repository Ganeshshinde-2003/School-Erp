import React, { useEffect, useState } from "react";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddOrUpdateStopForm from "./AddOrUpdateStopFeesform";
import DynamicTable from "../../Components/DynamicTable";
import {
  addTransportDataToDb,
  deleteTransportData,
  getTransportDataFromDatabase,
} from "../../api/TransportMaster/AddStopAndFees";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";

const AddStop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stopUpdate, setStopUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [stopData, setStopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getTransportDataFromDatabase()
      .then((data) => {
        setStopData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit document with ID:", documentId);
      setStopUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }


  const onConfirm = async ()=>{
    const response = await deleteTransportData(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
  }
}

const onCancel = () => {
  setDocId(null);
  setShowDeleteAlert(false);

};

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
    setDocId(null);
    setStopUpdate(false);
  };

  const handleStopAdded = () => {
    setTimeout(() => {
      setDataChanged(true);
    }, 2000); // Hide the message after 2 seconds
  };

  const handleStopUpdated = () => {
    setStopUpdate(true);
    setTimeout(() => {
      setStopUpdate(false);
      setDataChanged(true);
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div className="mt-4 w-full ov-sc">
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
                Add Stops and Fees
              </h1>
              {/* Assuming you have a DynamicTable component for stops and fees */}
              <DynamicTable
                data={stopData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Stops and Fees"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateStopForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleStopAdded={handleStopAdded}
        handleStopUpdated={handleStopUpdated}
        DocId={docId}
        isUpdateOn={stopUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddStop;
