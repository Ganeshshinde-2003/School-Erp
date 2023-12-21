import React, { useState } from "react";
import "../Pages/PutAttendance/PutAttendancs.css";

const DatePicker = ({ minDate, maxDate }) => {
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
    const dayIndex = new Date(year, month, 1).getDay();
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
      { result: [], current: start }
    );

    return result;
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelectedDate = (event) => {
    if (event.target.id === "day") {
      setSelectedDate(
        new Date(
          currentYear,
          currentMonth,
          event.target.getAttribute("data-day")
        )
      );
    }
    console.log(selectedDate);
  };

  const getTimeFromState = (_day) => {
    return new Date(currentYear, currentMonth, _day).getTime();
  };
  return (
    <div className="pickerWrapper">
      <div className="headerDate">
        <button
          onClick={prevMonth}
          disabled={minDate?.getTime() > getTimeFromState(1)}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <p className="month-name">
          {monthNames[currentMonth]} {currentYear}
        </p>
        <button
          onClick={nextMonth}
          disabled={
            maxDate?.getTime() <
            getTimeFromState(getNumberDaysInMonth(currentYear, currentMonth))
          }
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
      <div className="bodyDate">
        <div className="sevenColGrid">
          {getSortedDays(currentYear, currentMonth).map((day) => (
            <p className="month-days">{day}</p>
          ))}
        </div>
        <div className="sevenColGrid" onClick={handleSelectedDate}>
          {range(1, getNumberDaysInMonth(currentYear, currentMonth) + 1).map(
            (day) => (
              <p
                id="day"
                data-day={day}
                className={`
                  ${
                    selectedDate?.getTime() ===
                    new Date(currentYear, currentMonth, day).getTime()
                      ? "active"
                      : ""
                  } 
                  ${
                    day === new Date().getDate()
                      ? currentMonth === new Date().getMonth()
                        ? "current-date"
                        : ""
                      : ""
                  }`}
              >
                {day}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
