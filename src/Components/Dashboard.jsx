import React from 'react'
import "../Style/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card">
        <h2>07:30</h2>
        <p>Avg</p>
      </div>
      <div className="card">
        <h2>3</h2>
        <p>After 10:30</p>
      </div>
      <div className="card">
        <h2>4</h2>
        <p>After 10:00</p>
      </div>

      <div className="card">
        <h2>4</h2>
        <p>Absent</p>
      </div>
      <div className="card">
        <h2>2</h2>
        <p>Mark Absent</p>
      </div>
      <div className="card">
        <h2>6</h2>
        <p>Total Absent</p>
      </div>

      <div className="card">
        <h2>1</h2>
        <p>Prev. Leave Balance</p>
      </div>
      <div className="card">
        <h2>1</h2>
        <p>Admissible Leave</p>
      </div>
      <div className="card">
        <h2>2</h2>
        <p>Total Leave Balance</p>
      </div>

      <div className="card salary monthly">
        <h2>50000</h2>
        <p>Monthly Salary</p>
      </div>
      <div className="card salary deduct">
        <h2>10000</h2>
        <p>Salary Deduct</p>
      </div>
      <div className="card salary net">
        <h2>40000</h2>
        <p>Net Salary</p>
      </div>
    </div>
  )
}
