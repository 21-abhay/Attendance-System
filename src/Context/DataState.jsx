import { useState } from "react";
import dataContext from "./DataContext";

const DataState = (props)=>{
    const [rows, setRows] = useState([]);
    const [EName, setEName] = useState([]);
    const [Designation, setDesignation] = useState([]);
    const [InTime, setInTime] = useState([]);
    const [OutTime, setOutTime] = useState([]);
    const [TotalTime, setTotalTime] = useState([]);
    const [Avg, setAvgs] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [inTime_10,setInTime_10]= useState([]); 
    const [inTime_10_30,setInTime_10_30]= useState([]); 

    const fetchData = (() => {
        fetch("/attendance.csv")
        .then((response) => response.text())
        .then((csvText) => {
            const lines = csvText.split("\n").map((line) => line.split(","));
            setRows(lines);
        });
    })
    
    const fetchEname = ()=>{
    console.log("Fetch Ename : \n")
    let arr = new Array();
    for (let i = 1; i < rows.length;) {
      arr.push(rows[i][0]);
      i = i+3;
    }
    setEName(arr);
    // console.log(arr)
    }
    const fetchDesignation = ()=>{
        console.log("Fetch Designation : \n")
        let arr = new Array();
        for (let i = 1; i < rows.length;) {
        arr.push(rows[i][1]);
        i = i+3;
        }
        setDesignation(arr);
        // console.log(arr)
    }
    const fetchInTime = ()=>{
        console.log("Fetch In Time : \n")
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
        console.log("Fetch Out Time : \n")
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
        console.log("Fetch Total Time : \n")
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
        console.log("Conver to Minutes : \n")
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
        console.log("calculate averages : \n");
        // toMin();
        let arr = new Array();
        for (let i = 0; i < minutes.length; i++) {
        let a = 0;
        let zero = 0;
        for (let j = 0; j < minutes[i].length; j++) {
            if(minutes[i][j]==0){
            zero = zero+1;
            }
            else{
            a = a+minutes[i][j];
            }
        }
        a = a/(minutes[i].length - zero);
        const h = Math.floor(a / 60);
        const m = Math.floor(a % 60);
        arr.push(`${h}:${m}`);
        // arr.push(a);
        }
        // console.log(arr);
        setAvgs(arr);
        // console.log(Avg); 
    }
    const count_InTime = ()=>{
        console.log("Count In Time extend 10:00 \n")
        let arr_10_30 = new Array();
        let arr_10 = new Array();
        for (let i = 0; i < InTime.length; i++) {
        let c_10_30 = 0;
        let c_10 = 0;
        for (let j = 0; j < InTime[i].length; j++) {
            if(InTime[i][j].includes(":")){
            const [h, m] = InTime[i][j].split(":");
            let min = Number(h*60)+Number(m);
            if(min>630){
                c_10_30 = c_10_30 + 1;
            }
            else if(min>600){
                c_10 = c_10+1;
            }
            }
        }
        arr_10.push(c_10+c_10_30);
        arr_10_30.push(c_10_30);
        }
        // console.log(arr_10);
        // console.log(arr_10_30);
        setInTime_10(arr_10);
        setInTime_10_30(arr_10_30);
    };

    return(
        <dataContext.Provider value={{rows,EName,Designation,InTime,OutTime,TotalTime,minutes,Avg,inTime_10,inTime_10_30,fetchData,fetchDesignation,fetchEname,fetchInTime,fetchOutTime,fetchTotalTime,calAvg,toMin,count_InTime}}>
            {props.children}
        </dataContext.Provider>
    )

}
export default DataState;