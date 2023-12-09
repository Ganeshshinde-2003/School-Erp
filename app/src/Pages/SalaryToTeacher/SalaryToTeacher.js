import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import { Oval } from "react-loader-spinner";
import { getTeacherAndSalaryDataFromDatabase } from "../../api/StaffManagement/SalaryToTeachers";

const TeacherSalaryTable = () => {
  const [teacherSalaryData, setTeacherSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    getTeacherAndSalaryDataFromDatabase()
      .then((data) => {
        setTeacherSalaryData(data);
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
                Salary to be paid
              </h1>
              <DynamicTable
                data={teacherSalaryData}
                rowHeight={100}
                action={false} // Set action to false to hide edit and delete options
                ispanding={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSalaryTable;
