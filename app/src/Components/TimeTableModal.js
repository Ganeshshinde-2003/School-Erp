// TimetableModal.jsx

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal from "./Modal";
import { getTimetableData } from "../api/Timetable/Timetable";
import DynamicTable from "../Components/DynamicTable";

function extractSectionCode(section) {
  const matches = section.match(/\d+[A-Z]/);
  return matches ? matches[0] : null;
}

const TimetableModal = ({ isOpen, closeModal, section }) => {
  const [timetableData, setTimetableData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (section) {
      // Fetch timetable data for the selected section
      var className = extractSectionCode(section);
      getTimetableData(className)
        .then((data) => {
          setTimetableData(data.timetableData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching timetable data:", error);
          setIsLoading(false);
        });
    }
  }, [section]);

  const handleAddButtonClick = (day) => {
    // Handle logic for adding new entries for the specific day
    console.log(`Add button clicked for ${day}`);
  };

  const handleEditButtonClick = (day, startTime) => {
    // Handle logic for editing the selected entry
    console.log(`Edit button clicked for ${day} at ${startTime}`);
  };

  const handleDeleteButtonClick = (day, startTime) => {
    // Handle logic for deleting the selected entry
    console.log(`Delete button clicked for ${day} at ${startTime}`);
  };

  const generateTable = () => {
    if (!timetableData) {
      return null;
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    const allStartTimes = Array.from(
      new Set(
        days
          .flatMap((day) => Object.keys(timetableData[day] || {}))
      )
    );

    const tableData = [];

    // Generate table rows
    for (const startTime of allStartTimes) {
      const rowData = { startTime };

      // Populate data and add "Edit" and "Delete" buttons for each day
      for (const day of days) {
        const entry = timetableData[day] && timetableData[day][startTime];
        rowData[day] = entry ? (
          <div className="flex items-center space-x-2">
            <div>
              &nbsp;{`${entry.subject}`}&nbsp;
              <br></br>
              &nbsp;{`${entry.startTime} - ${entry.endTime}`}&nbsp;
              <br></br>
              <div className="flex">
              <button className="bg-blue-500 text-white px-2 py-1 rounded-full" onClick={() => handleEditButtonClick(day, startTime)}>
                Edit
              </button>&nbsp;
              <button className="bg-red-500 text-white px-2 py-1 rounded-full" onClick={() => handleDeleteButtonClick(day, startTime)}>
                Delete
              </button>
              </div>
            </div>
          </div>
        ) : "";

      }

      tableData.push(rowData);
    }

    // Add a row with "+" buttons under each day
    const addButtonsRow = {
      startTime: (
        <div className="flex items-center justify-center">
          {/* <button className="bg-green-500 text-white px-5 py-1 rounded-full" onClick={() => handleAddButtonClick("all")}>
            + Add Class
          </button> */}
        </div>
      ),
      ...days.reduce((acc, day) => {
        acc[day] = (
          <div className="flex items-center justify-center space-x-2">
            <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm" onClick={() => handleAddButtonClick(day)}>
              <span className="bg-green-500 text-white px-1 py-1 rounded-full">+</span>&nbsp;Add class
            </button>
          </div>
        );
        return acc;
      }, {}),
    };

    tableData.push(addButtonsRow);

    return tableData;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Timetable Modal"
    >
      <div className="modal-content">
        <h2>Timetable for {section}</h2>
        {isLoading ? (
          <Oval
            height={40}
            width={40}
            color="#343dff"
            wrapperStyle={{ textAlign: "center" }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#343fff"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : timetableData ? (
          <React.Fragment>
            <DynamicTable
              data={generateTable()}
              rowHeight={150}
              action={false}
              ispanding={false}
            />
          </React.Fragment>
        ) : (
          <div>No timetable data available</div>
        )}
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default TimetableModal;
