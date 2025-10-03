import React, {useState, useContext, useEffect} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import dataContext from '../Context/DataContext.js';
// import "../Style/User.css";
import "../Style/Dashboard.css";

export default function User() {
  const { name } = useParams();
  const [index,setIndex] = useState(0);
  const {check,rows,setCheck,MonthList,setMonth,Month,Holidays,EName,Designation,AbsentDays,InTime,OutTime,TotalTime,minutes,Avg,inTime_10,inTime_10_30,Absent,Mark_Absent,Mark_AbsentDays,Admissible_leave,Pre_leave,count_markAbsent,fetchData,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,calAvg,toMin,count_InTime} = useContext(dataContext);

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
      setIndex(EName.findIndex(ele=>ele.includes(name)));
      // setMonth(month);
      // console.log(" Index : ",EName.findIndex(ele=>ele.includes(name)));
      
    },[name,EName]);
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
    },[Avg]);
    useEffect(()=>{
      count_markAbsent();
    },[inTime_10,inTime_10_30]);

    const print = ()=>{
      console.log(Pre_leave[index] ? ((Absent[index] + Mark_Absent[index]) > (Pre_leave[index][2]+Admissible_leave[index]) ? (Absent[index] + Mark_Absent[index]) - (Pre_leave[index][2]+Admissible_leave[index]) : (Pre_leave[index][2]+Admissible_leave[index]) - (Absent[index] + Mark_Absent[index])) : "null" );
      
    }

    const [selected, setSelected] = useState("");
    
      const handleChange = (e) => {
        setSelected(e.target.value); // get selected value
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(selected){
          setCheck(true)
          setMonth(selected)
          console.log("Selected value:", selected);
        }
      };

  return (
    <div className='container'>
      <h1>{name}</h1>
      <form onSubmit={handleSubmit}>
          <label htmlFor="role">Select Month: </label>
          <select id="role" value={selected} onChange={handleChange} required>
            <option value="">{Month ? Month : "-- Select --"}</option>
            {MonthList.map((ele,i)=>(
              <option value={ele} key={i}>{ele}</option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
        {rows.length >1 && index >=0? 
        <div>
          <h1>{Designation[index]}</h1>
          <div className="user_att table-con">
            <table className='table' >
              <tbody className='col tbody'>
                <tr className='row header '>
                  {/* <td className="cell big_cell sticky_cell">Name</td>
                  <td className="cell big_cell">Designation</td> */}
                  <td className="cell big_cell sticky_cell">Date</td>
                  {index >= 0 && InTime[index].length ? (Array.from({ length: InTime[index].length || 0 }).map((ele, i) => (
                    <td key={i} className={Holidays?.includes(`${i+1}`) ? "cell small_cell" : "cell small_cell"}>{i+1}</td>
                  ))) : null}
                </tr>
                <tr className='row body'>
                  {/* <td className="cell big_cell sticky_cell">{name}</td>
                  <td className="cell big_cell">{Designation[index]}</td> */}
                  <td className="cell big_cell sticky_cell">In Time</td>
                  {index >= 0 && InTime[index].length ? (Array.from({ length: InTime[index].length }).map((ele, i) => (
                    <td key={i} className={Holidays?.includes(`${i+1}`) ? "cell small_cell holidays" : `${AbsentDays[index]?.includes(i+1) ? "cell small_cell absent" : `${Mark_AbsentDays[index]?.includes(i) && Avg[index] < "08:25" ? "cell small_cell mark_absentDays" : "cell small_cell hello"}`}`}>{InTime[index][i]}</td>
                  ))):null}
                </tr>
                <tr className='row body'>
                  {/* <td className="cell big_cell sticky_cell">{name}</td>
                  <td className="cell big_cell">{Designation[index]}</td> */}
                  <td className="cell big_cell sticky_cell">Out Time</td>
                  {index >= 0 && InTime[index].length ? (Array.from({ length: OutTime[index].length }).map((ele, i) => (
                    <td key={i} className={Holidays?.includes(`${i+1}`) ? "cell small_cell holidays" : `${AbsentDays[index]?.includes(i+1) ? "cell small_cell absent" : `${Mark_AbsentDays[index]?.includes(i) && Avg[index] < "08:25"  ? "cell small_cell mark_absentDays" : "cell small_cell hello"}`}`}>{OutTime[index][i]}</td>
                  ))):null}
                </tr>
                <tr className='row body'>
                  {/* <td className="cell big_cell sticky_cell">{name}</td>
                  <td className="cell big_cell">{Designation[index]}</td> */}
                  <td className="cell big_cell sticky_cell">Total Time</td>
                  {index >= 0 && InTime[index].length ? (Array.from({ length: TotalTime[index].length }).map((ele, i) => (
                    <td key={i} className={Holidays?.includes(`${i+1}`) ? "cell small_cell holidays" : `${AbsentDays[index]?.includes(i+1) ? "cell small_cell absent" : `${Mark_AbsentDays[index]?.includes(i) && Avg[index] < "08:25"  ? "cell small_cell mark_absentDays" : "cell small_cell hello"}`}`}>{TotalTime[index][i]}</td>
                  ))):null}
                </tr>
              </tbody>
            </table>
          </div>
          <div className='container'>
            <div className="dashboard">
              <div className="card">
                <h2>{Avg[index]}</h2>
                <p>Avg</p>
              </div>
              <div className="card">
                <h2>{inTime_10_30[index]}</h2>
                <p>After 10:30</p>
              </div>
              <div className="card">
                <h2>{inTime_10[index]}</h2>
                <p>After 10:00</p>
              </div>

              <div className="card userabsent">
                <h2>{Absent[index]}</h2>
                <p>Absent</p>
              </div>
              <div className="card usermarkabsent">
                <h2>{Mark_Absent[index]}</h2>
                <p>Mark Absent</p>
              </div>
              <div className="card">
                <h2>{`${Absent[index] + Mark_Absent[index]}` }</h2>
                <p>Total Absent</p>
              </div>

              <div className="card">
                <h2>{Pre_leave[index] ? Pre_leave[index+1][2] : null}</h2>
                <p>Prev. Leave Balance</p>
              </div>
              <div className="card">
                <h2>{Admissible_leave[index]}</h2>
                <p>Admissible Leave</p>
              </div>
              <div className="card">
                <h2>{Pre_leave[index] ? Number(Pre_leave[index+1][2])+Number(Admissible_leave[index]) : null}</h2>
                <p>Total Leave Balance</p>
              </div>
              <div className="card">
                <h2>{Pre_leave[index] ? Math.max(Number(Pre_leave[index+1][2])+Number(Admissible_leave[index]) - Absent[index]-Mark_Absent[index], 0) : null}</h2>
                <p>Leave Balance</p>
              </div>

              <div className="card salary monthly">
                <h2>-</h2>
                <p>Monthly Salary</p>
              </div>
              <div className="card salary deduct">
                <h2>{Pre_leave[index] ? Math.min(Number(Pre_leave[index+1][2])+Number(Admissible_leave[index]) - Absent[index]-Mark_Absent[index], 0) : null}</h2>
                <p>Salary Deduct</p>
              </div>
              <div className="card salary net">
                <h2>-</h2>
                <p>Net Salary</p>
              </div>
            </div>
          </div>
        </div> 
        : 
        `${index<0 ? "Your attendance is not present for this months" : "Kindly Select the Month"}`}
      
    </div>
  )
}
