import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddSubject.css";
import AddSubjectForm from "./AddSubjectForm";
import { deleteSubject, getSubjectDatabase, updateSubjectInDatabase } from "../../api/subject";

import { Oval } from 'react-loader-spinner'

const AddSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectAdded, setSubjectAdded] = useState(false);
  const [subjectData, setSubjectData] = useState([]); // State to hold fetched data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSubjectDatabase()  
     .then((data) => {
        // const filteredData = data.map(({ id, ...rest }) => rest);
        setSubjectData(data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);

      });
  }, []); 

  const updateData = {
    Class: "Updated Class Name",
    Subject_Name: "Updated Subject Name",
  };
const handleDeleteClick = (id) => {
  deleteSubject(id).then(()=>{
    setSubjectData(prevData => prevData.filter(item => item._id !== id))
    }).catch(err => console.log(err));

  }

  const handleActionfunction = (actionType, documentId) => {
    console.log('document with ID:', documentId);

    if (actionType === 'edit') {
      // Handle edit action with documentId
      const response = updateSubjectInDatabase(documentId,updateData)
      console.log('Edit document with ID:', documentId);
    } else if (actionType === 'delete') {
      // Handle delete action with documentId
      const response = deleteSubject(documentId)
      console.log('Delete document with ID:', documentId);
    }
  };


  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleSubjectAdded = () => {
    setSubjectAdded(true);
    setTimeout(() => {
      setSubjectAdded(false);
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
              <DynamicTable data={subjectData} rowHeight={100} action={true}  handleAction={handleActionfunction} />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton buttonText={"Add subject"} onClickButton={openModal} />
              </p>
            </div>
          )}


        </div>
      </div>
      <AddSubjectForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
      />
      {subjectAdded && (
        <div className="text-green-500 text-center mt-2">
          Subject has been successfully added!
        </div>
      )}
    </div>
  );
};

export default AddSubject;
