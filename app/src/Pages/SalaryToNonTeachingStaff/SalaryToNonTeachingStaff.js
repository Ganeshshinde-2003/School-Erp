import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import { Oval } from "react-loader-spinner";
import { getNonTeachingStaffSalaryDataFromDatabase } from "../../api/StaffManagement/SalaryToNonTeachingStaff";

const NonTeachingStaffSalaryTable = () => {
    const [nonTeachingStaffSalaryData, setNonTeachingStaffSalaryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [monthName, setMonthName] = useState(""); // Set an empty string initially
  
    const fetchData = (initialMonth) => {
      setIsLoading(true);
      getNonTeachingStaffSalaryDataFromDatabase(initialMonth)
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
      // Get the abbreviated month
      const abbreviatedMonth = new Date().toLocaleString('default', { month: 'short' });
      
      // Set the initial state for monthName
      setMonthName(abbreviatedMonth);
      console.log("monthname",monthName);
  
      // Fetch data initially with the current month
      fetchData(abbreviatedMonth);
    }, []);
    
    const handleMonthChange = (e) => {
      const selectedMonth = e.target.value;
      setMonthName(selectedMonth);
      fetchData(selectedMonth);
    };

  return (
    <div className="mt-4 w-full ov-sc">
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

                <select
                id="teacherMonthSelect"
                className="text-black ml-4"
                name="teacherMonthSelect"
                value={monthName}
                onChange={handleMonthChange}
              >
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
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
