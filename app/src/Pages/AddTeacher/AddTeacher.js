import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddTeacher.css";
import AddOrUpdateTeacherForm from "./AddOrUpdateTeacherForm";
import { Oval } from "react-loader-spinner";
import { addTeacherToDatabase, deleteTeacher, getTeacherFromDatabase } from "../../api/TeacherMaster/AddTeacher";

const AddTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherUpdate, setTeacherUpdate] = useState(false);

  const [teacherData, setTeacherData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const teacherDatatest = {
    teacherId: "th101",
    designation: "Classteacher",
    emailId: "amar@gmail.com",
    firstName: "Amar",
    lastName: "Kumar",
    mobileNo: 8809871234,
    classTeacher: ["Class A", "Class B"],
    transportSlab: "auto",
    personalDetailsData: {
        dob: new Date(2016, 0, 5),
        fatherName: "xyz",
        motherName: "abc",
        spouseName: "sqrt",
        sex: "male",
        cast: "Some Cast",
        castCategory: "General",
        bloodGroup: "AB+",
    },
    addressDetailsData: {
        address: "123 Main Street",
        city: "Your City",
        zipCode: "12345",
        state: "Your State",
        homeTelephoneNo: "9876543210",
    },
    salaryDetailsData: {
        basic: "xyz",
        acNo: 23456787695,
        lic: "ghgg",
        loan: "9000",
        pfApplied: "abc",
        pfNo: 32456789876,
        previousYearSalary: 123457,
        salaryAmount: 213456,
    },
    experienceDetailsData: {
        completionYear: "2020",
        joiningDate: new Date(2018, 3, 15),
        serviceInYears: 3,
        confirmationDate: new Date(2018, 6, 30),
        experienceSummary: "Previous job experience summary",
        oldPFNo: "456789",
        previousJob: "Previous Job Title",
        dateOfLeaving: new Date(2020, 11, 31),
        dateOfConfirmation: new Date(2018, 7, 15),
        lastJobSalary: 50000,
        reasonForLeaving: "Reason for leaving previous job",
    },
};
   
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
      
    if (actionType === 'edit') {
      console.log('edit ocument with ID:', documentId);
      setTeacherUpdate(true)
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
      //calling the update api and handleUpdate
     
    } else if (actionType === 'delete') {
      const response =await deleteTeacher(documentId);
      console.log('Delete document with ID:', documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }
  };
  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    addTeacherToDatabase(teacherDatatest)
    // setDocId(null);
    // setTeacherUpdate(false)
    // setIsModalOpen(true);
  };

  const handleTeacherAdded = () => {
   setDataChanged(true);
  };

  const handleTeacherUpdated = () => {
    setDocId(null);
    setSubjectUpdate(false)
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
            <DynamicTable data={teacherData} rowHeight={100} action={true} handleAction={handleAction} />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
              <AddButton buttonText={"Add subject"} onClickButton={openModal} />
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
    </div>
  );
};

export default AddTeacher;
