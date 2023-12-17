import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from 'react-loader-spinner';
import { addClassAndSectionsToDatabase, deleteClassAndSectionsData, getAllClassesAndSectionNames, getAllclassesAndSectionNames, getClassAndSectionsDatabase, getSubjectsByClassName } from "../../api/ClassMaster/AddClassAndSection";
import AddOrUpdateClassAndSectionForm from "./AddOrUpdateClassAndSectionForm ";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";

const AddClassAndSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectUpdate, setSubjectUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [subjectData, setSubjectData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getClassAndSectionsDatabase()
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

    
  const handleAction = async (actionType, documentId) => {
    
    if (actionType === 'edit') {
      console.log('edit ocument with ID:', documentId);
      setSubjectUpdate(true)
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
     
    } else if (actionType === 'delete') {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };


  const onConfirm = async ()=>{
    console.log("handle delete");
    const response = await deleteClassAndSectionsData(docId);
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
const openModal = async() => {
setDocId(null);
setSubjectUpdate(false)
setIsModalOpen(true);
};

const handleSubjectAdded = () => {
  setDataChanged(true);
};

const handleSubjectUpdated = () => {

  setDocId(null);
  setSubjectUpdate(false)
  setDataChanged(true);
};

return (
<div className="mt-4 w-full ov-sc">
  <div className="mt-5 max-w-full">
    <div className="flex justify-around">

      {isLoading ? ( // Display the loader while data is loading
        <Oval
          height={80}
          width={80}
          color="#343dff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#343fff"
          strokeWidth={2}
          strokeWidthSecondary={2}

        />
      ) : (
        <div className="add-optional-sub-table">
          <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
          Add Classes
          </h1>
          <DynamicTable data={subjectData} rowHeight={100} action={true} handleAction={handleAction} ispanding={false} />
          <p className="h-16 text-center font-bold text-white flex items-center justify-center">
            <AddButton buttonText={"Add Class"} onClickButton={openModal} />
          </p>
        </div>
      )}


    </div>
  </div>
  <AddOrUpdateClassAndSectionForm
    isModalOpen={isModalOpen}
    setIsModalOpen={setIsModalOpen}
    handleSubjectAdded={handleSubjectAdded}
    handleSubjectUpdated={handleSubjectUpdated}
    DocId={docId}
    isUpdateOn={subjectUpdate}
  />
   {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
</div>
)};

export default AddClassAndSubject;
