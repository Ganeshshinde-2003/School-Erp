  import React, { useEffect, useState } from "react";
  import DynamicTable from "../../Components/DynamicTable";
  import AddButton from "../../Components/AddButton";
  import "./AddStudent.css";
  import { getStudentDatabase,addStudentToDatabase,updateStudentInDatabase,deleteStudentFromDatabase } from "../../api/student";
  import { Oval } from 'react-loader-spinner';
  import AddOrUpdateStudentForm from "./AddOrUpdateStudentForm ";
  
  const AddStudent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentAdded, setstudentAdded] = useState(false);
    const [studentUpdate, setStudentUpdate] = useState(false);

    const [studentData, setStudentData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [dataChanged, setDataChanged] = useState(false);
    const [docId, setDocId] = useState(null);

  
    const fetchData = () => {
      getStudentDatabase()
        .then((data) => {
          setStudentData(data);
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
        setStudentUpdate(true)
        setDocId(documentId);
        console.log(docId);
        setIsModalOpen(true);
        

       
      } else if (actionType === 'delete') {
        const response =await deleteStudentFromDatabase(documentId);
        console.log('Delete document with ID:', documentId);
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

const handleSubjectAdded = () => {
  setstudentAdded(true);
  setTimeout(() => {
    setstudentAdded(false);
    setDataChanged(true);
  }, 2000); // Hide the message after 2 seconds
};

const handleSubjectUpdated = () => {
  setStudentUpdate(true);
  setTimeout(() => {
    setStudentUpdate(false);
    setDataChanged(true);
  }, 2000); // Hide the message after 2 seconds
};

return (
  <div className="mt-4 w-full">
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
              Add Subjects
            </h1>
            <DynamicTable data={studentData} rowHeight={100} action={true} handleAction={handleAction} />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
              <AddButton buttonText={"Add subject"} onClickButton={openModal} />
            </p>
          </div>
        )}


      </div>
    </div>
    <AddOrUpdateStudentForm
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      handleSubjectAdded={handleSubjectAdded}
      handleSubjectUpdated={handleSubjectUpdated}
      DocId={docId}
      isUpdateOn={studentUpdate}
    />
    {studentAdded && (
      <div className="text-green-500 text-center mt-2">
        Subject has been successfully added!
      </div>
    )}
  </div>
);
};

export default AddStudent;
