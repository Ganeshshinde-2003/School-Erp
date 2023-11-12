import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AlertComponent from "../../Components/AlertComponent"
import AddButton from "../../Components/AddButton";
import "./AddSubject.css";
import {
  getSubjectDataFromDb,
  deleteSubject,
  getAddSubjectDatabase,
  updateSubjectInDatabase,
} from "../../api/ClassMaster/Addsubject";
import { Oval } from "react-loader-spinner";
import AddOrUpdateSubjectForm from "./AddOrUpdateSubjectForm ";

const AddSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectUpdate, setSubjectUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);
  const [isDelete,setIsDelete]=useState(false);

  const fetchData = () => {
    getAddSubjectDatabase()
      .then((data) => {
        setSubjectData(data);
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

  const closeDeleteAlert = () => {
    setDocId(null);
    setShowDeleteAlert(false);

  };

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setSubjectUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
      }
    }
  };

  const handleDelete = async ()=>{
    console.log("handle delete");
    const response = await deleteSubject(documentId);
    console.log("Delete document with ID:", documentId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
  }

  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setSubjectUpdate(false);
    setIsModalOpen(true);
  };

  const handleSubjectAdded = () => {
    setDataChanged(true);
  };

  const handleSubjectUpdated = () => {
    setDocId(null);
    setSubjectUpdate(false);
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
                Add Subjects
              </h1>
              <DynamicTable
                data={subjectData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add subject"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateSubjectForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
        handleSubjectUpdated={handleSubjectUpdated}
        DocId={docId}
        isUpdateOn={subjectUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={handleDelete} onCancel={closeDeleteAlert} />
      )}

    </div>
  );
};

export default AddSubject;
