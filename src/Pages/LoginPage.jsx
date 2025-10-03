import React, { useState, useEffect, useContext } from "react";
import "../Style/LoginPage.css";
import userContext from '../Context/UserContext.js';

const LoginPage = () => {

    const {fetchUser,users,role,setRole,userId,setUserId,password, setPassword,isLoggedIn, setIsLoggedIn} = useContext(userContext)
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load session on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    // fetchUser();
    if (storedUser) {
      setIsLoggedIn(true);
      resetLogoutTimer();
    }
  }, [isLoggedIn]);

  useEffect(()=>{
    if(users.length){
      // console.log("Users List : ", users);
      let pre = users.find(u => u[0] === userId && u[1]?.trim() === password);
      if(pre){
        // console.log("user is present", pre);
        setIsLoggedIn(true);
        setRole(pre[2]);
        sessionStorage.setItem("user", JSON.stringify({ userId, password ,isLoggedIn:true,role:pre[2]}));
        resetLogoutTimer();    
      }
      else{
        // console.log("user is Absent");
      }
    }
  },[users])

  // Logout timer
  let logoutTimer;
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000); // 30 minutes
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId && password) {
      fetchUser();
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserId("");
    setPassword("");
    setRole("");
  };

  // Reset timer on user activity
  useEffect(() => {
    const activityEvents = ["mousemove", "keydown", "click"];
    const resetActivity = () => resetLogoutTimer();
    activityEvents.forEach((ev) =>{
      window.addEventListener(ev, resetActivity)
    //   console.log("active");
    }
      
    );
    return () => {
      activityEvents.forEach((ev) =>
        window.removeEventListener(ev, resetActivity)
      );
    };
  }, []);

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <div className="welcome-box">
          <h2>Welcome, {userId} 🎉</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
