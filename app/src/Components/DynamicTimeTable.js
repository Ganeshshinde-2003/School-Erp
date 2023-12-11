import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./DynamicTable.css";
import AddButton from "./AddButton";

const DynamicTimeTable = ({
  data,
  rowHeight,
  action,
  handleAction,
  ispanding,
}) => {
  // Check if there is no data to display
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  // State for SI.No
  const [siNo, setSiNo] = useState(1);

  // Update SI.No when data changes
  useEffect(() => {
    setSiNo(1);
  }, [data]);

  // Define hidden columns
  const hiddenColumns = ["id"];

  // Sort the data based on the "Class" column
  const sortedData = [...data].sort(
    (a, b) => parseInt(a.Class) - parseInt(b.Class)
  );

  // Extract column names from the first data row
  const columns = Object.keys(sortedData[0]).filter(
    (column) => !hiddenColumns.includes(column)
  );

  return (
    <table className="min-w-full border-collapse">
      <thead className="table-cols">
        <tr>
          {/* Header for SI.No */}
          <th
            className={`h-[${rowHeight}px] py-2 px-4 text-center color-white bg-gray-200 border border-gray-300`}
          >
            SI.No
          </th>

          {/* Headers for other columns */}
          {columns.map((column) => (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
              key={column}
            >
              {column}
            </th>
          ))}

          {/* Edit/Delete header if action is enabled */}
          {action && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Edit/Delete
            </th>
          )}

          {/* Approve/disapprove header if ispanding is enabled */}
          {ispanding && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Approve/disapprove
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex} className={`h-[${rowHeight}px]`}>
            {/* SI.No column */}
            <td className="py-2 px-4 border border-gray-300 text-center">
              {siNo + rowIndex}
            </td>

            {/* Data columns */}
            {columns.map((column) => (
              <td
                className="py-2 px-4 border border-gray-300 text-center"
                key={column}
              >
                {column === "Section"
                  ? // Render buttons vertically in column direction
                    row[column].split(" ").map((buttonText, index) => (
                      <div key={index}>
                        <button
                          onClick={() =>
                            console.log("Button clicked:", buttonText)
                          }
                          className="bg-blue-500 text-white px-3 py-1 text-sm m-1 rounded"
                        >
                          {`Section ${buttonText}`}
                        </button>
                      </div>
                    ))
                  : // Render normal data for other columns
                    row[column]}
              </td>
            ))}

            {/* Edit/Delete column if action is enabled */}
            {action && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <FaEdit
                    onClick={() => handleAction("edit", row.id)}
                    className="cursor-pointer text-blue-500 mr-2"
                  />
                  <ImCross
                    onClick={() => handleAction("delete", row.id)}
                    className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
                  />
                </div>
              </td>
            )}

            {/* Approve/disapprove column if ispanding is enabled */}
            {ispanding && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => handleAction("approve", row.id)}
                    className="cursor-pointer text-white font-semibold rounded bg-green-500 px-3 py-1 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction("disapprove", row.id)}
                    className="cursor-pointer text-white font-semibold rounded bg-red-500 px-3 py-1 mr-1"
                  >
                    Disapprove
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTimeTable;
