import React from "react";
import Birthdays from "../../Database/Birthday";
import DynamicTable from "../../Components/DynamicTable";
import Attendance from "../../Database/Attendance";
import  expense from  "../../Database/MontlyExpense.js";
import fees from "../../Database/Totalfee.js"; 
import "./Home.css";
const Home = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-around">
        <div className="birthdays-table">
          <h1 className="h-8 text-center font-bold text-white flex items-center justify-center">
            Today's Birthday's
          </h1>
          <DynamicTable data={Birthdays} rowHeight={8} action={false} />
        </div>
        <div className="attendance-table">
          <h1 className="h-8 text-center font-bold text-white	flex items-center justify-center">
            Attendance Count</h1>
          <DynamicTable data={Attendance} rowHeight={8} action={false} />
        </div>
       </div>
      <br></br>
       <div className="flex justify-around">
       <div className="birthdays-table">
        <h1 className="h-8 text-center font-bold text-white flex items-center justify-center">
           Monthly Expense
          </h1>
          <DynamicTable data={expense} rowHeight={8} action={false} />
        </div>
        <div className="fees">
           <div className="flex items-center justify-center border ">
            <div className="text-center font-bold bg-[rgba(164,194,240,1)] px-4">
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
