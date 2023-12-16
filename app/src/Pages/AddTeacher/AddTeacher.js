import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddTeacher.css";
import AddOrUpdateTeacherForm from "./AddOrUpdateTeacherForm";
import { Oval } from "react-loader-spinner";
import {
  deleteTeacher,
  getTeacherFromDatabase,
  getTeacherDataFromDd,
} from "../../api/TeacherMaster/AddTeacher";
import AlertComponent from "../../Components/AlertComponent";
import { getSubjectsByClassName } from "../../api/ClassMaster/AddClassAndSection";

const AddTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherUpdate, setTeacherUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    //calling api getTeacherData from database
    getTeacherFromDatabase()
      .then((data) => {
        setTeacherData(data);
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
      setTeacherUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
      setDataChanged(true);
      //calling the update api and handleUpdate
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  const onConfirm = async () => {
    const response = await deleteTeacher(docId);
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

  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setTeacherUpdate(false);
    setIsModalOpen(true);
  };

  const handleTeacherAdded = () => {
    setDataChanged(true);
  };

  const handleTeacherUpdated = () => {
    setDocId(null);
    setTeacherUpdate(false);
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
                Add Teachers
              </h1>
              <DynamicTable
                data={teacherData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Teacher"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateTeacherForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleTeacherAdded={handleTeacherAdded}
        handleTeacherUpdated={handleTeacherUpdated}
        DocId={docId}
        isUpdateOn={teacherUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddTeacher;
