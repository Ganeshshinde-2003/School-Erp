import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddOrUpdateHolidayForm from "./AddOrUpdateHolidays";
import {
  deleteHoliday,
  getHolidayAndEventsData,
} from "../../api/AddHoliday/AddHoliday";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";

const AddStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidayUpdate, setHolidayUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [holidayData, setHolidayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getHolidayAndEventsData()
      .then((data) => {
        setHolidayData(data);
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
      setHolidayUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  const onConfirm = async () => {
    const response = await deleteHoliday(docId);
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
  };

  const handleHolidayAdded = () => {
    setDataChanged(true);
  };

  const handleHolidayUpdated = () => {
    setHolidayUpdate(true);
    setTimeout(() => {
      setHolidayUpdate(false);
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
                Add Holidays
              </h1>
              <DynamicTable
                data={holidayData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Holiday"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateHolidayForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleHolidayAdded={handleHolidayAdded}
        handleHolidayUpdated={handleHolidayUpdated}
        DocId={docId}
        isUpdateOn={holidayUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}

    </div>
  );
};

export default AddStudent;
