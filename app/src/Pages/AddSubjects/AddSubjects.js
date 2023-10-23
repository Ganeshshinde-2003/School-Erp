import React from "react";
import AddSubjectData from "../../Database/AddSubjects";
import DynamicTable from "../../Components/DynamicTable";
import "./AddSubject.css";
import AddButton from "../../Components/AddButton";
import addSubjectToDatabase from "../../api/subject";
const AddSubject = () => {
  return (
    <div className="mt-4 w-full">
      {/* <h1 className="text-center"> Add Subjects</h1> */}
      <div className="mt-5 max-w- min-w-full">
        <div className="flex justify-around">
          <div className="add-optional-sub-table">
            <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
              Add Subjects
            </h1>
            <DynamicTable
              data={AddSubjectData}
              rowHeight={100}
              action={true}
            />
            <p className="h-16 text-center font-bold text-white flex items-center justify-center">
            <AddButton buttonText={"Add subject"}  onClickButton={() => addSubjectToDatabase("10", "009", "Chemistry")} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;

