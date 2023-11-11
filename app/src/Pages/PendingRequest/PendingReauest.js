import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable.js";
import { getApplicantStudentFromDatabase } from "../../api/StudentMaster/AddStudentByApplication.js"; // Replace with the correct path

const PendingRequest = () => {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplicantStudentFromDatabase();
        setStudentData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        console.log("API Response:", data);
      }
    };

    fetchData(); // Fetch data initially
  }, []);

  const handleAction = (actionType, documentId) => {
    // Handle your actions here
    console.log(`Action: ${actionType}, Document ID: ${documentId}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DynamicTable
          data={studentData}
          rowHeight={40} 
          handleAction={handleAction}
        />
      )}
    </div>
  );
};

export default  PendingRequest;
