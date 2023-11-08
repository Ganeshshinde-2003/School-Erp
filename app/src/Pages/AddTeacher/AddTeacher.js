import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddTeacher.css";
import AddOrUpdateTeacherForm from "./AddOrUpdateTeacherForm";
import { Oval } from "react-loader-spinner";
import { addTeacherToDatabase, deleteTeacher, getTeacherFromDatabase, updateTeacherInDatabase,teacherDatatest, getTeacherDataFromDd } from "../../api/TeacherMaster/AddTeacher";

const AddTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherUpdate, setTeacherUpdate] = useState(false);

  const [teacherData, setTeacherData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const updatedTeacherData = {
   
    mobileNo: 8809330707,
    classTeacher: ["Class A", "Class B","Class C"],
    transportSlab: "car",

    personalDetailsData: {
        dob: new Date(2004, 3, 10),
        fatherName: "David Sr.",
        spouseName: "Bob",
        sex: "female",
        bloodGroup: "AB+",
    },

    };

    const testTeacherData2 = {
      teacherId: "th103",
      designation: "Math Teacher",
      emailId: "mathteacher@gmail.com",
      firstName: "Alice",
      lastName: "Johnson",
      mobileNo: 9876543211,
      classTeacher: ["Class A", "Class B"],
      transportSlab: "car",
  
      personalDetailsData: {
          dob: new Date(1985, 3, 10),
          fatherName: "David Sr.",
          motherName: "Susan",
          spouseName: "Bob",
          sex: "male",
          cast: "Old Cast",
          castCategory: "General",
          bloodGroup: "A+",
      },
  
      addressDetailsData: {
          address: "123 Oak Avenue",
          city: "Test City",
          zipCode: "12345",
          state: "Test State",
          homeTelephoneNo: "9876234567",
      },
  
      salaryDetailsData: {
          basic: "xyzabc",
          acNo: 9876543211,
          lic: "abcxyz",
          loan: "5000",
          pfApplied: "ghi",
          pfNo: 9876543211,
          previousYearSalary: 123456,
          salaryAmount: 220000,
      },
  
      experienceDetailsData: {
          completionYear: "2020",
          joiningDate: new Date(2016, 4, 5),
          serviceInYears: 6,
          confirmationDate: new Date(2016, 8, 15),
          experienceSummary: "Test job experience summary",
          oldPFNo: "123456",
          previousJob: "Test Job Title",
          dateOfLeaving: new Date(2020, 9, 20),
          dateOfConfirmation: new Date(2016, 10, 1),
          lastJobSalary: 55000,
          reasonForLeaving: "Testing purposes",
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
      const resonse = await getTeacherDataFromDd(docId);
      console.log(resonse);
      // updateTeacherInDatabase(documentId,updatedTeacherData)
      setDataChanged(true)
      // setIsModalOpen(true);
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
    setDataChanged(true)
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
              Add Teachers
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
