import React from 'react'
import "../Style/Footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo / About */}
        <div className="footer-about">
          <h3>Attendance System</h3>
          <p>This has been developed to reinforce and revisit my web development skills.</p>
          <p>If you find any bugs, please let me know — your feedback will be highly appreciated.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://abhayjeet.vercel.app/" target="_blank" rel="noreferrer">My Portfolio</a></li>
            {/* <li><a href="/users">Users</a></li> */}
            {/* <li><a href="/stats">Stats</a></li> */}
            {/* <li><a href="/salary">Salary</a></li> */}
            {/* <li><a href="/admin">Admin</a></li> */}
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Connect with me</h4>
          <div className="social-icons">
            <a href="https://github.com/21-abhay" target="_blank" rel="noreferrer"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/abhayjeet-kumar-186427263/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            {/* <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a> */}
            <a href="https://www.instagram.com/21.abhay/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Attendance System | All Rights Reserved</p>
      </div>
    </footer>
  )
}
