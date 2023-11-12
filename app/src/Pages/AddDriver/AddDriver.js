import React, { useEffect, useState } from "react";
import AddButton from "../../Components/AddButton";
import { getStudentDatabase } from "../../api/student";
import AddOrUpdateDriverForm from "./AddorUpdateDriverForm";

const AddDriver = () => {
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
    <div className="mt-4 w-full flex items-center justify-center">
      <div className="mt-5 max-w-full">
        <p className="h-16 text-center font-bold text-white flex items-center justify-center">
          <AddButton buttonText={"Add subject"} onClickButton={openModal} />
        </p>
      </div>
      <AddOrUpdateDriverForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubjectAdded={handleSubjectAdded}
        handleSubjectUpdated={handleSubjectUpdated}
        DocId={docId}
        isUpdateOn={studentUpdate}
      />
    </div>
  );
};

export default AddDriver;
