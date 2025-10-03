import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
import "../Style/AttendanceTable.css";

const AttendanceTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/Attendance-System/Monthly_Attendance/attendance.csv")
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split("\n").map((line) => line.split(","));
                setData(lines);
            });
  }, []);
  console.log(data)
  if (data.length === 0) return <p>Loading attendance data...</p>;

  return (
    <div className="table-container">
      <h2>📅 Employee Attendance Report</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((val, colIndex) => (
                <td key={colIndex}>{val || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
