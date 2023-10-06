import React from "react";
import "./DynamicTable.css";
const DynamicTable = ({ data }) => {
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
              className="py-2 px-4 text-center bg-gray-200 border border-gray-300"
              key={column}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                className="py-2 px-4 border border-gray-300 text-center"
                key={column}
              >
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
