import React from 'react'
import "../Style/KeyPoints.css"

export default function KeyPpints() {
    const points = [
    "Employees must log in attendance before 10:00 AM. and also keep maitain the working hours of 8.5 atleast",
    "Late arrivals will be considered as half-day.",
    "If failed to achieve average working hours of 8.5, Salary will be deducted on the basis of arrival time of each day",
    "Arrival after 10:30 mark as half day and Arrival after 10:00 three times marks as half day (effective if Average working hours is less than 8.5 hrs"
    // "Salary will be credited by the 7th of each month.",
    // "Admin panel access is restricted to authorized users only.",
    // "Data will be updated in real-time across all systems."
  ];
  return (
    <div className="notes-container">
      <h2 className="notes-heading">📌 Points to be Noted</h2>
      <ul className="notes-list">
        {points.map((point, index) => (
          <li key={index} className="notes-item">
            <span className="pointer"></span>
            <p>{point}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
