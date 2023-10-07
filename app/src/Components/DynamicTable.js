import React from "react";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./DynamicTable.css";

const DynamicTable = ({ data, rowHeight, action }) => {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table className="min-w-full border-collapse">
      <thead className="table-cols">
        <tr>
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
                className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center flex items-center justify-around`}
              >
                <FaEdit className="cursor-pointer text-blue-500 mr-2" />
                <ImCross className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1" />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
