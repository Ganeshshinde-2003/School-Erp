import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import { Oval } from "react-loader-spinner";
import {
  addVehicleDataToDb,
  deleteVehicleData,
  getVehicleDataFromDatabase,
} from "../../api/TransportMaster/AddVehicle";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import AddVehicleForm from "./AdOrUpdateVehicleForm";
import AlertComponent from "../../Components/AlertComponent";

const AddVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleUpdate, setVehicleUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getVehicleDataFromDatabase()
      .then((data) => {
        setVehicleData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      setVehicleUpdate(true);
      setDocId(documentId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  if (dataChanged) {
    fetchData(); 
    setDataChanged(false);
  }

  const onConfirm = async ()=>{
    const response = await deleteVehicleData(docId);
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
  
  const openModal = () => {
    setIsModalOpen(true);
    setDocId(null);
    setVehicleUpdate(false);
  };

  const handleVehicleAdded = () => {
    setTimeout(() => {
      setDataChanged(true);
    }, 2000); 
  };

  const handleVehicleUpdated = () => {
    setVehicleUpdate(true);
    setTimeout(() => {
      setVehicleUpdate(false);
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
                Add Vehicle
              </h1>
              <DynamicTable
                data={vehicleData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Vehicle"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddVehicleForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleVehicleAdded={handleVehicleAdded}
        handleVehicleUpdated={handleVehicleUpdated}
        DocId={docId}
        isUpdateOn={vehicleUpdate}
      />
        {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddVehicle;
