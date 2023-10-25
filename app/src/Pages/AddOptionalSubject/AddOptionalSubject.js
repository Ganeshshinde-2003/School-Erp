import React from "react";
import AddOptionalSubjectData from "../../Database/AddOptionalSubject";
import DynamicTable from "../../Components/DynamicTable";
import "./AddOptionalSubject.css";
import AddButton from "../../Components/AddButton";
import { addTeacherToDatabase }from "../../api/teacher"

const AddOptionalSubject = () => {

  // this is a sample object foermate that should be pass to the addTeacherToDatabase(object:teacherData)
  const teacherData = {
    id:"6545678f",
    name: "salman khan",
    password:"8765rtfg",
    className: ["7A","6D","8B","10A"],
    subjectName: ["Mathematics","hindi","phy","che"],
    subjectId: ["math123","hindi7654","phy56","che34"], 
};
  return (
    <div className="mt-4 w-full">
      <h1 className="text-center"> Add Optional Subjects</h1>
      <div className="mt-5 max-w- min-w-full">
        <div className="flex justify-around">
          <div className="add-optional-sub-table">
            <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
              Add Subjects
            </h1>
            <DynamicTable
              data={AddOptionalSubjectData}
              rowHeight={100}
              action={true}
            />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
              <AddButton buttonText={"Add subject"} onClickButton={()=> addTeacherToDatabase(teacherData)}/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOptionalSubject;
