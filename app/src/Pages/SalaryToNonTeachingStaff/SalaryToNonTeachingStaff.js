import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import { Oval } from "react-loader-spinner";
import { getNonTeachingStaffSalaryDataFromDatabase } from "../../api/StaffManagement/SalaryToNonTeachingStaff";

const NonTeachingStaffSalaryTable = () => {
  const [nonTeachingStaffSalaryData, setNonTeachingStaffSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    getNonTeachingStaffSalaryDataFromDatabase()
      .then((data) => {
        setNonTeachingStaffSalaryData(data);
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
                Salary To be Paid
              </h1>
              <DynamicTable
                data={nonTeachingStaffSalaryData}
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

export default NonTeachingStaffSalaryTable;
