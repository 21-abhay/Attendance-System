import React, {useState, useContext, useEffect} from 'react';
import dataContext from '../Context/DataContext.js';
import {useNavigate, Link } from 'react-router-dom';
import '../Style/Stats.css';

export default function Stats() {
    const {rows,Month,setMonth,TotalTime,minutes,EName,InTime,Designation,Avg,inTime_10,inTime_10_30,Absent,Mark_Absent,fetchData,Admissible_leave,Pre_leave,count_markAbsent,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,toMin,calAvg,count_InTime} = useContext(dataContext);
    const navigate = useNavigate();

    useEffect(()=>{
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        fetchData();
      }
      else{
        navigate('/login')
      }
    },[Month])

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
    },[InTime,Avg]);
    useEffect(()=>{
      count_markAbsent();
    },[inTime_10,inTime_10_30]);
    
  return (
    <div className='stats'>
      <h1>Stats for the month of {Month}</h1>
        <table className='table-con'>
            <tbody className=''>
                <tr className=''>
                    <td>S.No.</td>
                    <td>Name</td>
                    <td>Designation</td>
                    <td>Average</td>
                    <td>After 10:00</td>
                    <td>After 10:30</td>
                    <td>No. of Days Absent</td>
                    <td>No. of Days Mark Absent</td>
                    <td>Total Absent</td>
                    <td>Previous leave balance</td>
                    <td>Admisible leave</td>
                    <td>leave Balance now</td>
                </tr>
             {Array.from({ length: EName.length }).map((ele, i) => (
                <tr key={i} className=''>
                    <td className=''>{i+1}</td>
                    <td className=''><Link to={`/user/${EName[i]}`}>{EName[i]}</Link></td>
                    <td className=''>{Designation[i]}</td>
                    <td className=''>{Avg[i]}</td>
                    <td className=''>{inTime_10[i]}</td>
                    <td className=''>{inTime_10_30[i]}</td>
                    <td className=''>{Absent[i]}</td>
                    <td className=''>{Mark_Absent[i]}</td>
                    <td className=''>{`${Absent[i] + Mark_Absent[i]}`}</td>
                    <td className=''>{Pre_leave[i] ? Pre_leave[i+1][2] : null}</td>
                    <td className=''>{Admissible_leave[i]}</td>
                    {/* <td className=''>{Math.max((Pre_leave[i+1][2]+Admissible_leave[i]) - (Absent[i] + Mark_Absent[i]), 0)}</td> */}
                </tr>
            ))}
            </tbody>
        </table>
        <h1><Link to={'/admin'}><button className="btn">Admin</button></Link></h1>
    </div>
  )
}
