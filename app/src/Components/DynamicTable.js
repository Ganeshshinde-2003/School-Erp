import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./DynamicTable.css";
import AddButton from "./AddButton";

const DynamicTable = ({ data, rowHeight, action, handleAction, locate }) => {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const [siNo, setSiNo] = useState(1);

  useEffect(() => {
    // Update SI.No when data changes
    setSiNo(1);
  }, []);

  const hiddenColumns = ["id"];
  const columns = Object.keys(data[0]).filter(
    (column) => !hiddenColumns.includes(column)
  );

  return (
    <table className="min-w-full border-collapse">
      <thead className="table-cols">
        <tr>
          <th
            className={`h-[${rowHeight}px] py-2 px-4 text-center color-white bg-gray-200 border border-gray-300`}
          >
            SI.No
          </th>

          {columns.map((column) => (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
              key={column}
            >
              {column}
            </th>
          ))}
          {action && (
            <th
              className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}
            >
              Edit/Delete
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={`h-[${rowHeight}px]`}>
            <td className="py-2 px-4 border border-gray-300 text-center">
              {siNo + rowIndex}
            </td>
            {columns.map((column) => (
              <td
                className="py-2 px-4 border border-gray-300 text-center"
                key={column}
              >
                {row[column]}
              </td>
            ))}
            {action && (
              <td
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}
              >
                <div className="flex items-center justify-around">
                  <FaEdit
                    onClick={() => handleAction("edit", row.id)} // Pass 'edit' action and document ID
                    className="cursor-pointer text-blue-500 mr-2"
                  />

                  <ImCross
                    onClick={() => handleAction("delete", row.id)}
                    className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
                  />
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
