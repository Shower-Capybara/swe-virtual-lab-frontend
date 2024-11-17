import React from "react";

interface Header<T> {
  key: keyof T; // The key that maps to a property in the data entry
  title: string; // The display name for the column
}

interface TableProps<T> {
  headers: Header<T>[]; // Array of headers
  data: T[]; // Array of data entries
}

const Table = <T,>({ headers, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.key)}
                className="py-3 px-4 text-left font-semibold text-gray-700"
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                {headers.map((header) => (
                  <td
                    key={String(header.key)}
                    className="py-3 px-4 border-b border-gray-200 text-gray-600"
                  >
                    {String(row[header.key]) || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="py-4 px-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
