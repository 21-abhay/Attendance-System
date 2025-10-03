import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import './App.css'
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Stats from "./Pages/Stats";
import NavBar from "./Components/NavBar";
import KeyPpints from "./Components/KeyPpints";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";

function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/admin" element={<Admin/>}></Route>
    //     <Route exact path="/admin/stats" element={<Stats/>}></Route>
    //     <Route exact path="/user/:id/:name" element={<User/>}></Route>
    //   </Routes>
    // </BrowserRouter>

    
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/admin" element={<Admin/>}></Route>
        <Route exact path="/admin/stats" element={<Stats/>}></Route>
        <Route exact path="/user/:name" element={<User/>}></Route>
        <Route exact path="/login" element={<LoginPage/>}></Route>
      </Routes>
      <KeyPpints/>
      <Footer/>
    </Router>
  )
}

export default App