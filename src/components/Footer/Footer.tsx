import React, { useState } from "react";
import "./Footer.css"; // Create this CSS file for styling
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { getAuthenticatedUser } from "../../utils/authUtils";

const Footer: React.FC = () => {

    const { user, isAuthenticated } = getAuthenticatedUser();
  const [message, setMessage] = useState<string>("");

  const phoneNumber = import.meta.env.VITE_MY_NUMBER;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post('/contactUs',{message}, {withCredentials: true});
      console.log(response);
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <footer className="footer">

      <div className="divider"></div>

      <div className="footer-section">
        <div>Contact:</div>
        <p>Phone No: +91 {phoneNumber}</p>
        <p>Email:</p>
        <p>athenaeum2025@gmail.com</p>
      </div>

      <div className="divider"></div>

      <div className="footer-section">
        <div>Links:</div>
        <ul className="footer-links">
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <a href="/course">Courses</a>
          </li>
          <li>
            <a href="/quiz">Quiz</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </div>

      <div className="divider"></div>

      <div className="footer-section">
        <div>Give your feedback:</div>
        <form onSubmit={sendMessage}>
          <div className="feedback-input">
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
          </div>
          {
            !user &&(
              <p>Please login</p>
            )
          }
          <button className="feedback-button" type="submit">Send Feedback</button>
        </form>
      </div>

      <div className="divider"></div>

      <div className="copyright">
        <p>
          ---------------------------------------------------------Design
          &copy;Athenaeum2025 all rights
          reserved---------------------------------------------------------
        </p>
      </div>
    </footer>
  );
};

export default Footer;