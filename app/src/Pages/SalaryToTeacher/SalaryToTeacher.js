import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import { Oval } from "react-loader-spinner";
import { getTeacherAndSalaryDataFromDatabase } from "../../api/StaffManagement/SalaryToTeachers";

const TeacherSalaryTable = () => {
  const [teacherSalaryData, setTeacherSalaryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchData = (selectedMonth) => {
    setIsLoading(true);
    getTeacherAndSalaryDataFromDatabase(selectedMonth)
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
    // Get the abbreviated month
    const abbreviatedMonth = new Date().toLocaleString('default', { month: 'short' });

    // Set the initial state for selectedMonth
    setSelectedMonth(abbreviatedMonth);

    // Fetch data initially with the current month
    fetchData(abbreviatedMonth);
  }, []);

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    fetchData(selectedMonth);
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
            value={selectedMonth}
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
                data={teacherSalaryData}
                rowHeight={100}
                action={false}
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
