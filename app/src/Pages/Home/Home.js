import React from "react";
import Birthdays from "../../Database/Birthday";
import DynamicTable from "../../Components/DynamicTable";
import Attendance from "../../Database/Attendance";
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
    </div>
  );
};

export default Home;
