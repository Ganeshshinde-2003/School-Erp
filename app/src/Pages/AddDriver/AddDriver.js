import React, { useEffect, useState } from "react";
import AddButton from "../../Components/AddButton";
import AddOrUpdateDriverForm from "./AddorUpdateDriverForm";
import { Oval } from "react-loader-spinner";
import {
  addDriverDataToDb,
  deleteDriverData,
  getDriverDataFromDatabase,
} from "../../api/TransportMaster/AddDriver";
import DynamicTable from "../../Components/DynamicTable";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";


const AddDriver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverUpdate, setDriverUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getDriverDataFromDatabase()
      .then((data) => {
        setDriverData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setDriverUpdate(true);
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
    const response = await deleteDriverData(docId);
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
    console.log("Open modal");
    setIsModalOpen(true);
    setDocId(null);
    setDriverUpdate(false);
  };

  const handleDriverAdded = () => {
    setTimeout(() => {
      setDataChanged(true);
    }, 2000); // Hide the message after 2 seconds
  };

  const handleDriverUpdated = () => {
    setDriverUpdate(true);
    setTimeout(() => {
      setDriverUpdate(false);
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
                Add Driver
              </h1>
              <DynamicTable
                data={driverData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Driver"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateDriverForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDriverAdded={handleDriverAdded}
        handleDriverUpdated={handleDriverUpdated}
        DocId={docId}
        isUpdateOn={driverUpdate}
      />
        {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddDriver;
