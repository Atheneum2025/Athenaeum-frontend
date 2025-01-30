import React, { useState } from "react";
// import Button from '../../components/Button/Button'
import "./Login.css";
import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie"


function Login() {

  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: React.FormEvent) =>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/auth/login',{username, password}, {withCredentials: true});
      console.log("login successful");
      if(response){
        console.log(response.data)
        localStorage.setItem("authToken", JSON.stringify(response.data));
        Cookies.set("authToken", response.data.accessToken)
      }
      else{
        console.error("login failed");
      }
    }
    catch(err){
      console.error("Login failed:", err);
    }
  }

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-form">
          <div>LOG IN</div>
          <form action="" onSubmit={handleSignIn}>
            <label htmlFor="username">EMAIL</label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="text"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              <a href="/home">LOG IN</a>
            </button>
          </form>
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
          <p><a style={{color:"black", textDecoration:"none"}} href="/home">Continue as guest</a></p>
        </div>
        <div className="login-text">
          WELCOME BACK
          <p>login with your username and password Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis officia earum neque?</p>
        </div>
      </div>

      <div className="box"></div>
    </div>
  );
}

export default Login;
