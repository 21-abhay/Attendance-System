import { useState ,useContext, useEffect} from "react";
import "../Style/NavBar.css"
import { Link } from 'react-router-dom';
import userContext from '../Context/UserContext.js';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const {userId,isLoggedIn,role,setUserId,setRole,setPassword,setIsLoggedIn} = useContext(userContext)
  
  useEffect(()=>{
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    // console.log(storedUser.isLoggedIn)
    if(storedUser){
      setIsLoggedIn(storedUser.isLoggedIn)
      setUserId(storedUser.userId)
      setRole(storedUser.role)
    }
  },[isLoggedIn])

  return (

    <nav className="navbar">
      <div className="logo-div">
        <div className="logo">Attendance</div>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
        </button>
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><Link to="/" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setOpen(false)}>Home</Link></li>


        {isLoggedIn ? <li><Link to={isLoggedIn ? role=="admin" ? "/admin" : `/user/${userId}` : ""} className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setOpen(false)}>{isLoggedIn ?  (role=="admin" ? "Admin" : "User") : ""}</Link></li> : ""}


        <li><Link to={isLoggedIn ? "/login" : "/login"} className={({ isActive }) => (isActive ? "active" : "")} >{isLoggedIn ?  "Log Out" : "Login"}</Link></li>
      </ul>
    </nav>
  )
}
