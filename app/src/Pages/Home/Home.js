import React, { useState } from "react";
import Birthdays from "../../Database/Birthday";
import DynamicTable from "../../Components/DynamicTable";
import Attendance from "../../Database/Attendance";
import expense from "../../Database/MontlyExpense.js";
import fees from "../../Database/Totalfee.js";
import "./Home.css";
import BarGraph from "../../Components/BarGraph";
import BarGraphData from "../../Database/BarGraphData";
import PieGraph from "../../Components/PieGraph";
const Home = () => {
  // Bar Chart
  const [attendanceBarGraphData, setAttendanceBarGraphData] = useState({
    labels: BarGraphData.map((data) => data.class),
    datasets: [
      {
        label: "Student Attendance",
        data: BarGraphData.map((data) => data.attendance),
        backgroundColor: ["red", "#ecf0f1", "#50AF95", "#F3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // Pie Chart
  const [expenseData, setExpenseData] = useState({
    labels: ["Expense", "Income"],
    datasets: [
      {
        label: "Expense",
        data: [2000, 14000],
        backgroundColor: ["red", "#50AF95"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="mt-5 flex flex-col w-full	items-center">
      <div className="flex justify-around w-full">
        <div className="birthdays-table">
          <h1 className="h-8 text-center font-bold text-white flex items-center justify-center">
            Today's Birthday's
          </h1>
          <DynamicTable data={Birthdays} rowHeight={8} action={false} />
        </div>
        <div className="attendance-table">
          <h1 className="h-8 text-center font-bold text-white	flex items-center justify-center">
            Attendance Count
          </h1>
          <DynamicTable data={Attendance} rowHeight={8} action={false} />
        </div>
      </div>
      <div className="w-3/4">
        <BarGraph data={attendanceBarGraphData} />
      </div>
      <br></br>
      <div className="flex justify-around w-full">
        <div className="birthdays-table">
          <h1 className="h-8 text-center font-bold text-white flex items-center justify-center">
            Monthly Expense
          </h1>
          <DynamicTable data={expense} rowHeight={8} action={false} />
        </div>
        <div className="w-1/4	">
          <PieGraph data={expenseData} />
        </div>
        <div className="fees">
          <div className="flex items-center justify-center border "> 

            <div className="text-center font-bold bg-[rgba(181, 181, 181, 1)] px-4">
              <h2>Total Fees</h2>
              <h2>Collected</h2>
            </div>
            <h2 className="px-3">{fees.totalFeesCollected}/-</h2>
          </div>
          <div className="flex items-center justify-cente border">
            <div className="text-center font-bold  bg-blue-500  px-4 text-white">
              <h2>Total Fees</h2>
              <h2>Collected</h2>
            </div>
            <h2 className="px-3">{fees.totalFeesToCollect}/-</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
