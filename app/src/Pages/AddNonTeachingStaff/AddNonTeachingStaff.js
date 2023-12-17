import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddorUpdateNonTeachingStaff from "./AddorUpdateNonTeachingStraff";
import AlertComponent from "../../Components/AlertComponent";
import {
  deleteStaffData,
  getStaffDataFromDatabase,
} from "../../api/StaffManagement/AddNonTeachingStaff";

const AddNonTeachingStaff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nonTeachingstaffUpdate, setnonTeachingstaffUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [nonTeachingStaffData, setnonTeachingStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getStaffDataFromDatabase()
      .then((data) => {
        setnonTeachingStaffData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
    console.log(nonTeachingStaffData);
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
      setnonTeachingstaffUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };
  const onConfirm = async () => {
    const response = await deleteStaffData(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
    }
  };

  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);
  };
  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setnonTeachingstaffUpdate(false);
    setIsModalOpen(true);
  };

  const handleNonStaffAdded = () => {
    setDataChanged(true);
  };

  const handleNonTeachingstaffUpdated = () => {
    setDocId(null);
    setnonTeachingstaffUpdate(false);
    setDataChanged(true);
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
                Add Staff
              </h1>
              <DynamicTable
                data={nonTeachingStaffData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton buttonText={"Add Staff"} onClickButton={openModal} />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddorUpdateNonTeachingStaff
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleNonStaffAdded={handleNonStaffAdded}
        handleNonTeachingstaffUpdated={handleNonTeachingstaffUpdated}
        DocId={docId}
        isUpdateOn={nonTeachingstaffUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddNonTeachingStaff;
