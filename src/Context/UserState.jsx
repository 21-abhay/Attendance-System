import { useState } from "react";
import userContext from "./UserContext";

const UserState = (props)=>{
      const [users, setUsers] = useState([]);
      const [userId, setUserId] = useState("");
      const [password, setPassword] = useState("");
      const [role, setRole] = useState("");
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const fetchUser = ()=>{
        if(!isLoggedIn){
            fetch("/Attendance-System/Credentials/Credential.csv")
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split("\n").map((line) => line.split(","));
                setUsers(lines);
            });
        }
      }
    
    return(
        <userContext.Provider value={{fetchUser,role,setRole,users,userId, setUserId,password, setPassword,isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </userContext.Provider>
    )
}
export default UserState;