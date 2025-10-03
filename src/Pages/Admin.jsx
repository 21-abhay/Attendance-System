import React, {useState, useContext, useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import dataContext from '../Context/DataContext.js';
import userContext from '../Context/UserContext.js';
import '../Style/Admin.css';
import { setSessionItem, getSessionItem } from "../Utility/Session.js";

export default function Admin() {
    const {check,setCheck,Holidays,AbsentDays,Mark_AbsentDays,rows,Month,setMonth,MonthList,EName,Designation,InTime,OutTime,TotalTime,minutes,Avg,inTime_10,inTime_10_30,fetchData,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,calAvg,toMin,count_InTime,count_markAbsent} = useContext(dataContext);
    const {role,userId,setUserId,password,isLoggedIn} = useContext(userContext)
    const navigate = useNavigate();

    useEffect(()=>{
      const storedUser = sessionStorage.getItem("user");
      if (storedUser && role == 'admin') {
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
    // console.log("fetched data: ",rows)
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
    // console.log(rows.length);
  },[inTime_10,inTime_10_30]);

  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value); // get selected value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selected){
      setCheck(true)
      setMonth(selected)
      // console.log("Selected value:", selected);
    }
  };

  return (
    <div>
      <h1>Attendance Records</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="role">Select Month : </label>
          <select id="role" value={selected} onChange={handleChange} required>
            <option value="">{Month ? Month : "-- Select --"}</option>
            {MonthList.map((ele,i)=>(
              <option value={ele} key={i}>{ele}</option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      {rows.length>1 ? 
        <div>
          <h2>For the month of {Month}</h2>
            <div className="table-con">
            <table className='table'>
              <tbody className="col tbody">
                {rows.map((row, i) => (
                  <tr key={i} className={i==0 ? "row header": "row body"}>
                      {/* <i>{row[i]}</i> */}
                    {row.map((cell, j) => (
                      <td key={j} className={j<3 ? `${j==0 ? "cell big_cell sticky_cell" : "cell big_cell"}`
                      : 
                      `${Holidays?.includes(`${j-2}`)  ? "cell small_cell holidays" : `${AbsentDays[Math.floor((i-1)/3)]?.includes(j-2) ? "cell small_cell absent" : `${Mark_AbsentDays[Math.floor((i-1)/3)]?.includes(j-3) && Avg[Math.floor((i-1)/3)] < "08:25"  ? "cell small_cell mark_absentDays" : "cell small_cell hello"}`}`}`}>
                        {/* {cell} */}
                        {j==0 & i>0 ? <Link to={`/user/${cell}`}>{cell}</Link> : `${cell}`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <h1><Link to="/admin/stats"><button className='btn'>Stats</button></Link></h1>
        </div> 
        : 
        "Select the month"}
      
    </div>
  )
}
