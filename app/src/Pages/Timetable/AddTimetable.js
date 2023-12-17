// TimetableTable.jsx

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { getTimetableTable } from "../../api/Timetable/Timetable";
import DynamicTimeTable from "../../Components/DynamicTimeTable";
import TimetableModal from "../../Components/TimeTableModal";

const TimetableTable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    getTimetableTable()
      .then((data) => {
        setTimetableData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (section) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSection(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4 w-full ov-sc">
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
                Timetable Table
              </h1>
              <DynamicTimeTable
                data={timetableData}
                rowHeight={100}
                action={false}
                ispanding={false}
                onSectionClick={openModal} // Add this prop
              />
            </div>
          )}
        </div>
      </div>

      {/* Render the modal */}
      {selectedSection && (
        <TimetableModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          // timetableData={/* Get timetable data for the selected section */}
        />
      )}
    </div>
  );
};

export default TimetableTable;
