// TimetableModal.jsx

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal  from "./Modal";
import { getTimetableData } from "../api/Timetable/Timetable";
import DynamicTimeTable from "../Components/DynamicTimeTable";

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
        className = extractSectionCode(section);
       console.log(className)
       getTimetableData(className)
        .then((data) => {
          console.log(data)
          setTimetableData(data.timetableData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching timetable data:", error);
          setIsLoading(false);
        });
    }
  }, [section]);

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
          <DynamicTimeTable
            data={timetableData}
            rowHeight={100}
            action={false}
            ispanding={false}
          />
        ) : (
          <div>No timetable data available</div>
        )}
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default TimetableModal;
