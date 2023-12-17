import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable.js";
import { deleteStudent, getApplicantStudentDataFromDd, getApplicantStudentFromDatabase } from "../../api/StudentMaster/AddStudentByApplication.js"; // Replace with the correct path
import { Oval } from "react-loader-spinner";
import AddButton from "../../Components/AddButton.js";
import { useNavigate } from 'react-router-dom';

import AlertComponent from "../../Components/AlertComponent.js";
import { addStudentDirectlyToDatabase } from "../../api/StudentMaster/AddStudentDirectly.js";
import AddOrUpdateStudentForm from "../AddStudentsDirectly/AddOrUpdateStudentForm .js";
import "../../App.css";

const PendingRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [docId, setDocId] = useState("");
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
      setDocId(documentId);
     
      // navigate('/student-master/add-student');

    } 
    else if (actionType === "disapprove") {
      setAlertmsg(true);
      setShowDeleteAlert(true);
      setDocId(documentId);

    }

  }

  const onConfirm = async ()=>{
    if(alertmsg){
      const response = await deleteStudent(docId);
      console.log("Delete document with ID:", docId);
      if (response.status) {
        setDocId(null);
        setDataChanged(true);
      }
    }
    else {
      console.log("Approved document with ID:", docId);
      const response = await getApplicantStudentDataFromDd(docId);
      console.log(response);
    
      const { firstName, lastName, mobileNo, joiningClass,dob,aadharNo,previousschoolTCNo} = response;
    
      const studentDataObject = {
        firstName,
        lastName,
        mobileNo,
        joiningClass,
      
        personalDetails: {
          dob,
          aadharNo,
        },
      
        addressDetails: {
        },
      
        takeAdmissionfees: {
        },
       
        demography: {
        },
      
        studentHistory: {
          previousschoolTCNo,
        },
        optionalSubjects:[]
      };
      console.log("studentObject",studentDataObject);
      const deleted = await deleteStudent(docId);
      console.log("Delete document:", deleted);

      const res = await addStudentDirectlyToDatabase(studentDataObject);
      console.log(res.docId);
      setDocId(res?.docId);
      setIsModalOpen(true);
      setDataChanged(true);

      // navigate('/student-master/add-student');
    }
    setShowDeleteAlert(false);
  }

  const handleStudentUpdated=()=>{
    setDocId(null);
    console.log(" document updated with ID:");
    setDataChanged(true);
  }

  const handleStudentAdded=()=>{
    console.log(" document added with ID:");
    setDataChanged(true);
  }

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

      <AddOrUpdateStudentForm
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        handleStudentAdded={handleStudentAdded}
        handleStudentUpdated={handleStudentUpdated}
        DocId={docId}
        isUpdateOn={true}
      />
    </div>
  );
};

export default  PendingRequest;
