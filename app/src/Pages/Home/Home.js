import React from "react";
import Birthdays from "../../Database/Birthday";
import DynamicTable from "../../Components/DynamicTable";
import "./Home.css";
const Home = () => {
  return (
    <div className="mt-5">
      <div className="birthdays">
        <h1 className="text-center font-bold text-white	">Today's Birthday's</h1>
        <DynamicTable data={Birthdays} />
      </div>
    </div>
  );
};

export default Home;
