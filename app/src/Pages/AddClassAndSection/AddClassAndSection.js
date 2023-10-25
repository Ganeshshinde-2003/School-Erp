import React from "react";
import AddClassAndSectionData from "../../Database/AddClassAndSection";
import DynamicTable from "../../Components/DynamicTable";
import "./AddClassAndSection.css";
import AddButton from "../../Components/AddButton";
import { addStudentToDatabase }from "../../api/student"
const AddClassAndSubject = () => {

// this is a sample object foermate that should be pass to the addStudentToDatabase(object:studentData)
  const studentData = {
    attendancePercent: 90, 
    attended: 45, 
    className: "8", 
    classId: "123456",
    division: "A",
    name: "Akshay",
    rollNo: 101, 
    totalClasses: 50, 
    absent: 5, 
    id: "student123", 
    password: "password123", 
    subjects: ["Math", "Science", "History"], 
};

  return (
    <div className="mt-4 w-full">
      <div className="mt-5 max-w- min-w-full">
        <div className="flex justify-around">
          <div className="add-optional-sub-table">
            <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
              Add Classes
            </h1>
            <DynamicTable
              data={AddClassAndSectionData}
              rowHeight={100}
              action={true}
            />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
              <AddButton buttonText={"Add subject"} onClickButton={()=> addStudentToDatabase(studentData)} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClassAndSubject;
