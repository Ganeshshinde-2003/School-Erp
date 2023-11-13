import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable.js";
import { deleteStudent, getApplicantStudentFromDatabase } from "../../api/StudentMaster/AddStudentByApplication.js"; // Replace with the correct path
import { Oval } from "react-loader-spinner";
import AddButton from "../../Components/AddButton.js";
import { useNavigate } from 'react-router-dom';

import AlertComponent from "../../Components/AlertComponent.js";

const PendingRequest = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [docId, setDocId] = useState(null);
  const [alertmsg,setAlertmsg] = useState(false);
  const navigate = useNavigate();


  const fetchData = () => {
    getApplicantStudentFromDatabase()
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
    fetchData();
  }, []);

  if (dataChanged) {
    fetchData(); 
    setDataChanged(false);
  }
  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);

  };
  const handleAction =async (actionType, documentId) => {

    console.log(`Action: ${actionType}, Document ID: ${documentId}`);
    if (actionType === "approve") {
      setAlertmsg(false);
      setShowDeleteAlert(true);
      
      // setSubjectUpdate(true);
      // setDocId(documentId);
      // console.log(docId);
      // setIsModalOpen(true);
      navigate('/student-master/add-student');

    } 
    else if (actionType === "disapprove") {
      setAlertmsg(true);
      setShowDeleteAlert(true);
      setDocId(documentId);

    }

  }

  const onConfirm = async ()=>{
    console.log("handle delete");
    const response = await deleteStudent(docId);
      console.log("Delete document with ID:", docId);
      if (response.status) {
        setDocId(null);
        setDataChanged(true);
      }
}

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
              Pending Admission Requests
              </h1>
              <DynamicTable
                data={studentData}
                rowHeight={100}
                action={false}
                ispanding={true}
                handleAction={handleAction}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add students"}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      {showDeleteAlert && (
        <AlertComponent
        onConfirm={onConfirm} 
        onCancel={onCancel} 
        alertMessage={alertmsg? "Are you sure to not to permit this student to allow to admit?":"Are you sure to permit this student to allow to admit?"}
        cnfBttonText={alertmsg?"Disapprove":"Approve"}
        />
      )}
    </div>
  );
};

export default  PendingRequest;
