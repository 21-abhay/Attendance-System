import React, {useState, useContext, useEffect} from 'react';
import dataContext from '../Context/DataContext.js';
import { Link } from 'react-router-dom';
import '../Style/Stats.css';

export default function Stats() {
    const {EName,Designation,Avg,inTime_10,inTime_10_30} = useContext(dataContext);
    
  return (
    <div className='stats'>
        <table>
            <tbody className=''>
                <tr className=''>
                    <td>S.No.</td>
                    <td>Name</td>
                    <td>Designation</td>
                    <td>Average</td>
                    <td>After 10:00</td>
                    <td>After 10:30</td>
                </tr>
             {Array.from({ length: EName.length }).map((ele, i) => (
                <tr key={i} className=''>
                    <td className=''>{i+1}</td>
                    <td className=''>{EName[i]}</td>
                    <td className=''>{Designation[i]}</td>
                    <td className=''>{Avg[i]}</td>
                    <td className=''>{inTime_10[i]}</td>
                    <td className=''>{inTime_10_30[i]}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h1><Link to={'/admin'}><button className="btn">Admin</button></Link></h1>
    </div>
  )
}
