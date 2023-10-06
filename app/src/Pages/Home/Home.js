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
          <h1 className="text-center font-bold text-white	">
            Today's Birthday's
          </h1>
          <DynamicTable data={Birthdays} />
        </div>
        <div className="attendance-table">
          <h1 className="text-center font-bold text-white	">Attendance Count</h1>
          <DynamicTable data={Attendance} />
        </div>
      </div>
    </div>
  );
};

export default Home;
