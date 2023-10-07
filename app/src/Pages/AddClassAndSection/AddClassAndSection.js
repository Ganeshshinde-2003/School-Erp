import React from "react";
import AddClassAndSectionData from "../../Database/AddClassAndSection";
import DynamicTable from "../../Components/DynamicTable";
import './AddClassAndSection.css'
import AddButton from "../../Components/AddButton";
const AddClassAndSubject = () => {
  return (
    <div className="mt-4">
    <div className="mt-5 max-w- min-w-full">
      <div className="flex justify-around">
        <div className="add-optional-sub-table">
          <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
            Add Subjects
          </h1>
          <DynamicTable data={AddClassAndSectionData} rowHeight={100} action={true} />
          <p className="h-16 text-center font-bold text-white flex items-center justify-center">
            <AddButton buttonText={"Add subject"} />
          </p>
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default AddClassAndSubject;