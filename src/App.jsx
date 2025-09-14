import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Stats from "./Pages/Stats";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/admin" element={<Admin/>}></Route>
        <Route exact path="/admin/stats" element={<Stats/>}></Route>
        <Route exact path="/user/:id/:name" element={<User/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App