import React, { useState } from "react";
import "../Pages/PutAttendance/PutAttendancs.css";

const DatePicker = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getNumberDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getSortedDays = (year, month) => {
    const dayIndex = getNumberDaysInMonth(year, month);
    const firstHalf = days.slice(dayIndex);
    return [...firstHalf, ...days.slice(0, dayIndex)];
  };

  const range = (start, end) => {
    const length = Math.abs((end - start) / 1);
    const { result } = Array.from({ length }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1,
      }),
      { result: [], current: 0 }
    );

    return result;
  };

  return (
    <div className="pickerWrapper">
      <div className="headerDate">
        <ion-icon name="chevron-back-outline"></ion-icon>
        <p>
          {monthNames[currentMonth]} {currentYear}
        </p>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <div className="bodyDate">
        <div className="sevenColGrid">
          {getSortedDays().map((day) => (
            <p>{day}</p>
          ))}
        </div>
        <div className="sevenColGrid">
          {range(1, getNumberDaysInMonth(currentYear, currentMonth) + 1).map(
            (day) => (
              <p>{day}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
