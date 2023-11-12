import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable.js";
import { deleteStudent, getApplicantStudentFromDatabase } from "../../api/StudentMaster/AddStudentByApplication.js"; // Replace with the correct path
import { Oval } from "react-loader-spinner";
import AddButton from "../../Components/AddButton.js";

const PendingRequest = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);

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
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const handleAction =async (actionType, documentId) => {
    console.log(`Action: ${actionType}, Document ID: ${documentId}`);
    if (actionType === "approve") {
      // setSubjectUpdate(true);
      // setDocId(documentId);
      // console.log(docId);
      // setIsModalOpen(true);
    } 
    else if (actionType === "disapprove") {
      const response = await deleteStudent(documentId);
      console.log("Delete document with ID:", documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }

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
                  // onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default  PendingRequest;
