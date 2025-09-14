import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import dataContext from '../Context/DataContext.js';
import '../Style/Admin.css';

export default function Admin() {
    const {rows,EName,Designation,InTime,OutTime,TotalTime,minutes,Avg,inTime_10,inTime_10_30,fetchData,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,calAvg,toMin,count_InTime} = useContext(dataContext);
  useEffect(()=>{
    fetchData();
  },[]);
  useEffect(()=>{
    fetchDesignation();
    fetchEname();
    fetchInTime();
    fetchOutTime();
    fetchTotalTime();
  },[rows]);
  useEffect(()=>{
    toMin();
  },[TotalTime])
  useEffect(()=>{
    calAvg();
  },[minutes]);
  useEffect(()=>{
    count_InTime();
  },[InTime]);
  return (
    <div>
      <h1>CSV Data</h1>
      <div className="table">
      <table>
        <tbody className="col">
          {rows.map((row, i) => (
            <tr key={i} className={i==0 ? "row header": "row body"}>
                {/* <i>{row[i]}</i> */}
              {row.map((cell, j) => (
                <td key={j} className={j<3 ? `${j==0 ? "cell big_cell sticky_cell" : "cell big_cell"}`: "cell small_cell"}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <h1><Link to="/admin/stats"><button className='btn'>Stats</button></Link></h1>
    </div>
  )
}
