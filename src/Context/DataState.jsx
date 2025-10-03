import { useState } from "react";
import dataContext from "./DataContext";
// import csvFile from "./assets/attendance.csv";
// import csvFile from "../assets/attendance.csv";

const DataState = (props)=>{
    const [check, setCheck] = useState(true);
    const [Month, setMonth] = useState("");
    const [MonthList, setMonthList] = useState(["Feb","Aug","Sep"]);
    const [rows, setRows] = useState([[]]);
    const [Pre_leave,setPre_leave]= useState([]);
    const [Holidays,setHolidays]= useState([]);
    const [EName, setEName] = useState([]);
    const [Designation, setDesignation] = useState([]);
    const [InTime, setInTime] = useState([[]]);
    const [OutTime, setOutTime] = useState([[]]);
    const [TotalTime, setTotalTime] = useState([[]]);
    const [Avg, setAvgs] = useState([]);
    const [minutes, setMinutes] = useState([[]]);
    const [inTime_10,setInTime_10]= useState([]); 
    const [inTime_10_30,setInTime_10_30]= useState([]); 
    const [Absent,setAbsent]= useState([]);
    const [AbsentDays,setAbsentDays]= useState([]);
    const [Admissible_leave,setAdmissible_leave]= useState([]);
    const [Mark_Absent,setMark_Absent]= useState([]);
    const [Mark_AbsentDays,setMark_AbsentDays]= useState([]);

    const fetchData = (() => {
        if(check && Month){
            const att = "/Attendance-System/Monthly_Attendance/" + Month + "_attendance.csv";
            const hol = "/Attendance-System/Monthly_Holidays/" + Month + "_Holidays.csv";
            const lev = "/Attendance-System/Monthly_leaveBalance/" +Month + "_leave_balance.csv";
            // console.log(att);
            fetch(att)
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split("\n").map((line) => line.split(","));
                setRows(lines);
            });
            fetch(lev)
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split("\n").map((line) => line.split(","));
                setPre_leave(lines);
            });
            fetch(hol)
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split("\n").map((line) => line.split(","));
                setHolidays(lines[0]);
            });
            setCheck(false);
        }
    })
    
    const fetchEname = ()=>{
        // console.log("Fetch Ename : \n")
        let arr = new Array();
        let arr1 = new Array();
        for (let i = 1; i < rows.length;) {
            arr.push(rows[i][0]);
            arr1.push(1);
            i = i+3;
        }
        setEName(arr);
        setAdmissible_leave(arr1);
        // console.log(arr)
    }
    const fetchDesignation = ()=>{
        // console.log("Fetch Designation : \n")
        let arr = new Array();
        for (let i = 1; i < rows.length;) {
            arr.push(rows[i][1]);
            i = i+3;
        }
        setDesignation(arr);
        // console.log(arr)
    }
    const fetchInTime = ()=>{
        // console.log("Fetch In Time : \n")
        let arr = new Array();
        for (let i = 1; i < rows.length;) {
            let r = new Array();
            for (let j = 3; j < rows[i].length; j++) {
                r.push(rows[i][j]);
            }
            arr.push(r)
            i= i+3
        }
        setInTime(arr);
        // console.log(arr);
    }
    const fetchOutTime = ()=>{
        // console.log("Fetch Out Time : \n")
        let arr = new Array();
        for (let i = 2; i < rows.length;) {
            let r = new Array();
            for (let j = 3; j < rows[i].length; j++) {
                r.push(rows[i][j]);
            }
            arr.push(r)
            i= i+3
        }
        setOutTime(arr);
        // console.log(arr);
    }
    const fetchTotalTime = ()=>{
        // console.log("Fetch Total Time : \n")
        let arr = new Array();
        for (let i = 3; i < rows.length;) {
            let r = new Array();
            for (let j = 3; j < rows[i].length; j++) {
                r.push(rows[i][j]);
            }
            arr.push(r)
            i= i+3
        }
        setTotalTime(arr);
        // console.log(arr);
    }
    const toMin = ()=>{
        // console.log("Conver to Minutes : \n")
        let arr = new Array();
        for (let i = 0; i < TotalTime.length; i++) {
            let a = new Array();
            for (let j = 0; j < TotalTime[i].length; j++) {
                if(TotalTime[i][j].includes(":")){
                    const [h, m] = TotalTime[i][j].split(":");
                    a.push(Number(h*60)+Number(m)); 
                }
                else{
                    a.push(0)
                }
            }
            arr.push(a);
        }
        setMinutes(arr);
        // console.log(arr);
    }
    const calAvg = ()=>{
        // console.log("calculate averages : \n");
        // toMin();
        let arr = new Array();
        let arr1 = new Array();
        let arr2 = new Array();
        for (let i = 0; i < minutes.length; i++) {
            let a = 0;
            let zero = 0;
            let ab= new Array();
            for (let j = 0; j < minutes[i].length; j++) {
                if((!Holidays.includes(`${j+1}`)) && (minutes[i][j]==0 || minutes[i][j]< 120)){
                    zero = zero+1;
                    ab.push(j+1);
                    // console.log(EName[i],"1 counter : ", j);
                    
                }
                else if(!Holidays.includes(`${j+1}`) && minutes[i][j] < 390){
                    zero = zero+0.5;
                    ab.push(j+1);
                    // console.log(EName[i],"0.5 counter : ", j);
                    
                }
                else if(!Holidays.includes(`${j+1}`)){
                    a = a+minutes[i][j];
                }
            }
            
            a = a/(minutes[i].length - ab.length - Holidays.length);
            const h = Math.floor(a / 60);
            const m = Math.floor(a % 60);
            arr.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
            arr1.push(zero);
            arr2.push(ab);

        }
        setAvgs(arr);
        setAbsent(arr1);
        setAbsentDays(arr2)
    }
    const count_markAbsent = ()=>{
        let arr = new Array();        
        let arr1 = new Array();        
        for (let i = 0; i < Avg.length; i++) {
            const [h, m] = Avg[i].split(":");
            let min = Number(h*60)+Number(m);
            let val = 0;
            if(min < 500){
                val = inTime_10_30[i]/2 + (inTime_10[i]-inTime_10_30[i])/6
                val = Math.floor(val * 2) / 2;
            }
            arr.push(val);
        }
        setMark_Absent(arr);
    }

    const count_InTime = ()=>{
        // console.log("Count In Time extend 10:00 \n")
        let arr_10_30 = new Array();
        let arr_10 = new Array();
        let arr = new Array();
        // console.log("Holidays : ",Holidays);
        
        for (let i = 0; i < InTime.length; i++) {
            let c_10_30 = 0;
            let c_10 = 0;
            let arr1 = new Array();
            for (let j = 0; j < InTime[i].length; j++) {
                if((!Holidays.includes(`${j+1}`)) && !AbsentDays[i]?.includes(j+1) && (InTime[i][j].includes(":"))){
                    // console.log(EName[i],": not holidays counter : ", j+1);
                    const [h, m] = InTime[i][j].split(":");
                    let min = Number(h*60)+Number(m);
                    if(min>630){
                        c_10_30 = c_10_30 + 1;
                        arr1.push(j);
                    }
                    else if(min>600){
                        c_10 = c_10+1;
                        arr1.push(j);
                    }
                }
            }
            arr_10.push(c_10+c_10_30);
            arr_10_30.push(c_10_30);
            arr.push(arr1)
        }
        setInTime_10(arr_10);
        setInTime_10_30(arr_10_30);
        setMark_AbsentDays(arr);
        // console.log("Marks - ",arr);
        
        // count_markAbsent();
    };

    return(
        <dataContext.Provider value={{check,setCheck,rows,Month,setMonth,MonthList,Holidays,AbsentDays,Mark_AbsentDays,EName,Designation,InTime,OutTime,TotalTime,minutes,Avg,inTime_10,inTime_10_30,Absent,Mark_Absent,Admissible_leave,Pre_leave,count_markAbsent,fetchData,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,calAvg,toMin,count_InTime}}>
            {props.children}
        </dataContext.Provider>
    )

}
export default DataState;